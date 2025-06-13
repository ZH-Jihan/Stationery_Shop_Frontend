"use client";

import { Button } from "@/components/ui/button";
import { regeister } from "@/services/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      name: name,
      email: email,
      password: password,
    };
    const response = await regeister(data);
    if (response.success) {
      window.alert("Success");
      router.push("/auth/signin");
    }

    setLoading(false);
  };
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-12">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded px-3 py-2 border"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded px-3 py-2 border"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded px-3 py-2 border"
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Register..." : "Sign Up"}
          </Button>
        </form>
        <div className="my-4 text-center text-muted-foreground">or</div>

        <div className="flex justify-between mt-4 text-sm">
          You already have account ?
          <Link href="/auth/signin" className="underline">
            SignIn
          </Link>
        </div>
      </div>
    </div>
  );
}
