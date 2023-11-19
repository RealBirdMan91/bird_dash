"use client";
import React, { useState } from "react";
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
import { UseFormReturn } from "react-hook-form";
import { CreateEmployeeType } from "@/types/employeeSchema";

import { useAddress } from "@/hooks/useAddress";

type Props = {
  form: UseFormReturn<CreateEmployeeType>;
};

export default function AddressInput({ form }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { addresses } = useAddress(form.watch().address);

  return (
    <FormField
      control={form.control}
      name="address"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Address</FormLabel>

          <Command>
            <CommandInput
              placeholder="Search address"
              value={field.value}
              onValueChange={(value) => {
                form.setValue("address", value);
                setIsOpen(true);
              }}
              autoComplete="off"
            />
            {addresses && addresses?.length > 0 && (
              <CommandEmpty>No address found.</CommandEmpty>
            )}
            {isOpen && (
              <CommandGroup>
                {addresses &&
                  addresses?.length > 0 &&
                  addresses.map((address) => (
                    <CommandItem
                      value={address}
                      key={address}
                      onSelect={() => {
                        form.setValue("address", address);
                        setIsOpen(false);
                      }}
                    >
                      {address}
                    </CommandItem>
                  ))}
              </CommandGroup>
            )}
          </Command>

          <FormDescription>
            Please insert a street this will get autocomplete by google maps
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
