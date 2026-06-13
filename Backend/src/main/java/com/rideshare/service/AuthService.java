package com.rideshare.service;

import com.rideshare.dto.AuthResponse;
import com.rideshare.dto.UserLoginRequest;
import com.rideshare.dto.UserSignupRequest;

public interface AuthService {
    void signup(UserSignupRequest request);
    AuthResponse login(UserLoginRequest request);
}
