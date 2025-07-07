// blue point -> current location
// green point -> pickup location
// red point -> dropoff location

import { useEffect, useRef } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import esriConfig from "@arcgis/core/config";
import Point from "@arcgis/core/geometry/Point";
import RouteParameters from "@arcgis/core/rest/support/RouteParameters";
import FeatureSet from "@arcgis/core/rest/support/FeatureSet";
import * as route from "@arcgis/core/rest/route";
import '@arcgis/map-components/components/arcgis-distance-measurement-2d';
//  api key with esriconfig for authentication of api to use esri services .
esriConfig.apiKey = "AAPTxy8BH1VEsoebNVZXo8HurLXOHfTw7xS6Y4MDf0mhJNkT2Mx73me4-Emx56Jk88fkLPhIybELc4YyguRQWqLlTjbH0zIx8IedfU1ruipV6kMJhTGRS_z5yVL8CcBIIEUmyGKv1NeKE_DX8TpEEWn2heEvd0x_LHxOSGu9Y3fN3FFPPs2zmb_JdsOVi0bOjfOOWsr6lEKPHvo_qJWih_nDz021oh42hWKjHAql_uzo9EQ.AT1_bV6fTXOy";

export default function ArcMap({ pickupCoords, dropoffCoords, currentCoords, onRouteInfo }) {
  const mapRef = useRef();

  useEffect(() => {
    if (!mapRef.current) return;

    const center = pickupCoords || currentCoords;
    if (!center?.lat || !center?.lng) {
      console.warn("Center coordinates missing");
      return;
    }

    const map = new Map({ basemap: "streets-navigation-vector" }); // basemap 
    // view that will be used to display the map
    const view = new MapView({
      container: mapRef.current,
      map,
      center: [center.lng, center.lat],
      zoom: 13,
    });

    const markerLayer = new GraphicsLayer();
    map.add(markerLayer);
    // check if the coordinates is valid or not .
    const isValidCoords = (coords) =>
      coords &&
      typeof coords.lat === "number" &&
      typeof coords.lng === "number" &&
      coords.lat >= -90 &&
      coords.lat <= 90 &&
      coords.lng >= -180 &&
      coords.lng <= 180;

    // if the coords are valid add them to the marker .
    const addMarker = (coords, color) => {
      if (!isValidCoords(coords)) return;

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
      return graphic; //  Return for route use
    };

    //  Add markers
    const pickupGraphic = pickupCoords ? addMarker(pickupCoords, "green") : null;
    const dropoffGraphic = dropoffCoords ? addMarker(dropoffCoords, "red") : null;
    const currentGraphic = currentCoords && isValidCoords(currentCoords) ? addMarker(currentCoords, "blue") : null;
    //  Route logic 
    const originGraphic = pickupGraphic || currentGraphic;
    if (originGraphic && dropoffGraphic) {
      const routeUrl =
        "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World"; // this route url of arcgis 

      const routeParams = new RouteParameters({
        stops: new FeatureSet({ features: [originGraphic, dropoffGraphic] }),
        returnDirections: true,
      });

      route
        .solve(routeUrl, routeParams)
        .then((result) => {
          const routeResult = result.routeResults[0];
          if (routeResult) {
            routeResult.route.symbol = {
              type: "simple-line",
              color: [5, 150, 255],
              width: 3,
            };
            markerLayer.add(routeResult.route); // Show route

            // now we will extract distance and tiem form the route of arcmap .
            const attributes = routeResult.route.attributes;
            const distance = attributes.Total_Kilometers;
            const time = attributes.Total_TravelTime; // in minutes 
            // now converting time in HH:MM format
            const hours = Math.floor(time / 60);
            const minutes = Math.round(time % 60);

            const formattedTime = `${hours}hr${minutes}min`;
            console.log("Distance (KM) :", distance);
            console.log("Estimated Time (min):", formattedTime);
            if (onRouteInfo) onRouteInfo({ distance, formattedTime });
          }
        })
        .catch((error) => {
          console.error("Route solve error:", error);
        });
    }



    return () => {
      view?.destroy();
    };
  }, [pickupCoords, dropoffCoords, currentCoords]);

  return <div ref={mapRef} className="w-full h-[400px] rounded-xl shadow-lg" />;
}
