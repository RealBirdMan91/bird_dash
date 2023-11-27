"use client";
import AddressInput from "@/components/school/AddressInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

function CreateEmployeePage() {
  const form = useForm<CreateEmployeeType>({
    resolver: zodResolver(CreateEmployeeSchema),
    defaultValues: {
      address: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {})}
        className="w-2/3 space-y-6"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"FirstNameLabel"}</FormLabel>
              <FormControl>
                <Input placeholder={"FirstName"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"lastNameLabel"}</FormLabel>
              <FormControl>
                <Input placeholder={"LastName"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"EmailLabel"}</FormLabel>
              <FormControl>
                <Input placeholder={"Email"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <AddressInput form={form} />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"PhoneLabel"}</FormLabel>
              <FormControl>
                <Input placeholder={"Phone"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit Form</Button>
      </form>
    </Form>
  );
}

export default CreateEmployeePage;
