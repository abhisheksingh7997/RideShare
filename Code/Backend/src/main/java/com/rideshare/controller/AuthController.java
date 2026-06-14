package com.rideshare.controller;

import com.rideshare.dto.AuthResponse;
import com.rideshare.dto.UserLoginRequest;
import com.rideshare.dto.UserSignupRequest;
import com.rideshare.service.AuthService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;

	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody UserSignupRequest request) {
		try {
			authService.signup(request);
			Map<String, String> response = new HashMap<>();
			response.put("message", "User registered successfully");
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			Map<String, Object> response = new HashMap<>();
			response.put("message", "SignUp Error");
			response.put("error", e.getMessage());
			return ResponseEntity.status(500).body(response);
		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody UserLoginRequest request) {
		try {
			AuthResponse authResponse = authService.login(request);
			return ResponseEntity.ok(authResponse);
		} catch (Exception e) {
			Map<String, Object> response = new HashMap<>();
			response.put("message", "Login Error");
			response.put("error", e.getMessage());
			return ResponseEntity.status(500).body(response);
		}
	}
}
