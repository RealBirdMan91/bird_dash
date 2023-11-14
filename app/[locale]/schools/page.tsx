"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { set, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

const languages = ["en", "fr", "de", "es", "pt", "ru"] as const;

const FormSchema = z.object({
  language: z.string({
    required_error: "Please select a language.",
  }),
});

function SchoolsPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-col">
                <FormLabel>Language</FormLabel>

                <Command>
                  <CommandInput
                    placeholder="Search language..."
                    onValueChange={(val) => {
                      setInputValue(val), form.setValue("language", "");
                      setIsOpen(true);
                    }}
                    value={inputValue}
                  />
                  {isOpen && <CommandEmpty>No language found.</CommandEmpty>}
                  <CommandGroup>
                    {isOpen &&
                      languages.map((language, idx) => (
                        <CommandItem
                          value={language}
                          key={idx}
                          onSelect={() => {
                            form.setValue("language", language);
                            setInputValue(language);
                            setIsOpen(false);
                          }}
                        >
                          {language}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </Command>

                <FormDescription>
                  This is the language that will be used in the dashboard.
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default SchoolsPage;
