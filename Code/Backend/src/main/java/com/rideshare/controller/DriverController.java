package com.rideshare.controller;

import com.rideshare.dto.DriverResponse;
import com.rideshare.service.DriverService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")

public class DriverController {

    private final DriverService driverService;
    public DriverController(DriverService driverService) {
    	this.driverService = driverService;
    }

    @GetMapping("/driver-info/{id}")
    public ResponseEntity<?> getDriverInfo(@PathVariable Long id) {
        try {
            DriverResponse driverResponse = driverService.getDriverInfo(id);
            return ResponseEntity.ok(driverResponse);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.status(404).body(response);
        }
    }

    @GetMapping("/driver-found")
    public ResponseEntity<?> findDrivers(@RequestParam String vehicleType) {
        if (vehicleType == null || vehicleType.isEmpty()) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "VehicleType is required");
            return ResponseEntity.status(400).body(response);
        }
        try {
            List<DriverResponse> drivers = driverService.findDriversByVehicleType(vehicleType);
            return ResponseEntity.ok(drivers);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
}
