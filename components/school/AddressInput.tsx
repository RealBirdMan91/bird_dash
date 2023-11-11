"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { UseFormReturn, set } from "react-hook-form";
import { CreateEmployeeType } from "@/types/employeeSchema";
import getGoogleMapsApiClient from "@/lib/googleApiClient";

type Props = {
  form: UseFormReturn<CreateEmployeeType>;
};

export default function AddressInput({ form }: Props) {
  const [formattedAddress, setFormattedAddress] = useState("");
  const addressField = form.watch("address");
  const sessionTokenRef = useRef<string>();

  async function onAddressChange(address: string) {
    const google = await getGoogleMapsApiClient();
    if (!sessionTokenRef.current) {
      sessionTokenRef.current =
        new google.maps.places.AutocompleteSessionToken() as string;
    }
    const { predictions } =
      await new google.maps.places.AutocompleteService().getPlacePredictions({
        input: address,
        types: ["geocode"],
        sessionToken: sessionTokenRef.current,
        region: "eur",
        //componentRestrictions: { country: "de" },
      });

    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    service.getDetails(
      { placeId: predictions[0].place_id },
      (place, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          place &&
          place.address_components
        ) {
          // Überprüfen, ob die Adresse eine Straße (route) und eine Hausnummer (street_number) enthält
          const hasStreet = place.address_components.some((component) =>
            component.types.includes("route")
          );
          const hasNumber = place.address_components.some((component) =>
            component.types.includes("street_number")
          );

          if (hasStreet && hasNumber && place.formatted_address) {
            // Adresse mit Straße und Hausnummer gefunden
            console.log(place);
            setFormattedAddress(place.formatted_address);
          } else {
            setFormattedAddress("");
          }
        }
      }
    );
  }

  useEffect(() => {
    if (addressField) {
      onAddressChange(addressField);
    }
  }, [addressField, onAddressChange]);

  return (
    <FormField
      control={form.control}
      name="address"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Address</FormLabel>
          <FormControl>
            <Input placeholder="Unicorn Road" {...field} />
          </FormControl>
          {formattedAddress && <FormMessage>{formattedAddress}</FormMessage>}
        </FormItem>
      )}
    />
  );
}
