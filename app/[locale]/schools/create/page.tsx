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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function CreateSchoolPage() {
  const t = useTranslations("CreateSchools");
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation<
    CreateSchoolType,
    AxiosError,
    CreateSchoolType
  >({
    mutationFn: (data) => axios.post("/api/schools", data),
    onSuccess: () => {
      form.reset();
      toast.success(t("messages.success"));
      queryClient.invalidateQueries({
        queryKey: ["schools"],
      });
      router.push("/schools");
    },
    onError: (error) => {
      toast.error(
        error.response?.status === 422
          ? t("messages.error_422")
          : t("messages.error")
      );
    },
  });

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
              <FormLabel>{t("information.label")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("information.placeholder")}
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
              <FormLabel>{t("phone.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("phone.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" aria-disabled={isPending}>
          {t("submit")}
        </Button>
      </form>
    </Form>
  );
}
