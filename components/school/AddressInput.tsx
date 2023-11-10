"use client";
import React, { use, useEffect, useRef } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { UseFormReturn } from "react-hook-form";
import { CreateEmployeeType } from "@/types/employeeSchema";
import { Loader } from "@googlemaps/js-api-loader";
import getGoogleMapsApiClient from "@/lib/googleApiClient";

type Props = {
  form: UseFormReturn<CreateEmployeeType>;
};

export default function AddressInput({ form }: Props) {
  const addressField = form.watch("address");
  console.log(addressField);
  const sessionTokenRef = useRef<string>();

  useEffect(() => {
    (async () => {
      const google = await getGoogleMapsApiClient();
      if (!sessionTokenRef.current) {
        sessionTokenRef.current =
          new google.maps.places.AutocompleteSessionToken() as string;
      }
      const { predictions } =
        await new google.maps.places.AutocompleteService().getPlacePredictions({
          input: "Obers",
          types: ["address"],
          sessionToken: sessionTokenRef.current,
          region: "eur",
        });
      console.log(predictions);
    })();
  }, []);

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
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
