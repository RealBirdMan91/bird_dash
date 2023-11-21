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
import { type CreateSchoolType } from "@/types/schoolSchema";

import { useAddress } from "@/hooks/useAddress";
import { useTranslations } from "next-intl";

type Props = {
  form: UseFormReturn<CreateSchoolType>;
};

export default function AddressInput({ form }: Props) {
  const t = useTranslations("CreateSchools");
  const [isOpen, setIsOpen] = useState(false);
  const { addresses } = useAddress(form.watch().address);

  return (
    <FormField
      control={form.control}
      name="address"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{t("address.label")}</FormLabel>

          <Command>
            <CommandInput
              placeholder={t("address.placeholder")}
              value={field.value}
              onValueChange={(value) => {
                form.setValue("address", value);
                setIsOpen(true);
              }}
              autoComplete="off"
            />
            {addresses && addresses?.length > 0 && (
              <CommandEmpty>{t("address.empty")}</CommandEmpty>
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

          <FormDescription>{t("address.description")}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
