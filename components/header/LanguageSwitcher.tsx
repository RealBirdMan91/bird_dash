import React, { useTransition } from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next-intl/client";

function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onChangeHandler(val: string) {
    startTransition(() => {
      router.replace(pathname, { locale: val });
    });
  }
  return (
    <Select
      onValueChange={(val) => onChangeHandler(val)}
      defaultValue={locale}
      disabled={isPending}
    >
      <SelectTrigger className="focus:ring-primary">
        <SelectValue placeholder="Select a verified email to display" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="en">
          <div className="flex items-center mr-3 gap-2">
            <Image src="/images/US.png" alt="lang en" width={24} height={24} />
            <span className="font-semibold text-sm text-neutral-500">en</span>
          </div>
        </SelectItem>
        <SelectItem value="de">
          <div className="flex items-center mr-3 gap-2">
            <Image src="/images/DE.png" width={24} height={24} alt="lang de" />
            <span className="font-semibold text-sm text-neutral-500">de</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

export default LanguageSwitcher;
