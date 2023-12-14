import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getGoogleMapsApiClient from "@/lib/googleApiClient";
import debounce from "lodash.debounce";

async function getPlacePredictions(
  g: typeof google,
  address: string,
  sessionToken: string
) {
  if (!window) return;

  const { predictions } =
    await new g.maps.places.AutocompleteService().getPlacePredictions({
      input: address,
      types: ["geocode"],
      sessionToken: sessionToken,
      region: "eur",
      //componentRestrictions: { country: 'de' },
    });

  const service = new google.maps.places.PlacesService(
    document.createElement("div")
  );

  let promises = predictions.map((predictedAddress) => {
    return new Promise<string>((resolve, reject) => {
      service.getDetails(
        { placeId: predictedAddress.place_id },
        (place, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            place &&
            place.address_components
          ) {
            const hasStreet = place.address_components.some((component) =>
              component.types.includes("route")
            );
            const hasNumber = place.address_components.some((component) =>
              component.types.includes("street_number")
            );
            if (hasStreet && hasNumber && place.formatted_address) {
              resolve(place.formatted_address);
            }
          }
        }
      );
    });
  });

  const formattedAddresses = await Promise.all(promises);
  return formattedAddresses;
}

export function useAddress(val: string) {
  // Create a ref for the session token
  const sessionTokenRef = useRef<string>();
  const [debouncedValue, setDebouncedValue] = useState(val);

  // Debounce updating the value
  useEffect(() => {
    const debouncer = debounce((value) => {
      setDebouncedValue(value);
    }, 300);

    debouncer(val);

    return () => debouncer.cancel();
  }, [val]);

  // Initialize the session token if it's not already set
  if (!sessionTokenRef.current) {
    getGoogleMapsApiClient().then((google) => {
      if (!sessionTokenRef.current) {
        sessionTokenRef.current =
          new google.maps.places.AutocompleteSessionToken() as string;
      }
    });
  }

  const {
    data: addresses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["address", debouncedValue],
    queryFn: async () => {
      const google = await getGoogleMapsApiClient();
      return getPlacePredictions(
        google,
        debouncedValue,
        sessionTokenRef.current as string
      );
    },
    staleTime: 1000 * 60,
    enabled: debouncedValue.length > 4,
  });

  return { addresses, isError, isLoading };
}
