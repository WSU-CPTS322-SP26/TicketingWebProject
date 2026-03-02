/*
 * Copyright (c) 2026
 * Washington State University
 * CptS 322 - Software Engineering Principles
 *
 * Author: Paramveer Singh
 * Project: Tickr
 *
 * Description:
 * Basic Spring Security configuration for the backend API.
 * This class enables authentication using the USERS table stored
 * in Supabase. It protects API endpoints and verifies user login
 * credentials using HTTP Basic authentication.
 *
 * Request Flow:
 * 1. Client sends a request to the backend.
 * 2. Spring Security intercepts the request before it reaches controllers.
 * 3. Credentials are read from the Authorization header.
 * 4. The user is loaded from the database using UserDetailsService.
 * 5. Password is validated using PasswordEncoder.
 * 6. If valid, access is granted based on endpoint rules.
 */

package edu.wsu.cpts322.project.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

/*
 * @Configuration tells Spring this class provides application configuration.
 * @EnableWebSecurity activates Spring Security and registers the security filter chain.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /*
     * Defines the security rules for incoming HTTP requests.
     * The SecurityFilterChain runs before controllers and decides
     * whether a request should be allowed or rejected.
     */
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http

                /*
                 * Disables CSRF protection.
                 * CSRF mainly protects browser session-based apps.
                 * Since this API is stateless and uses HTTP Basic authentication,
                 * CSRF protection is not required here.
                 */
                .csrf(csrf -> csrf.disable())

                /*
                 * Configures session handling.
                 * STATELESS means the server will not store login sessions.
                 * Every request must include authentication credentials.
                 */
                .sessionManagement(sm ->
                        sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                /*
                 * Defines authorization rules for API endpoints.
                 * Spring checks these rules after authentication succeeds.
                 */
                .authorizeHttpRequests(auth -> auth

                        // No authentication required for public endpoints
                        .requestMatchers("/api/public/**").permitAll()

                        // Only users with ADMIN role can access admin endpoints
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")

                        // Any authenticated user can access user endpoints
                        .requestMatchers("/api/user/**").authenticated()

                        // All other endpoints remain publicly accessible
                        .anyRequest().permitAll()
                )

                /*
                 * Enables HTTP Basic authentication.
                 * The client sends credentials in the Authorization header
                 * in the format: Authorization: Basic base64(username:password).
                 */
                .httpBasic(withDefaults());

        return http.build();
    }

    /*
     * Defines the password encoder used during authentication.
     * NoOpPasswordEncoder performs a direct comparison of the
     * provided password with the stored database value.
     *
     * This is used here because passwords are currently stored
     * as plain text for development simplicity.
     */
    @Bean
    PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }
}