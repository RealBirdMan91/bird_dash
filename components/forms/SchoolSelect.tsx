"use client";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ChevronsUpDown } from "lucide-react";
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
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CreateEmployeeType } from "@/types/employeeSchema";

type Props = {
  form: UseFormReturn<CreateEmployeeType>;
};

type School = {
  address: string;
  id: string;
};

interface SchoolInputProps extends Props {
  schools: School[];
  selectedSchool: School;
}

function SelectInput({ form, schools, selectedSchool }: SchoolInputProps) {
  return (
    <div className="border rounded-md py-2 px-4 shadow-sm">
      <FormField
        control={form.control}
        name="schools"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn("w-[200px] justify-between")}
                  >
                    {selectedSchool.address || "Select a school"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search language..." />
                  <CommandEmpty>No language found.</CommandEmpty>
                  <CommandGroup>
                    {schools.map((school) => (
                      <CommandItem
                        value={school.address}
                        key={school.id}
                        onSelect={() => {
                          if (selectedSchool.id) {
                            return form.setValue("schools", [
                              ...field.value.map((s) => {
                                if (s.id === selectedSchool.id) {
                                  return {
                                    id: school.id,
                                    address: school.address,
                                  };
                                }
                                return s;
                              }),
                            ]);
                          }
                          form.setValue("schools", [
                            ...field.value.filter((s) => s.id !== ""),
                            { id: school.id, address: school.address },
                          ]);
                        }}
                      >
                        {school.address}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function SchoolSelect({ form }: Props) {
  const schoolsfromDb = [
    { id: "1", address: "School 1" },
    { id: "2", address: "School 2" },
    { id: "3", address: "School 3" },
    { id: "4", address: "School 4" },
    { id: "5", address: "School 5" },
  ];

  const selectedSchools = form.getValues("schools");

  const filteredSchools = schoolsfromDb.filter(
    (schoolDb) => !selectedSchools.some((school) => school.id === schoolDb.id)
  );

  return (
    <div className="flex flex-col  gap-4 border-2   border-neutral-500 p-4 rounded-md">
      <div className="flex items-center">
        <div>
          <h2 className="text-2xl">Schools</h2>
          <p className="text-sm text-muted-foreground">
            Select the schools that you want to add to your employee.
          </p>
        </div>
        <Button
          className="ml-auto"
          type="button"
          disabled={Boolean(selectedSchools.find((school) => school.id === ""))}
          onClick={() => {
            form.setValue("schools", [
              ...selectedSchools,
              { id: "", address: "" },
            ]);
          }}
        >
          Add School
        </Button>
      </div>
      <div>
        {selectedSchools.map((school, index) => (
          <SelectInput
            key={index}
            form={form}
            schools={filteredSchools}
            selectedSchool={school}
          />
        ))}
      </div>
    </div>
  );
}

export default SchoolSelect;
