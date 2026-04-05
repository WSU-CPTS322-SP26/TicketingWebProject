package edu.wsu.cpts322.project.backend.controllers.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {
    private String token;
    private String email;
    private String name;
    private String role;
    private Long userId;
    private String message;

    public LoginResponse(String message) {
        this.message = message;
    }
}