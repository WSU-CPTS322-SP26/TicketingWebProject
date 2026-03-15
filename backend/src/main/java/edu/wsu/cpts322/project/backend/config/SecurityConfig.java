/*
 * Copyright (c) 2026
 * Washington State University
 * CptS 322 - Software Engineering Principles
 *
 * Author: Paramveer Singh
 * Project: Tickr
 *
 * Description:
 * Spring Security configuration for the backend API with JWT token-based authentication.
 * This class enables authentication using the USERS table stored in Supabase.
 * It protects API endpoints and verifies user login credentials using JWT tokens.
 *
 * Supported Roles (stored in database, case-insensitive):
 * - "admin" → ROLE_ADMIN (Full system access)
 * - "manager" → ROLE_MANAGER (Management operations)
 * - "user" → ROLE_USER (Basic user operations)
 *
 * Role Hierarchy:
 * ADMIN (highest) > MANAGER > USER (lowest)
 * Higher roles can access lower role endpoints.
 *
 * Request Flow:
 * 1. Client sends login request with email and password to /auth/login
 * 2. Credentials are validated using DaoAuthenticationProvider with PasswordEncoder
 * 3. JWT token is generated and returned to client
 * 4. Client sends subsequent requests with JWT token in Authorization header
 * 5. JwtAuthenticationFilter intercepts request and validates token
 * 6. If valid, access is granted based on endpoint rules (role-based)
 * 7. If invalid, request is rejected with 401/403 error
 */

package edu.wsu.cpts322.project.backend.config;

import edu.wsu.cpts322.project.backend.security.JwtAuthenticationFilter;
import edu.wsu.cpts322.project.backend.database.users.DbUsersDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

/*
 * @Configuration tells Spring this class provides application configuration.
 * @EnableWebSecurity activates Spring Security and registers the security filter chain.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final DbUsersDetailsService userDetailsService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(DbUsersDetailsService userDetailsService,
                          JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.userDetailsService = userDetailsService;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    /*
     * Defines the security rules for incoming HTTP requests.
     * The SecurityFilterChain runs before controllers and decides
     * whether a request should be allowed or rejected.
     */
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                /*
                 * Configures CORS (Cross-Origin Resource Sharing).
                 * Allows requests from frontend applications.
                 */
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                /*
                 * Disables CSRF protection.
                 * CSRF mainly protects browser session-based apps.
                 * Since this API is stateless and uses JWT token authentication,
                 * CSRF protection is not required here.
                 */
                .csrf(csrf -> csrf.disable())

                /*
                 * Configures session handling.
                 * STATELESS means the server will not store login sessions.
                 * Every request must include a valid JWT token in the Authorization header.
                 */
                .sessionManagement(sm ->
                        sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                /*
                 * Defines authorization rules for API endpoints.
                 * Spring checks these rules after authentication succeeds.
                 *
                 * Three role levels:
                 * - ADMIN: Full system access
                 * - MANAGER: Management and user operations
                 * - USER: Basic user operations
                 */
                .authorizeHttpRequests(auth -> auth

                        // Public endpoints - no authentication required
                        .requestMatchers("/api/public/**").permitAll()

                        // Auth endpoints - no authentication required
                        .requestMatchers("/auth/login", "/auth/logout").permitAll()
                        .requestMatchers("/auth/public/**").permitAll()

                        // Test endpoints - role-based access
                        .requestMatchers("/auth/admin/ping").hasRole("ADMIN")
                        .requestMatchers("/auth/manager/ping").hasAnyRole("ADMIN", "MANAGER")
                        .requestMatchers("/auth/user/ping").hasAnyRole("ADMIN", "MANAGER", "USER")

                        // Admin endpoints - requires ADMIN role only
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")

                        // Manager endpoints - requires ADMIN or MANAGER role
                        .requestMatchers("/api/manager/**").hasAnyRole("ADMIN", "MANAGER")

                        // User endpoints - requires ADMIN, MANAGER, or USER role
                        .requestMatchers("/api/user/**").hasAnyRole("ADMIN", "MANAGER", "USER")

                        // All other endpoints require authentication
                        .anyRequest().authenticated()
                )

                /*
                 * Registers the JWT authentication filter.
                 * This filter intercepts every request and validates JWT tokens
                 * from the Authorization header before the request reaches controllers.
                 */
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)

                /*
                 * Sets the authentication provider for login requests.
                 * This provider validates username/password during login.
                 */
                .authenticationProvider(authenticationProvider());

        return http.build();
    }

    /*
     * Defines the password encoder used during authentication.
     * BCryptPasswordEncoder securely encodes passwords using the Bcrypt algorithm.
     *
     * When user logs in:
     * 1. Plain text password from login request is hashed using BCrypt
     * 2. Hashed password is compared with the hashed password in the database
     * 3. If they match, authentication succeeds
     */
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /*
     * Creates the authentication provider that validates user credentials.
     * Uses the UserDetailsService to load user from database
     * and the PasswordEncoder to verify the password.
     */
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    /*
     * Creates the AuthenticationManager bean.
     * This is used by the login endpoint to authenticate users.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    /*
     * Configures CORS (Cross-Origin Resource Sharing).
     * Allows requests from specified frontend origins.
     * Update the allowed origins with your actual frontend URLs.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Add your frontend URLs here
        configuration.setAllowedOrigins(Arrays.asList(
                "http://localhost:3000",   // React dev server
                "http://localhost:3001",   // Alternative port
                "http://localhost:8080",   // Backend server
        ));

        // Allowed HTTP methods
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Allowed headers
        configuration.setAllowedHeaders(Collections.singletonList("*"));

        // Allow credentials (cookies, authorization headers)
        configuration.setAllowCredentials(true);

        // Cache duration for preflight requests (1 hour)
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}