"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const error = params.get("error");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
    setLoading(false);
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-12">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        {error && (
          <div className="mb-4 text-red-600 text-center">
            Invalid credentials
          </div>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <div className="my-4 text-center text-muted-foreground">or</div>
        <Button
          variant="outline"
          className="w-full mb-2"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          Sign in with Google
        </Button>

        {/* Demo User/Admin Buttons */}
        <div className="flex flex-col gap-2 mt-4">
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              setEmail("user@demo.com");
              setPassword("user123");
            }}
          >
            Demo User
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              setEmail("admin@gmail.com");
              setPassword("admin123");
            }}
          >
            Demo Admin
          </Button>
        </div>

        <div className="flex justify-between mt-4 text-sm">
          <a href="/auth/reset" className="underline">
            Forgot password?
          </a>
          <a href="/auth/signup" className="underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
