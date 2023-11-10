"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  CreateEmployeeSchema,
  CreateEmployeeType,
} from "@/types/employeeSchema";
import { Textarea } from "@/components/ui/textarea";
import AddressInput from "@/components/school/AddressInput";

export default function CreateSchoolPage() {
  const form = useForm<CreateEmployeeType>({
    resolver: zodResolver(CreateEmployeeSchema),
    defaultValues: {
      address: "",
      information: "",
      phone: "",
    },
  });

  function onSubmit(data: CreateEmployeeType) {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <AddressInput form={form} />
        <FormField
          control={form.control}
          name="information"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Information*</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Optional information about the school"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone*</FormLabel>
              <FormControl>
                <Input placeholder="089 3154357" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
