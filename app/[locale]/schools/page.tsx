"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const addresses = [
  "Ringstr. 32",
  "Königsallee 92a",
  "Königsallee 92b",
  "Seeweg 1",
  "Seeweg 2",
  "Seeweg 3",
];

const FormSchema = z.object({
  address: z
    .string({
      required_error: "Please select a language.",
    })
    .min(5, "Please insert a valid address."),
});

export default function SchoolsPage() {
  //const [value, setValue] = useState("");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      address: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  function isOpen() {
    const value = form.watch().address;

    return value.length > 4 && addresses.length > 0;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  onValueChange={(value) => form.setValue("address", value)}
                />
                {isOpen() && <CommandEmpty>No address found.</CommandEmpty>}
                <CommandGroup>
                  {isOpen() &&
                    addresses.map((address) => (
                      <CommandItem
                        value={address}
                        key={address}
                        onSelect={() => form.setValue("address", address)}
                      >
                        {address}
                      </CommandItem>
                    ))}
                </CommandGroup>
              </Command>

              <FormDescription>
                Please insert a street this will get autocomplete by google maps
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
