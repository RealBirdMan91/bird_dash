import React, { useState } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
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
  FormDescription,
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
import { Checkbox } from "../ui/checkbox";
import { set } from "date-fns";

type Props = {
  form: UseFormReturn<CreateEmployeeType>;
};

interface SchoolInputProps extends Props {
  schools: CreateEmployeeType["school"];
}
type SchoolInput = {
  address: string;
  id: string;
  isRemote: boolean;
};

function SchoolInput({ form, schools }: SchoolInputProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = useState<SchoolInput>({
    address: "",
    isRemote: false,
    id: "",
  });

  const handleRemoteChange = (isChecked: boolean) => {
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      isRemote: isChecked,
    }));

    const updatedSchools = form
      .getValues("school")
      .map((s) => (s.id === inputValue.id ? { ...s, isRemote: isChecked } : s));

    form.setValue("school", updatedSchools);
  };

  return (
    <div className="flex gap-2">
      <FormField
        control={form.control}
        name="school"
        render={({ field }) => (
          <FormItem className="flex flex-col ">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    aria-expanded={open}
                    size="lg"
                    variant="outline"
                    role="combobox"
                    className=" justify-between"
                  >
                    {inputValue?.address || "Select a school"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search language..." />
                  <CommandEmpty>No language found.</CommandEmpty>
                  <CommandGroup>
                    {schools.map((school) => (
                      <CommandItem
                        value={school.address}
                        key={school.id}
                        onSelect={() => {
                          setInputValue(school);
                          form.setValue("school", [
                            ...form.getValues("school"),
                            ...(!inputValue ? field.value : []),
                            school,
                          ]);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            inputValue?.id === school.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
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
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={inputValue?.isRemote}
          onClick={(e) => {
            setInputValue((prevInputValue) => ({
              ...prevInputValue,
              isRemote: !prevInputValue?.isRemote,
            }));
            handleRemoteChange(!inputValue?.isRemote);
          }}
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          work as remote
        </label>
      </div>
    </div>
  );
}

function SchoolSelect({ form }: Props) {
  const schoolsFromDb = [
    {
      id: "1",
      address: "33 New Montgomery St, San Francisco, CA 94105",
      isRemote: false,
    },
    {
      id: "2",
      address: "1234 Main St, San Francisco, CA 94122",
      isRemote: false,
    },
    {
      id: "3",
      address: "1 Infinite Loop, Cupertino, CA 95014",
      isRemote: false,
    },
  ];

  const [elements, setElements] = useState(0);

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
          onClick={() => setElements((prev) => prev + 1)}
        >
          Add School
        </Button>
      </div>
      <div className="border rounded-md py-2 px-4 shadow-sm">
        <SchoolInput form={form} schools={schoolsFromDb} />
        {Array.from({ length: elements }).map((_, i) => (
          <SchoolInput
            key={i}
            form={form}
            schools={schoolsFromDb.filter((schoolDb) =>
              form
                .getValues()
                .school.every((school) => school.id !== schoolDb.id)
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default SchoolSelect;
