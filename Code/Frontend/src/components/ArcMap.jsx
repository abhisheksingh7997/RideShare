import { useEffect, useRef, useState } from "react";
import axios from "axios";

import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";

import socket from "../utils/socket";

const ORS_API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImQ2OTNlZjUzNWM3NzQ0Yzc5M2EwNjZkYTQ4YTMyMjZlIiwiaCI6Im11cm11cjY0In0=";

export default function ArcMap({
  pickupCoords,
  dropoffCoords,
  onRouteInfo,
}) {
  const mapRef = useRef();
  const markerLayerRef = useRef();
  const animatedMarkerRef = useRef();

  const [dropoffPath, setDropoffPath] = useState([]);
  const [rideStarted, setRideStarted] = useState(false);
  const [rideComplete, setRideComplete] = useState(false);

  const rideId = parseInt(localStorage.getItem("rideId"));

  useEffect(() => {
    if (!rideId) return;

    console.log("Registering passenger with rideId:", rideId);

    socket.emit("registerPassenger", {
      rideId,
    });
  }, [rideId]);

  useEffect(() => {
    if (!mapRef.current || !pickupCoords || !dropoffCoords) return;

    const map = new Map({
      basemap: "streets-navigation-vector",
    });

    const view = new MapView({
      container: mapRef.current,
      map,
      center: [pickupCoords.lng, pickupCoords.lat],
      zoom: 13,
    });

    const markerLayer = new GraphicsLayer();

    map.add(markerLayer);

    markerLayerRef.current = markerLayer;

    const createMarker = (coords, color) => {
      const point = new Point({
        longitude: coords.lng,
        latitude: coords.lat,
        spatialReference: {
          wkid: 4326,
        },
      });

      const symbol = {
        type: "simple-marker",
        color,
        outline: {
          color: "white",
          width: 1,
        },
      };

      const graphic = new Graphic({
        geometry: point,
        symbol,
      });

      markerLayer.add(graphic);
    };

    createMarker(pickupCoords, "green");
    createMarker(dropoffCoords, "red");

    axios
      .post(
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
      )
      .then((response) => {
        const routeData = response.data.features[0];

        const coordinates =
          routeData.geometry.coordinates;

        const path = coordinates.map(([lng, lat]) => ({
          lng,
          lat,
        }));

        setDropoffPath(path);

        const routeGraphic = new Graphic({
          geometry: {
            type: "polyline",
            paths: [coordinates],
            spatialReference: {
              wkid: 4326,
            },
          },
          symbol: {
            type: "simple-line",
            color: [0, 255, 0],
            width: 4,
          },
        });

        markerLayer.add(routeGraphic);

        const distanceKm =
          routeData.properties.summary.distance / 1000;

        const durationMinutes =
          routeData.properties.summary.duration / 60;

        const hours = Math.floor(durationMinutes / 60);
        const minutes = Math.round(durationMinutes % 60);

        const formattedTime =
          `${hours}hr ${minutes}min`;

        if (onRouteInfo) {
          onRouteInfo({
            distance: distanceKm.toFixed(2),
            formattedTime,
          });
        }
      })
      .catch((error) => {
        console.error(
          "OpenRouteService routing error:",
          error
        );
      });

    return () => {
      view?.destroy();
    };
  }, [pickupCoords, dropoffCoords, onRouteInfo]);

  useEffect(() => {
    socket.on("rideStarted", ({ rideId }) => {
      console.log("Ride started for rideId:", rideId);

      setRideStarted(true);
    });

    return () => {
      socket.off("rideStarted");
    };
  }, []);

  useEffect(() => {
    if (
      !rideStarted ||
      dropoffPath.length === 0 ||
      !markerLayerRef.current
    )
      return;

    const markerLayer = markerLayerRef.current;

    let index = 0;

    const carSymbol = {
      type: "simple-marker",
      color: "blue",
      size: 10,
      outline: {
        color: "white",
        width: 1,
      },
    };

    const startPoint = new Point({
      longitude: dropoffPath[0].lng,
      latitude: dropoffPath[0].lat,
      spatialReference: {
        wkid: 4326,
      },
    });

    const carGraphic = new Graphic({
      geometry: startPoint,
      symbol: carSymbol,
    });

    markerLayer.add(carGraphic);

    animatedMarkerRef.current = carGraphic;

    const interval = setInterval(() => {
      index++;

      if (index >= dropoffPath.length) {
        clearInterval(interval);

        alert("Ride Completed");

        setRideComplete(true);

        return;
      }

      const point = new Point({
        longitude: dropoffPath[index].lng,
        latitude: dropoffPath[index].lat,
        spatialReference: {
          wkid: 4326,
        },
      });

      if (animatedMarkerRef.current) {
        animatedMarkerRef.current.geometry = point;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [rideStarted, dropoffPath]);

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