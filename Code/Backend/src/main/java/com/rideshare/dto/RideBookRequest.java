package com.rideshare.dto;

import com.rideshare.model.Coords;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RideBookRequest {
    private Long passengerId;
    private String pickup;
    private String dropoff;
    private String rideType;
    private Double distance;
    private String time;
    private Double fare;
    private Coords pickupCoords;
    private Coords dropoffCoords;
}
