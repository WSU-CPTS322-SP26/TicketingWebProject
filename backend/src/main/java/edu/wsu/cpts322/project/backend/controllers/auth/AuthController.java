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

import java.util.Map;
import java.util.HashMap;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
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

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> body) {

        String email = body.get("email");
        String password = body.get("password");

        Map<String, Object> res = new HashMap<>();

        if ("admin@wsu.edu".equals(email) && "123".equals(password)) {
            res.put("userId", "admin");
            res.put("role", "admin");
        } else if ("user@wsu.edu".equals(email)) {
            res.put("userId", "user");
            res.put("role", "moviegoer");
        } else {
            throw new RuntimeException("Invalid credentials");
        }

        return res;
    }

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody Map<String, String> body) {

        Map<String, Object> res = new HashMap<>();
        res.put("message", "user registered");
        return res;
    }
    
    @CrossOrigin(origins = "http://localhost:3000")//backend -> frontend, change 3000 if needed
}
