package edu.wsu.cpts322.project.backend.controllers.auth;

import edu.wsu.cpts322.project.backend.controllers.auth.dto.*;
import edu.wsu.cpts322.project.backend.security.JwtTokenProvider;
import edu.wsu.cpts322.project.backend.database.users.UsersEntity;
import edu.wsu.cpts322.project.backend.database.users.UsersRepository;
import edu.wsu.cpts322.project.backend.services.TokenDenylistService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UsersRepository usersRepository;
    private final TokenDenylistService tokenDenylistService;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtTokenProvider jwtTokenProvider,
                          UsersRepository usersRepository,
                          TokenDenylistService tokenDenylistService,
                          PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.usersRepository = usersRepository;
        this.tokenDenylistService = tokenDenylistService;
        this.passwordEncoder = passwordEncoder;
    }

    // -------------------------------------------------------------------------
    // Login
    // -------------------------------------------------------------------------

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            String token = jwtTokenProvider.generateToken(authentication);

            UsersEntity user = usersRepository.findByEmailId(loginRequest.getEmail())
                    .orElse(null);

            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new LoginResponse("User not found"));
            }

            return ResponseEntity.ok(LoginResponse.builder()
                    .token(token)
                    .email(user.getEmailId())
                    .name(user.getName())
                    .role(user.getRole())
                    .userId(user.getUserId())
                    .message("Login successful")
                    .build());

        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponse("Invalid email or password"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new LoginResponse("Login failed: " + e.getMessage()));
        }
    }

    // -------------------------------------------------------------------------
    // Logout
    // -------------------------------------------------------------------------

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                String jti = jwtTokenProvider.getJtiFromToken(token);
                tokenDenylistService.deny(jti);
            }

            SecurityContextHolder.clearContext();

            return ResponseEntity.ok(LogoutResponse.builder()
                    .success(true)
                    .message("Logout successful")
                    .build());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new LogoutResponse("Logout failed: " + e.getMessage(), false));
        }
    }

    // -------------------------------------------------------------------------
    // Register
    // -------------------------------------------------------------------------

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        if (usersRepository.findByEmailId(registerRequest.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new LoginResponse("Email already in use"));
        }

        UsersEntity newUser = UsersEntity.builder()
                .emailId(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .name(registerRequest.getName())
                .phone(registerRequest.getPhone())
                .role("USER")
                .rewardPoints(0)
                .build();

        usersRepository.save(newUser);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new LoginResponse("Registration successful. Please log in."));
    }

    // -------------------------------------------------------------------------
    // Ping endpoints
    // -------------------------------------------------------------------------

    @GetMapping("/public/ping")
    public ResponseEntity<?> publicPing() {
        return ResponseEntity.ok("Public endpoint - no authentication required");
    }

    @GetMapping("/user/ping")
    public ResponseEntity<?> userPing() {
        String email = Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getName();
        return ResponseEntity.ok("User endpoint - authenticated as: " + email);
    }

    @GetMapping("/manager/ping")
    public ResponseEntity<?> managerPing() {
        String email = Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getName();
        return ResponseEntity.ok("Manager endpoint - authenticated as: " + email);
    }

    @GetMapping("/admin/ping")
    public ResponseEntity<?> adminPing() {
        String email = Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getName();
        return ResponseEntity.ok("Admin endpoint - authenticated as: " + email);
    }
}