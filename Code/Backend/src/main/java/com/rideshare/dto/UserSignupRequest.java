package com.rideshare.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSignupRequest {
    private String username;
    private String email;
    private String password;
    private String role;
    private String phoneNo;
    private String licenseNumber;
    private String vehicleNumber;
    private String vehicleType;
}
