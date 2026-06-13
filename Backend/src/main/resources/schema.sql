-- Database Schema for RideShare (PostgreSQL)

-- To create the database manually, run:
-- CREATE DATABASE rideshare;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    phone_no VARCHAR(50) NOT NULL,
    license_number VARCHAR(100),
    vehicle_number VARCHAR(100),
    vehicle_type VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS rides (
    ride_id SERIAL PRIMARY KEY,
    passenger_id INTEGER NOT NULL REFERENCES users(id),
    driver_id INTEGER REFERENCES users(id),
    pickup VARCHAR(255) NOT NULL,
    dropoff VARCHAR(255) NOT NULL,
    ride_type VARCHAR(50) NOT NULL,
    distance DOUBLE PRECISION NOT NULL,
    time VARCHAR(100) NOT NULL,
    fare DOUBLE PRECISION NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'requested',
    pickup_coords TEXT,
    dropoff_coords TEXT
);
