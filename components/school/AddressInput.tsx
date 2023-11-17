"use client";
import React, { useRef, useState } from "react";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { UseFormReturn, set } from "react-hook-form";
import { CreateEmployeeType } from "@/types/employeeSchema";
import getGoogleMapsApiClient from "@/lib/googleApiClient";

type Props = {
  form: UseFormReturn<CreateEmployeeType>;
};

export default function AddressInput({ form }: Props) {
  const [formattedAddress, setFormattedAddress] = useState<string[]>([]);
  const sessionTokenRef = useRef<string>();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const onAddressChange = (address: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        const google = await getGoogleMapsApiClient();
        if (!sessionTokenRef.current) {
          sessionTokenRef.current =
            new google.maps.places.AutocompleteSessionToken() as string;
        }
        const { predictions } =
          await new google.maps.places.AutocompleteService().getPlacePredictions(
            {
              input: address,
              types: ["geocode"],
              sessionToken: sessionTokenRef.current,
              region: "eur",
              //componentRestrictions: { country: "de" },
            }
          );

        const service = new google.maps.places.PlacesService(
          document.createElement("div")
        );

        return predictions.slice(0, 10).map((predictedAddress) => {
          service.getDetails(
            { placeId: predictedAddress.place_id },
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
                  // Überprüfen, ob die Adresse bereits in der Liste enthalten ist, bevor sie hinzugefügt wird
                  setFormattedAddress((prev) => {
                    if (
                      place.formatted_address &&
                      !prev.includes(place.formatted_address)
                    ) {
                      return [...prev, place.formatted_address];
                    } else {
                      return [...prev]; // Gibt den unveränderten Zustand zurück, wenn die Adresse bereits vorhanden ist
                    }
                  });
                }
              }
            }
          );
        });
      } catch (err) {
        setFormattedAddress([]);
      }
    }, 150);
  };

  function onChangeHandler(val: string) {
    setInputValue(val);
    form.setValue("address", "");
    setIsOpen(true);
    if (val.length > 4) {
      onAddressChange(val);
    }
  }

  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <FormField
      control={form.control}
      name="address"
      render={({ field }) => {
        return (
          <FormItem className="flex flex-col">
            <FormLabel>Address</FormLabel>

            <Command>
              <CommandInput
                placeholder="Search language..."
                onValueChange={(val) => onChangeHandler(val)}
                value={inputValue}
              />
              {isOpen && formattedAddress.length > 0 && (
                <CommandEmpty>No Street found yet</CommandEmpty>
              )}
              <CommandGroup>
                {isOpen &&
                  formattedAddress.length > 0 &&
                  formattedAddress.map((address, idx) => (
                    <CommandItem
                      value={address}
                      key={idx}
                      onSelect={() => {
                        form.setValue("address", address);
                        setInputValue(address);
                        setIsOpen(false);
                      }}
                    >
                      {address}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </Command>

            <FormDescription>
              Please enter the address of the school. This will be autocompleted
              by Google Maps.
            </FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
