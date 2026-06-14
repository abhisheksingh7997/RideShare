package com.rideshare.controller;

import com.rideshare.dto.RideBookRequest;
import com.rideshare.dto.RideResponse;
import com.rideshare.dto.RideStatusUpdateRequest;
import com.rideshare.service.RideService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController

public class RideController {

    private final RideService rideService;
    public RideController(RideService rideService) {
    	this.rideService = rideService ;
    }

    @PostMapping("/api/rides/book-ride")
    public ResponseEntity<?> bookRide(@RequestBody RideBookRequest request) {
        try {
            Long rideId = rideService.bookRide(request);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Ride booked successfully");
            response.put("rideId", rideId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    @PutMapping("/api/rides/update-ride-status/{rideId}")
    public ResponseEntity<?> updateRideStatus(
            @PathVariable Long rideId,
            @RequestBody RideStatusUpdateRequest request
    ) {
        return handleStatusUpdate(rideId, request);
    }

    @PutMapping("/api/update-ride-status/{rideId}")
    public ResponseEntity<?> updateRideStatusFallback(
            @PathVariable Long rideId,
            @RequestBody RideStatusUpdateRequest request
    ) {
        return handleStatusUpdate(rideId, request);
    }

    private ResponseEntity<?> handleStatusUpdate(Long rideId, RideStatusUpdateRequest request) {
        try {
            rideService.updateRideStatus(rideId, request.getStatus(), request.getDriverId());
            Map<String, String> response = new HashMap<>();
            response.put("message", "Ride status updated");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    @GetMapping("/api/rides/driver/{driverId}")
    public ResponseEntity<?> getDriverRides(@PathVariable Long driverId) {
        try {
            List<RideResponse> rides = rideService.getDriverRides(driverId);
            return ResponseEntity.ok(rides);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
}
