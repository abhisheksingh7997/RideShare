import { useEffect, useRef, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import esriConfig from "@arcgis/core/config";
import Point from "@arcgis/core/geometry/Point";
import RouteParameters from "@arcgis/core/rest/support/RouteParameters";
import FeatureSet from "@arcgis/core/rest/support/FeatureSet";
import * as route from "@arcgis/core/rest/route";
import "@arcgis/map-components/components/arcgis-distance-measurement-2d";
import socket from "../utils/socket";

esriConfig.apiKey = "AAPTxy8BH1VEsoebNVZXo8HurLXOHfTw7xS6Y4MDf0mhJNkT2Mx73me4-Emx56Jk88fkLPhIybELc4YyguRQWqLlTjbH0zIx8IedfU1ruipV6kMJhTGRS_z5yVL8CcBIIEUmyGKv1NeKE_DX8TpEEWn2heEvd0x_LHxOSGu9Y3fN3FFPPs2zmb_JdsOVi0bOjfOOWsr6lEKPHvo_qJWih_nDz021oh42hWKjHAql_uzo9EQ.AT1_bV6fTXOy";

export default function DriverMap({ pickupCoords, dropoffCoords, onRouteInfo,rideId }) {
  const mapRef = useRef();
  const mapViewRef = useRef();
  const markerLayerRef = useRef();
  const driverMarkerRef = useRef();
  const [driverPath, setDriverPath] = useState([]);
  const [dropoffPath , setDropoffPath] = useState([]);
  const [rideComplete , setRideComplete] = useState(false);
  const [driverReachedPickup , setDriverReachedPickup]= useState(false);
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

      const routeUrl =
        "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";

      const routeParams = new RouteParameters({
        stops: new FeatureSet({
          features: [
            new Graphic({
              geometry: new Point({
                longitude: currentCoords.lng,
                latitude: currentCoords.lat,
                spatialReference: { wkid: 4326 },
              }),
            }),
            new Graphic({
              geometry: new Point({
                longitude: pickupCoords.lng,
                latitude: pickupCoords.lat,
                spatialReference: { wkid: 4326 },
              }),
            }),
          ],
        }),
        returnDirections: true,
        returnRoutes: true,
        outSpatialReference: { wkid: 4326 },
      });

      try {
        const result = await route.solve(routeUrl, routeParams);
        const routeResult = result.routeResults[0];

        if (routeResult) {
          routeResult.route.symbol = {
            type: "simple-line",
            color: [5, 150, 255],
            width: 3,
          };
          markerLayer.add(routeResult.route);
const pickupToDropoffParams = new RouteParameters({
  stops: new FeatureSet({
    features: [
      new Graphic({
        geometry: new Point({
          longitude: pickupCoords.lng,
          latitude: pickupCoords.lat,
          spatialReference: { wkid: 4326 },
        }),
      }),
      new Graphic({
        geometry: new Point({
          longitude: dropoffCoords.lng,
          latitude: dropoffCoords.lat,
          spatialReference: { wkid: 4326 },
        }),
      }),
    ],
  }),
  returnRoutes: true,
  outSpatialReference: { wkid: 4326 },
});

try {
  const result2 = await route.solve(routeUrl, pickupToDropoffParams);
  const dropoffRoute = result2.routeResults[0];

  if (dropoffRoute) {
    dropoffRoute.route.symbol = {
      type: "simple-line",
      color: [0, 255, 0], 
      width: 3,
    };
    markerLayer.add(dropoffRoute.route);
    const dropPath = dropoffRoute.route.geometry.paths[0].map(([lng,lat])=>({
      lng,
      lat,
    }));
    setDropoffPath(dropPath);
  }
} catch (error) {
  console.error("Pickup to Dropoff Route solve error:", error);
}

          const attributes = routeResult.route.attributes;
          const distance = attributes.Total_Kilometers;
          const time = attributes.Total_TravelTime;
          const hours = Math.floor(time / 60);
          const minutes = Math.round(time % 60);
          const formattedTime = `${hours}hr ${minutes}min`;

          if (onRouteInfo) onRouteInfo({ distance, formattedTime });

          const path = routeResult.route.geometry.paths[0].map(([lng, lat]) => ({
            lng,
            lat,
          }));
          setDriverPath(path);
        }
      } catch (error) {
        console.error("Route solve error:", error);
      }
    });
  }, [pickupCoords, dropoffCoords]);

  useEffect(() => {
    if (driverPath.length === 0 || !markerLayerRef.current) return;

    const markerLayer = markerLayerRef.current;

    let index = 0;

    const driverSymbol = {
      type: "simple-marker",
      color: "yellow",
      outline: { color: "white", width: 1 },
    };

    const driverPoint = new Point({
      longitude: driverPath[0].lng,
      latitude: driverPath[0].lat,
      spatialReference: { wkid: 4326 },
    });

    const driverGraphic = new Graphic({ geometry: driverPoint, symbol: driverSymbol });
    markerLayer.add(driverGraphic);
    driverMarkerRef.current = driverGraphic;

    const intervalId = setInterval(() => {
      index++;
      if (index >= driverPath.length) {
        clearInterval(intervalId);
        alert("Pickup Location Reached : Start Ride!!");
        setDriverReachedPickup(true);
        socket.emit("rideStarted",{rideId});
       return;
      }
const coords = driverPath[index];
const newPoint = new Point({
longitude: coords.lng,
          latitude: coords.lat,
          spatialReference: { wkid: 4326 },
});
      if (driverMarkerRef.current) {
        driverMarkerRef.current.geometry = newPoint ;
      }
    }, 1000); 

    return () => clearInterval(intervalId);
  }, [driverPath]);
  useEffect(() => {
  if (!driverReachedPickup || dropoffPath.length === 0 || !markerLayerRef.current || !driverMarkerRef.current) return;

  let index = 0;
  const intervalId = setInterval(() => {
    index++;
    if (index >= dropoffPath.length) {
      clearInterval(intervalId);
      alert("Destination Reached : Ride Completed");
      markerLayerRef.current?.removeAll();
      mapViewRef.current?.destroy() ;
      setRideComplete(true);
      return;
    }

    const coords = dropoffPath[index];
    const newPoint = new Point({
      longitude: coords.lng,
      latitude: coords.lat,
      spatialReference: { wkid: 4326 },
    });

    if (driverMarkerRef.current) {
      driverMarkerRef.current.geometry = newPoint;
    }
  }, 1000); 

  return () => clearInterval(intervalId);
}, [dropoffPath , driverReachedPickup]);


  return (
    !rideComplete?(
  <div ref={mapRef} className="w-full h-[550px] rounded-xl shadow-lg" />):(
    <div className="text-center text-green-500 text-lg font-bold mt-4">
      Ride Completed SuccessFully!!
    </div>
  )

);
}