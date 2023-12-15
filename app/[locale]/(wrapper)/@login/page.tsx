import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseServerClient } from "@/lib/supabase";
import { cookies } from "next/headers";

export default function Login() {
  async function formHandler(formData: FormData) {
    "use server";
    const email = formData.get("email");
    const supabase = createSupabaseServerClient(cookies);

    const { data, error } = await supabase.auth.signInWithOtp({
      email: email as string,
      options: {
        shouldCreateUser: false,
      },
    });
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
