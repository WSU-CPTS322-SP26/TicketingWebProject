package edu.wsu.cpts322.project.backend.config;

import edu.wsu.cpts322.project.backend.config.security.JwtAuthenticationFilter;
import edu.wsu.cpts322.project.backend.database.users.UsersEntity;
import edu.wsu.cpts322.project.backend.database.users.UsersRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    enum UserRole {
        ADMIN, MANAGER, USER
    }

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final UsersRepository usersRepository;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter,
                          UsersRepository usersRepository) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.usersRepository = usersRepository;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/public/**").permitAll()
                        .requestMatchers("/auth/login", "/auth/logout", "/auth/register", "/auth/public/**").permitAll()
                        .requestMatchers("/auth/admin/ping").hasRole(UserRole.ADMIN.name())
                        .requestMatchers("/auth/manager/ping").hasAnyRole(UserRole.ADMIN.name(), UserRole.MANAGER.name())
                        .requestMatchers("/auth/user/ping").hasAnyRole(UserRole.ADMIN.name(), UserRole.MANAGER.name(), UserRole.USER.name())
                        .requestMatchers("/api/admin/**").hasRole(UserRole.ADMIN.name())
                        .requestMatchers("/api/manager/**").hasAnyRole(UserRole.ADMIN.name(), UserRole.MANAGER.name())
                        .requestMatchers("/api/user/**").hasAnyRole(UserRole.ADMIN.name(), UserRole.MANAGER.name(), UserRole.USER.name())
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .authenticationProvider(authenticationProvider());

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        var provider = new DaoAuthenticationProvider(userDetailsService());
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return email -> {
            UsersEntity user = usersRepository.findByEmailId(email)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
            return org.springframework.security.core.userdetails.User.builder()
                    .username(user.getEmailId())
                    .password(user.getPassword())
                    .authorities("ROLE_" + user.getRole())
                    .build();
        };
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://localhost:3001", "http://localhost:8080"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Collections.singletonList("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}