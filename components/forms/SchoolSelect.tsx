import React from "react";
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
  FormLabel,
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

interface SchoolInputProps extends Props {
  schools: CreateEmployeeType["school"];
}
type SchoolInput = {
  address: string;
  id: string;
  isRemote: boolean;
};

function SchoolInput({ form, schools }: SchoolInputProps) {
  const [inputValue, setInputValue] = React.useState<SchoolInput | null>(null);
  return (
    <FormField
      control={form.control}
      name="school"
      render={({ field }) => (
        <FormItem className="flex flex-col ">
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
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
                          ...(!inputValue ? field.value : []),
                          school,
                        ]);
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

  const InputFields = [];
  return (
    <div className="flex flex-col  gap-4 border-2   border-neutral-500 p-4 rounded-md">
      <div className="flex items-center">
        <div>
          <h2 className="text-2xl">Schools</h2>
          <p className="text-sm text-muted-foreground">
            Select the schools that you want to add to your employee.
          </p>
        </div>
        <Button className="ml-auto" type="button">
          Add School
        </Button>
      </div>
      <div className="border rounded-md py-2 px-4 shadow-sm">
        <SchoolInput form={form} schools={schoolsFromDb} />
      </div>
    </div>
  );
}

export default SchoolSelect;
