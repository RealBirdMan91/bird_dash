"use client";

import SchoolSelect from "@/components/forms/SchoolSelect";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateRoleSchema, CreateRoleType } from "@/types/rolesSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { School } from "@prisma/client";
import { useForm } from "react-hook-form";

type Props = {
  schools: School[];
};

function RolesForm({ schools }: Props) {
  const form = useForm<CreateRoleType>({
    resolver: zodResolver(CreateRoleSchema),
    defaultValues: {
      name: "",
      schoolSettings: false,
      canCreateEmployee: [
        {
          id: "",
          address: "",
        },
      ],
    },
  });

  return (
    <Form {...form}>
      <form className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name:</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <hr />
        <Accordion type="single" className="w-full" defaultValue="school">
          <AccordionItem value="school">
            <AccordionTrigger>School Settings:</AccordionTrigger>
            <AccordionContent>
              <FormField
                control={form.control}
                name="schoolSettings"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Can view school settings and manage school settings
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="emloyee">
            <AccordionTrigger>Employee Settings</AccordionTrigger>
            <AccordionContent>
              {/*  <FormField
                control={form.control}
                name="canCreateEmployee"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Can Create Employees</FormLabel>
                    </div>
                  </FormItem>
                )}
              /> */}
              {form.watch("canCreateEmployee") && (
                <SchoolSelect
                  fieldName="canCreateEmployee"
                  form={form}
                  schools={schools}
                />
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button type="submit">Create Role</Button>
      </form>
    </Form>
  );
}

export default RolesForm;
