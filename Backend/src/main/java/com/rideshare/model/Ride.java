package com.rideshare.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "rides")
public class Ride {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ride_id")
    private Long rideId;

    @Column(name = "passenger_id", nullable = false)
    private Long passengerId;

    @Column(name = "driver_id")
    private Long driverId;

    @Column(nullable = false)
    private String pickup;

    @Column(nullable = false)
    private String dropoff;

    @Column(name = "ride_type", nullable = false)
    private String rideType;

    @Column(nullable = false)
    private Double distance;

    @Column(nullable = false)
    private String time;

    @Column(nullable = false)
    private Double fare;

    @Column(nullable = false)
    private String status = "requested"; // requested, accepted, started, completed, declined, rejected

    @Convert(converter = CoordsConverter.class)
    @Column(name = "pickup_coords", columnDefinition = "TEXT")
    private Coords pickupCoords;

    @Convert(converter = CoordsConverter.class)
    @Column(name = "dropoff_coords", columnDefinition = "TEXT")
    private Coords dropoffCoords;
}
