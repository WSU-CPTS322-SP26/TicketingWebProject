/*
 * Copyright (c) 2026
 * Washington State University
 * CptS 322 - Software Engineering Principles
 *
 * Author: Surakanti Srishanth Reddy
 * Project: Tickr
 *
 * Description:
 * Global CORS configuration for the Tickr backend API.
 * Allows the React frontend (running on localhost:3000) to communicate
 * with the Spring Boot backend (running on localhost:8080).
 *
 * Without this configuration, browsers block all cross-origin requests
 * between the frontend and backend due to the Same-Origin Policy.
 *
 * Allowed Origins:
 * - http://localhost:3000 (React development server)
 *
 * Allowed Methods:
 * - GET    (read data)
 * - POST   (create data)
 * - PUT    (update data)
 * - DELETE (delete data)
 * - OPTIONS (preflight requests sent automatically by the browser)
 *
 * Allowed Headers:
 * - Authorization (for HTTP Basic authentication)
 * - Content-Type  (for JSON request bodies)
 */

package edu.wsu.cpts322.project.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    /*
     * Registers a global CORS filter that applies to all API endpoints.
     * This runs before Spring Security so preflight OPTIONS requests
     * are handled correctly without requiring authentication.
     */
    @Bean
    public CorsFilter corsFilter() {

        CorsConfiguration config = new CorsConfiguration();

        /*
         * Allow the React frontend to make requests.
         * Add additional origins here if deploying to a live server.
         */
        config.addAllowedOrigin("http://localhost:3000");

        /*
         * Allow standard HTTP methods used by the frontend.
         */
        config.addAllowedMethod("GET");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("DELETE");
        config.addAllowedMethod("OPTIONS");

        /*
         * Allow headers required for authentication and JSON requests.
         */
        config.addAllowedHeader("Authorization");
        config.addAllowedHeader("Content-Type");

        /*
         * Allow the browser to read the Authorization header in responses.
         */
        config.setAllowCredentials(true);

        /*
         * Apply this CORS configuration to all API endpoints.
         */
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);

        return new CorsFilter(source);
    }
}