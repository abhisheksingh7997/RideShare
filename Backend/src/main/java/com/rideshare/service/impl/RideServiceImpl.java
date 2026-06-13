package com.rideshare.service.impl;

import com.rideshare.dto.RideBookRequest;
import com.rideshare.dto.RideResponse;
import com.rideshare.model.Ride;
import com.rideshare.repository.RideRepository;
import com.rideshare.service.RideService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RideServiceImpl implements RideService {

    private final RideRepository rideRepository;

    @Override
    public Long bookRide(RideBookRequest request) {
        Ride ride = new Ride();
        ride.setPassengerId(request.getPassengerId());
        ride.setPickup(request.getPickup());
        ride.setDropoff(request.getDropoff());
        ride.setRideType(request.getRideType());
        ride.setDistance(request.getDistance());
        ride.setTime(request.getTime());
        ride.setFare(request.getFare());
        ride.setPickupCoords(request.getPickupCoords());
        ride.setDropoffCoords(request.getDropoffCoords());
        ride.setStatus("requested");

        Ride savedRide = rideRepository.save(ride);
        return savedRide.getRideId();
    }

    @Override
    public void updateRideStatus(Long rideId, String status, Long driverId) {
        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new RuntimeException("Ride not found"));

        ride.setStatus(status);
        ride.setDriverId(driverId);

        rideRepository.save(ride);
    }

    @Override
    public List<RideResponse> getDriverRides(Long driverId) {
        List<Ride> rides = rideRepository.findByDriverIdOrderByRideIdDesc(driverId);
        return rides.stream()
                .map(this::mapToRideResponse)
                .collect(Collectors.toList());
    }

    private RideResponse mapToRideResponse(Ride ride) {
        return new RideResponse(
                ride.getRideId(),
                ride.getPassengerId(),
                ride.getDriverId(),
                ride.getPickup(),
                ride.getDropoff(),
                ride.getRideType(),
                ride.getDistance(),
                ride.getTime(),
                ride.getFare(),
                ride.getStatus(),
                ride.getPickupCoords(),
                ride.getDropoffCoords()
        );
    }
}
