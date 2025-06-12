import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");
  if (session.user.role !== "admin") {
    return <div className="p-8 text-center">Unauthorized</div>;
  }
  return <DashboardLayout session={session}>{children}</DashboardLayout>;
}
