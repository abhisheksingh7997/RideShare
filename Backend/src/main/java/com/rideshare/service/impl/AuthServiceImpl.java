package com.rideshare.service.impl;

import com.rideshare.dto.AuthResponse;
import com.rideshare.dto.UserLoginRequest;
import com.rideshare.dto.UserSignupRequest;
import com.rideshare.model.User;
import com.rideshare.repository.UserRepository;
import com.rideshare.security.JwtService;
import com.rideshare.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public void signup(UserSignupRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setPhoneNo(request.getPhoneNo());

        if ("driver".equalsIgnoreCase(request.getRole())) {
            user.setLicenseNumber(request.getLicenseNumber());
            user.setVehicleNumber(request.getVehicleNumber());
            user.setVehicleType(request.getVehicleType());
        }

        userRepository.save(user);
    }

    @Override
    public AuthResponse login(UserLoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        String token = jwtService.generateToken(user.getId(), user.getEmail(), user.getRole());

        return new AuthResponse("Login successful", token, user.getRole());
    }
}
