"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseFrontendClient } from "@/lib/supabase";
import { toast } from "react-toastify";

export default function Login() {
  async function formHandler(formData: FormData) {
    const email = formData.get("email");
    const supabase = createSupabaseFrontendClient();

    const { data, error } = await supabase.auth.signInWithOtp({
      email: email as string,
      options: {
        shouldCreateUser: false,
      },
    });
    if (error) {
      console.log(error);
      toast.error("Error sending OTP");
    }
    if (data.session) {
      toast.success("One Time Password sent to your email");
    }
  }

  return (
    <div className="bg-white min-w-[350px] py-6 px-4 border-4 border-slate-900 rounded-md flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Login:</h1>
        <p className="text-lg">An email will be send to your account</p>
      </div>
      <form action={formHandler}>
        <Input placeholder="email" name="email" type="email" />
        <Button className="mt-4">Sign In</Button>
      </form>
    </div>
  );
}
