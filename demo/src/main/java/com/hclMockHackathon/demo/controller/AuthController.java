package com.hclMockHackathon.demo.controller;

import com.hclMockHackathon.demo.dto.AuthLoginRequest;
import com.hclMockHackathon.demo.dto.AuthLoginResponse;
import com.hclMockHackathon.demo.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /** POST /auth/login — Authenticates admin or member */
    @PostMapping("/login")
    public ResponseEntity<AuthLoginResponse> login(@RequestBody AuthLoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
