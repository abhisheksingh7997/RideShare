import axios from "axios";

const apiKey = "AAPTxy8BH1VEsoebNVZXo8HurLXOHfTw7xS6Y4MDf0mhJNkT2Mx73me4-Emx56Jk88fkLPhIybELc4YyguRQWqLlTjbH0zIx8IedfU1ruipV6kMJhTGRS_z5yVL8CcBIIEUmyGKv1NeKE_DX8TpEEWn2heEvd0x_LHxOSGu9Y3fN3FFPPs2zmb_JdsOVi0bOjfOOWsr6lEKPHvo_qJWih_nDz021oh42hWKjHAql_uzo9EQ.AT1_bV6fTXOy";

export const fetchSuggestions = async (input) => {
  if (!input.trim()) return [];
  try {
    const res = await axios.get(
      "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest",
      {
        params: {
          text: input,
          f: "json",
          maxSuggestions: 5,
          token: apiKey,
        },
      }
    );
    return res.data.suggestions || [];
  } catch (err) {
    console.error("Suggestion fetch failed", err);
    return [];
  }
};


export const geocodeAddress = async (address, magicKey = null) => {
  if (!address.trim()) return null;

  try {
    const res = await axios.get(
      "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates",
      {
        params: {
          f: "json",
          singleLine: address,
          outFields: "Match_addr",
          token: apiKey,
          ...(magicKey && { magicKey }),
        },
      }
    );

    console.log("Geocode API raw response:", res.data);

    const candidates = res.data?.candidates;
    if (Array.isArray(candidates) && candidates.length > 0) {
      const { x, y } = candidates[0].location;
      return { lng: x, lat: y };
    } else {
      console.warn("No candidates found for:", address);
      return null;
    }
  } catch (err) {
    console.error("Geocoding error:", err.response?.data || err.message);
    return null;
  }
};
