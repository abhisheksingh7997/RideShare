package com.rideshare.dto;

import com.rideshare.model.Coords;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RideResponse {
    private Long rideId;
    private Long passengerId;
    private Long driverId;
    private String pickup;
    private String dropoff;
    private String rideType;
    private Double distance;
    private String time;
    private Double fare;
    private String status;
    private Coords pickupCoords;
    private Coords dropoffCoords;
}
