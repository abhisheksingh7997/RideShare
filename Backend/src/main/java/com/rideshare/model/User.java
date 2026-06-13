package com.rideshare.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role; // "passenger" or "driver"

    @Column(name = "phone_no", nullable = false)
    private String phoneNo;

    @Column(name = "license_number")
    private String licenseNumber;

    @Column(name = "vehicle_number")
    private String vehicleNumber;

    @Column(name = "vehicle_type")
    private String vehicleType;
}
