"use client";
import AddressInput from "@/components/forms/AddressInput";
import SchoolSelect from "@/components/forms/SchoolSelect";
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
import { type School } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Props = {
  schools: School[];
};

function EmployeeForm({ schools }: Props) {
  const t = useTranslations("Form");
  const tEmployees = useTranslations("Employees");
  const tResponses = useTranslations("Responses");

  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<CreateEmployeeType>({
    resolver: zodResolver(CreateEmployeeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      schools: [
        {
          id: "",
          address: "",
        },
      ],
    },
  });

  const { mutate, isPending } = useMutation<
    CreateEmployeeType,
    AxiosError,
    CreateEmployeeType
  >({
    mutationFn: (data) => axios.post("/api/employees", data),
    onSuccess: () => {
      form.reset();
      toast.success(tResponses("messages.success"));
      queryClient.invalidateQueries({
        queryKey: ["schools"],
      });
      router.push("/employees");
    },
    onError: (error) => {
      toast.error(
        error.response?.status === 422
          ? tResponses("messages.error_422")
          : tResponses("messages.error")
      );
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => mutate(data))}
        className="w-2/3 space-y-6"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("firstname.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("firstname.placeholder")} {...field} />
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
              <FormLabel>{t("lastname.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("lastname.placeholder")} {...field} />
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
              <FormLabel>{t("email.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("email.placeholder")} {...field} />
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
              <FormLabel>{t("phone.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("phone.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SchoolSelect fieldName="schools" form={form} schools={schools} />
        <Button type="submit" disabled={isPending}>
          {t("submit", { subject: tEmployees("subject") })}
        </Button>
      </form>
    </Form>
  );
}

export default EmployeeForm;
