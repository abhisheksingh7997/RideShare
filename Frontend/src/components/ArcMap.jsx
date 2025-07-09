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
import socket from "../utils/socket";

esriConfig.apiKey = "AAPTxy8BH1VEsoebNVZXo8HurLXOHfTw7xS6Y4MDf0mhJNkT2Mx73me4-Emx56Jk88fkLPhIybELc4YyguRQWqLlTjbH0zIx8IedfU1ruipV6kMJhTGRS_z5yVL8CcBIIEUmyGKv1NeKE_DX8TpEEWn2heEvd0x_LHxOSGu9Y3fN3FFPPs2zmb_JdsOVi0bOjfOOWsr6lEKPHvo_qJWih_nDz021oh42hWKjHAql_uzo9EQ.AT1_bV6fTXOy"; 
export default function ArcMap({ pickupCoords, dropoffCoords, onRouteInfo }) {
  const mapRef = useRef();
  const markerLayerRef = useRef();
  const animatedMarkerRef = useRef() ;
  const [dropoffPath , setDropoffPath] = useState([]);
  const [rideStarted,setRideStarted]=useState(false);
  const rideId = parseInt(localStorage.getItem("rideId")) ;
  useEffect(()=>{
    if(!rideId) return ;
    console.log("Registering passenger with rideId : ",rideId);
    socket.emit("registerPassenger",{rideId});
  },[rideId]);
  useEffect(() => {
    if (!mapRef.current || !pickupCoords || !dropoffCoords) return;

    const map = new Map({ basemap: "streets-navigation-vector" });
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

    const routeUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";

    const routeParams = new RouteParameters({
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
      returnDirections: true,
      outSpatialReference: { wkid: 4326 },
    });

    route.solve(routeUrl, routeParams).then((result) => {
      const routeGraphic = result.routeResults[0].route;
      routeGraphic.symbol = {
        type: "simple-line",
        color: [0, 255, 0], 
        width: 4,
      };
      markerLayer.add(routeGraphic);
      const path = routeGraphic.geometry.paths[0].map(([lng,lat])=>({lng,lat}));
      setDropoffPath(path);

      const attributes = routeGraphic.attributes;
      const distance = attributes.Total_Kilometers;
      const time = attributes.Total_TravelTime;
      const hours = Math.floor(time / 60);
      const minutes = Math.round(time % 60);
      const formattedTime = `${hours}hr ${minutes}min`;

      if (onRouteInfo) {
        onRouteInfo({ distance, formattedTime });
      }
    });

    return () => view?.destroy();
  }, [pickupCoords, dropoffCoords]);

  useEffect(() => {
  if (!rideStarted || dropoffPath.length === 0 || !markerLayerRef.current) return;

  const markerLayer = markerLayerRef.current;
  let index = 0;

  const carSymbol = {
    type: "simple-marker",
    color: "blue",
    size: 10,
    outline: { color: "white", width: 1 },
  };

  const startPoint = new Point({
    longitude: dropoffPath[0].lng,
    latitude: dropoffPath[0].lat,
    spatialReference: { wkid: 4326 },
  });

  const carGraphic = new Graphic({ geometry: startPoint, symbol: carSymbol });
  markerLayer.add(carGraphic);
  animatedMarkerRef.current = carGraphic;

  const interval = setInterval(() => {
    index++;
    if (index >= dropoffPath.length) {
      clearInterval(interval);
      alert("Ride Completed");
      return;
    }

    const point = new Point({
      longitude: dropoffPath[index].lng,
      latitude: dropoffPath[index].lat,
      spatialReference: { wkid: 4326 },
    });

    if (animatedMarkerRef.current) {
      animatedMarkerRef.current.geometry = point;
    }
  }, 1000);

  return () => clearInterval(interval);
}, [rideStarted , dropoffPath]);
useEffect(()=>{
  socket.on("rideStarted",({rideId})=>{
    console.log("Ride started for rideId:",rideId);
    setRideStarted(true);
  });
  return ()=>socket.off("rideStarted");
},[]);

  return <div ref={mapRef} className="w-full h-[550px] rounded-xl shadow-lg" />;
}
