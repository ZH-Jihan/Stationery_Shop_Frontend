import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");
  if (!session.user || session.user.role !== "admin") {
    return <div className="p-8 text-center">Unauthorized</div>;
  }
  return <DashboardLayout session={session}>{children}</DashboardLayout>;
}
