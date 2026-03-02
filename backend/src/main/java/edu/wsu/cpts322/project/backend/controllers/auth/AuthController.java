/*
 * Copyright (c) 2026
 * Washington State University
 * CptS 322 - Software Engineering Principles
 *
 * Author: Paramveer Singh
 * Project: Tickr
 *
 * Description:
 * REST controller responsible for authentication-related test endpoints.
 * Provides public, user, and admin routes used to verify Spring Security
 * role-based access control and endpoint protection within the backend API.
 */

package edu.wsu.cpts322.project.backend.controllers.auth;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthController {

    @GetMapping("/public/ping")
    public String publicPing() {
        return "public ok";
    }

    @GetMapping("/user/ping")
    public String userPing() {
        return "user ok";
    }

    @GetMapping("/admin/ping")
    public String adminPing() {
        return "admin ok";
    }
}