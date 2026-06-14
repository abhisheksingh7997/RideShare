package com.rideshare.repository;

import com.rideshare.model.Ride;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RideRepository extends JpaRepository<Ride, Long> {
    List<Ride> findByDriverIdOrderByRideIdDesc(Long driverId);
}
