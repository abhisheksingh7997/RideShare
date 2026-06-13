package com.rideshare.service.impl;

import com.rideshare.dto.DriverResponse;
import com.rideshare.model.User;
import com.rideshare.repository.UserRepository;
import com.rideshare.service.DriverService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DriverServiceImpl implements DriverService {

    private final UserRepository userRepository;

    @Override
    public DriverResponse getDriverInfo(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Driver not found"));
        
        if (!"driver".equalsIgnoreCase(user.getRole())) {
            throw new RuntimeException("User is not a driver");
        }

        return mapToDriverResponse(user);
    }

    @Override
    public List<DriverResponse> findDriversByVehicleType(String vehicleType) {
        List<User> drivers = userRepository.findByRoleAndVehicleTypeIgnoreCase("driver", vehicleType);
        return drivers.stream()
                .map(this::mapToDriverResponse)
                .collect(Collectors.toList());
    }

    private DriverResponse mapToDriverResponse(User user) {
        return new DriverResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                user.getPhoneNo(),
                user.getLicenseNumber(),
                user.getVehicleNumber(),
                user.getVehicleType()
        );
    }
}
