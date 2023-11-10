// lib/googleApiClient.js

import { Loader } from "@googlemaps/js-api-loader";

/**
 * This is a wrapper around the Google Maps API client.
 * see https://developers.google.com/maps/documentation/javascript
 */

export type Prediction = {
  description: string;
  place_id: string;
};

export type PlaceDetail = {
  // fields here depend on the fields param passed to getDetails
  formatted_address?: string;
  geometry?: {
    location: { lat: () => number; lng: () => number };
  };
  name?: string;
  place_id?: string;
};

type PlacesServiceStatus =
  | "INVALID_REQUEST"
  | "NOT_FOUND"
  | "OK"
  | "OVER_QUERY_LIMIT"
  | "REQUEST_DENIED"
  | "UNKNOWN_ERROR"
  | "ZERO_RESULTS";

type GoogleApiClient = {
  maps: {
    places: {
      AutocompleteSessionToken: { new (): string };
      AutocompleteService: {
        new (): {
          getPlacePredictions: (
            params: { input: string; sessionToken: string | undefined },
            callback: (
              predictions: Prediction[],
              status: PlacesServiceStatus
            ) => void
          ) => void;
        };
      };
      PlacesService: {
        new (attributionNode: HTMLElement): {
          getDetails: (
            params: {
              placeId: string;
              fields?: string[];
              sessionToken: string | undefined;
            },
            callback: (place: PlaceDetail, status: PlacesServiceStatus) => void
          ) => void;
        };
      };
      PlacesServiceStatus: {
        [key in PlacesServiceStatus]: PlacesServiceStatus;
      };
    };
    [key: string]: any;
  };
};

let googleApiClient: typeof google | undefined;

export default async function getGoogleMapsApiClient() {
  if (googleApiClient) {
    return googleApiClient;
  }

  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
    version: "weekly",
    libraries: ["places"],
  });

  googleApiClient = await loader.load();

  return googleApiClient;
}
