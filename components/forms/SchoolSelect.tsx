"use client";
import React, { useState } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CreateEmployeeType } from "@/types/employeeSchema";
import { School } from "@prisma/client";
import { TiDeleteOutline } from "react-icons/ti";

type TSchool = {
  id: string;
  address: string;
};

type Props = {
  fieldName: string;
  form: UseFormReturn<any>;
  schools: Pick<School, "id" | "address">[];
};

type Field = ControllerRenderProps<CreateEmployeeType, "schools">;

interface SchoolInputProps extends Props {
  selectedSchool: Pick<School, "id" | "address">;
}

function SelectInput({
  form,
  schools,
  selectedSchool,
  fieldName,
}: SchoolInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  function onSelectHandler(
    field: Field,
    school: Pick<School, "id" | "address">
  ) {
    setIsOpen(false);
    if (selectedSchool.id) {
      return form.setValue(fieldName, [
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
    form.setValue(fieldName, [
      ...field.value.filter((s) => s.id !== ""),
      { id: school.id, address: school.address },
    ]);
  }

  function onRemoveHandler(school: Pick<School, "id" | "address">) {
    const schools = form.getValues(fieldName) as TSchool[];
    if (schools.length <= 1) return;
    form.setValue(
      fieldName,
      schools.filter((s) => s.id !== school.id)
    );
  }

  return (
    <div className="border rounded-md py-2 px-4 shadow-sm flex items-center gap-4">
      <FormField
        control={form.control}
        name={fieldName}
        render={({ field }) => (
          <FormItem className="flex flex-grow flex-col">
            <Popover onOpenChange={() => setIsOpen(true)} open={isOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                    aria-expanded={isOpen}
                  >
                    {selectedSchool.address || "Select a school"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>

              <PopoverContent className="w-[50vw]  p-0">
                <Command>
                  <CommandInput placeholder="Search school..." />
                  <CommandEmpty>No school found.</CommandEmpty>
                  <CommandGroup className="max-h-[250px] overflow-y-scroll">
                    {schools.map((school) => (
                      <CommandItem
                        value={school.address}
                        key={school.id}
                        /* @ts-ignore */
                        onSelect={() => onSelectHandler(field, school)}
                      >
                        {school.address}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />
      {form.getValues(fieldName).length > 1 && (
        <div>
          <TiDeleteOutline
            className="w-8 h-8 text-red-400 hover:text-red-500 cursor-pointer"
            onClick={() => onRemoveHandler(selectedSchool)}
          />
        </div>
      )}
    </div>
  );
}

function SchoolSelect({ form, schools, fieldName }: Props) {
  const selectedSchools = form.watch(fieldName) as TSchool[];
  const filteredSchools = schools.filter(
    (school) => !selectedSchools.some((s) => s.id === school.id)
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
            form.setValue(fieldName, [
              ...selectedSchools,
              { id: "", address: "" },
            ]);
          }}
        >
          Add School
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {selectedSchools.map((school, index) => (
          <SelectInput
            fieldName={fieldName}
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
