import axios from "axios";

const apiKey = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImQ2OTNlZjUzNWM3NzQ0Yzc5M2EwNjZkYTQ4YTMyMjZlIiwiaCI6Im11cm11cjY0In0=";

export const fetchSuggestions = async (input) => {
  if (!input.trim()) return [];

  try {
    const res = await axios.get(
      "https://api.openrouteservice.org/geocode/autocomplete",
      {
        params: {
          api_key: apiKey,
          text: input,
          size: 5,
        },
      }
    );

    return (
      res.data.features?.map((feature) => ({
        text: feature.properties.label,
        coordinates: feature.geometry.coordinates,
      })) || []
    );
  } catch (err) {
    console.error("Suggestion fetch failed", err);
    return [];
  }
};

export const geocodeAddress = async (address) => {
  if (!address.trim()) return null;

  try {
    const res = await axios.get(
      "https://api.openrouteservice.org/geocode/search",
      {
        params: {
          api_key: apiKey,
          text: address,
          size: 1,
        },
      }
    );

    const feature = res.data.features?.[0];

    if (!feature) return null;

    const [lng, lat] = feature.geometry.coordinates;

    return { lng, lat };
  } catch (err) {
    console.error("Geocode error:", err);
    return null;
  }
};