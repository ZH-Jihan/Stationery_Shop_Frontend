import { InfoCard } from "@/components/dashboard/InfoCard";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { UsersChart } from "@/components/dashboard/UsersChart";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { DollarSign, ShoppingCart, Trophy, Users } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  // Optional: Role-based authorization
  if (session.user.role !== "user") {
    return (
      <div className="p-8 text-center text-red-500">Unauthorized Access</div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Today's Money"
          value="$53,000"
          percentageChange="+55%"
          percentageColor="text-green-500"
          icon={DollarSign}
          iconBgColor="bg-blue-500"
        />
        <StatsCard
          title="Today's Users"
          value="2,300"
          percentageChange="+3%"
          percentageColor="text-green-500"
          icon={Users}
          iconBgColor="bg-orange-500"
        />
        <StatsCard
          title="New Clients"
          value="+3,462"
          percentageChange="-2%"
          percentageColor="text-red-500"
          icon={Trophy}
          iconBgColor="bg-green-500"
        />
        <StatsCard
          title="Sales"
          value="$103,430"
          percentageChange="+5%"
          percentageColor="text-green-500"
          icon={ShoppingCart}
          iconBgColor="bg-pink-500"
        />
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InfoCard
          title="Build by developers"
          description="From colors, cards, typography to complex elements, you will find the full documentation."
          imageSrc="/images/rocket.png" // Placeholder image, you'll need to add this image to your public/images folder
          linkText="Read More"
          linkHref="#"
          dark={false} // This card has a light background
        />
        <InfoCard
          title="Work with the rockets"
          description="Wealth creation is an evolutionarily recent positive-sum game. It is all about who take the opportunity first."
          imageSrc="/images/person-working.jpg" // Placeholder image
          linkText="Read More"
          linkHref="#"
          dark={true} // This card has a dark background
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UsersChart />
        <SalesChart />
      </div>
    </div>
  );
}
