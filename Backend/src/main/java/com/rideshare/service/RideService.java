package com.rideshare.service;

import com.rideshare.dto.RideBookRequest;
import com.rideshare.dto.RideResponse;
import java.util.List;

public interface RideService {
    Long bookRide(RideBookRequest request);
    void updateRideStatus(Long rideId, String status, Long driverId);
    List<RideResponse> getDriverRides(Long driverId);
}
