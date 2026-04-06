package edu.wsu.cpts322.project.backend.controllers.auth;

import edu.wsu.cpts322.project.backend.database.users.UsersEntity;
import edu.wsu.cpts322.project.backend.database.users.UsersRepository;
import edu.wsu.cpts322.project.backend.config.security.JwtTokenProvider;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider,
                          UsersRepository usersRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDto loginDto) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.email, loginDto.password));

            UsersEntity user = usersRepository.findByEmailId(loginDto.email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            String token = jwtTokenProvider.generateToken(user.getEmailId(), user.getRole());

            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "email", user.getEmailId(),
                    "name", user.getName(),
                    "role", user.getRole(),
                    "userId", user.getUserId(),
                    "message", "Login successful"
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid email or password"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok(Map.of("message", "Logout successful"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDto registerDto) {
        if (usersRepository.findByEmailId(registerDto.email).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Email already in use"));
        }

        UsersEntity user = UsersEntity.builder()
                .emailId(registerDto.email)
                .password(passwordEncoder.encode(registerDto.password))
                .name(registerDto.name)
                .phone(registerDto.phone)
                .role("USER")
                .rewardPoints(0)
                .build();

        usersRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Registration successful. Please log in."));
    }

    @GetMapping("/public/ping")
    public ResponseEntity<?> publicPing() {
        return ResponseEntity.ok("Public endpoint - no authentication required");
    }

    @GetMapping("/user/ping")
    public ResponseEntity<?> userPing() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok("User endpoint - authenticated as: " + email);
    }

    @GetMapping("/manager/ping")
    public ResponseEntity<?> managerPing() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok("Manager endpoint - authenticated as: " + email);
    }

    @GetMapping("/admin/ping")
    public ResponseEntity<?> adminPing() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok("Admin endpoint - authenticated as: " + email);
    }

    // DTOs inlined
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LoginDto {
        @NotBlank(message = "Email is required")
        @Email(message = "Must be a valid email")
        public String email;

        @NotBlank(message = "Password is required")
        public String password;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RegisterDto {
        @NotBlank(message = "Email is required")
        @Email(message = "Must be a valid email")
        public String email;

        @NotBlank(message = "Password is required")
        @Size(min = 8, message = "Password must be at least 8 characters")
        public String password;

        @NotBlank(message = "Name is required")
        public String name;

        public String phone;
    }
}