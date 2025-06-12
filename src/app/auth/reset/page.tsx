import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ResetPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-12">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow p-8 text-center">
        <h1 className="text-2xl font-bold mb-6">Reset Password</h1>
        <p className="mb-6">
          Password reset is not available in this demo. Please use the demo
          accounts or contact support.
        </p>
        <Button asChild className="w-full">
          <Link href="/auth/signin">Go to Sign In</Link>
        </Button>
      </div>
    </div>
  );
}
