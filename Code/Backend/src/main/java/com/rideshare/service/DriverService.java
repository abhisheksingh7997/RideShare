package com.rideshare.service;

import com.rideshare.dto.DriverResponse;
import java.util.List;

public interface DriverService {
    DriverResponse getDriverInfo(Long id);
    List<DriverResponse> findDriversByVehicleType(String vehicleType);
}
