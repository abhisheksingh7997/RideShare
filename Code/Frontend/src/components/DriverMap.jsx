import { useEffect, useRef, useState } from "react";
import axios from "axios";

import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";

import "@arcgis/map-components/components/arcgis-distance-measurement-2d";
import socket from "../utils/socket";

const ORS_API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImQ2OTNlZjUzNWM3NzQ0Yzc5M2EwNjZkYTQ4YTMyMjZlIiwiaCI6Im11cm11cjY0In0=";

export default function DriverMap({ pickupCoords, dropoffCoords, onRouteInfo, rideId }) {
  const mapRef = useRef();
  const mapViewRef = useRef();
  const markerLayerRef = useRef();
  const driverMarkerRef = useRef();
  const [driverPath, setDriverPath] = useState([]);
  const [dropoffPath, setDropoffPath] = useState([]);
  const [rideComplete, setRideComplete] = useState(false);
  const [driverReachedPickup, setDriverReachedPickup] = useState(false);
  useEffect(() => {
    if (!mapRef.current) return;

    const map = new Map({ basemap: "streets-navigation-vector" });
    const view = new MapView({
      container: mapRef.current,
      map,
      center: [pickupCoords?.lng || 77.2, pickupCoords?.lat || 28.6],
      zoom: 13,
    });

    const markerLayer = new GraphicsLayer();
    map.add(markerLayer);

    mapViewRef.current = view;
    markerLayerRef.current = markerLayer;

    return () => view?.destroy();
  }, []);

  useEffect(() => {
    if (!pickupCoords || !dropoffCoords || !mapViewRef.current || !markerLayerRef.current)
      return;

    const markerLayer = markerLayerRef.current;
    markerLayer.removeAll();

    const createMarker = (coords, color) => {
      const point = new Point({
        longitude: coords.lng,
        latitude: coords.lat,
        spatialReference: { wkid: 4326 },
      });

      const symbol = {
        type: "simple-marker",
        color,
        outline: { color: "white", width: 1 },
      };

      const graphic = new Graphic({ geometry: point, symbol });
      markerLayer.add(graphic);
    };

    createMarker(pickupCoords, "green");
    createMarker(dropoffCoords, "red");

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const currentCoords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };

     try {
  // Driver -> Pickup

  const driverToPickup = await axios.post(
    "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
    {
      coordinates: [
        [currentCoords.lng, currentCoords.lat],
        [pickupCoords.lng, pickupCoords.lat],
      ],
    },
    {
      headers: {
        Authorization: ORS_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );

  const routeData = driverToPickup.data.features[0];

  const routeCoords = routeData.geometry.coordinates;

  const routeGraphic = new Graphic({
    geometry: {
      type: "polyline",
      paths: [routeCoords],
      spatialReference: { wkid: 4326 },
    },
    symbol: {
      type: "simple-line",
      color: [5, 150, 255],
      width: 3,
    },
  });

  markerLayer.add(routeGraphic);

  const distance =
    routeData.properties.summary.distance / 1000;

  const durationMinutes =
    routeData.properties.summary.duration / 60;

  const hours = Math.floor(durationMinutes / 60);
  const minutes = Math.round(durationMinutes % 60);

  const formattedTime = `${hours}hr ${minutes}min`;

  if (onRouteInfo) {
    onRouteInfo({
      distance: distance.toFixed(2),
      formattedTime,
    });
  }

  const path = routeCoords.map(([lng, lat]) => ({
    lng,
    lat,
  }));

  setDriverPath(path);

  // Pickup -> Dropoff

  const pickupToDropoff = await axios.post(
    "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
    {
      coordinates: [
        [pickupCoords.lng, pickupCoords.lat],
        [dropoffCoords.lng, dropoffCoords.lat],
      ],
    },
    {
      headers: {
        Authorization: ORS_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );

  const dropoffData =
    pickupToDropoff.data.features[0];

  const dropCoords =
    dropoffData.geometry.coordinates;

  const dropGraphic = new Graphic({
    geometry: {
      type: "polyline",
      paths: [dropCoords],
      spatialReference: {
        wkid: 4326,
      },
    },
    symbol: {
      type: "simple-line",
      color: [0, 255, 0],
      width: 3,
    },
  });

  markerLayer.add(dropGraphic);

  const dropPath = dropCoords.map(([lng, lat]) => ({
    lng,
    lat,
  }));

  setDropoffPath(dropPath);
} catch (error) {
  console.error("ORS Routing Error:", error);
}    });
  }, [pickupCoords, dropoffCoords, onRouteInfo]);

  useEffect(() => {
    if (driverPath.length === 0 || !markerLayerRef.current) return;

    const markerLayer = markerLayerRef.current;

    let index = 0;

    const driverSymbol = {
      type: "simple-marker",
      color: "yellow",
      outline: {
        color: "white",
        width: 1,
      },
    };

    const driverPoint = new Point({
      longitude: driverPath[0].lng,
      latitude: driverPath[0].lat,
      spatialReference: {
        wkid: 4326,
      },
    });

    const driverGraphic = new Graphic({
      geometry: driverPoint,
      symbol: driverSymbol,
    });

    markerLayer.add(driverGraphic);
    driverMarkerRef.current = driverGraphic;

    const intervalId = setInterval(() => {
      index++;

      if (index >= driverPath.length) {
        clearInterval(intervalId);

        alert("Pickup Location Reached : Start Ride!!");

        setDriverReachedPickup(true);

        socket.emit("rideStarted", {
          rideId,
        });

        return;
      }

      const coords = driverPath[index];

      const newPoint = new Point({
        longitude: coords.lng,
        latitude: coords.lat,
        spatialReference: {
          wkid: 4326,
        },
      });

      if (driverMarkerRef.current) {
        driverMarkerRef.current.geometry = newPoint;
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [driverPath, rideId]);

  useEffect(() => {
    if (
      !driverReachedPickup ||
      dropoffPath.length === 0 ||
      !driverMarkerRef.current
    )
      return;

    let index = 0;

    const intervalId = setInterval(() => {
      index++;

      if (index >= dropoffPath.length) {
        clearInterval(intervalId);

        alert("Destination Reached : Ride Completed");

        markerLayerRef.current?.removeAll();

        mapViewRef.current?.destroy();

        setRideComplete(true);

        socket.emit("rideCompleted", {
          rideId,
        });

        return;
      }

      const coords = dropoffPath[index];

      const newPoint = new Point({
        longitude: coords.lng,
        latitude: coords.lat,
        spatialReference: {
          wkid: 4326,
        },
      });

      if (driverMarkerRef.current) {
        driverMarkerRef.current.geometry = newPoint;
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [driverReachedPickup, dropoffPath, rideId]);

  return !rideComplete ? (
    <div
      ref={mapRef}
      className="w-full h-[550px] rounded-xl shadow-lg"
    />
  ) : (
    <div className="text-center text-green-500 text-lg font-bold mt-4">
      Ride Completed Successfully!!
    </div>
  );
}
 