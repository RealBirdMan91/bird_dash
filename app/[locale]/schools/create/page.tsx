"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
  CreateSchoolSchema,
  type CreateSchoolType,
} from "@/types/schoolSchema";
import { Textarea } from "@/components/ui/textarea";
import AddressInput from "@/components/school/AddressInput";
import { useMutation } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function CreateSchoolPage() {
  const { mutate, data, isPending, error, isSuccess } = useMutation<
    CreateSchoolType,
    AxiosError,
    CreateSchoolType
  >({
    mutationFn: (data) => axios.post("/api/schools", data),
  });

  useEffect(() => {
    if (error) {
      toast.error(
        error.response?.status === 422
          ? "School already exists"
          : "Something went wrong, please try again later"
      );
    }
    if (isSuccess) {
      toast.success("School created successfully");
    }
  }, [error, isSuccess]);

  const form = useForm<CreateSchoolType>({
    resolver: zodResolver(CreateSchoolSchema),
    defaultValues: {
      address: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => mutate(data))}
        className="w-2/3 space-y-6"
      >
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
