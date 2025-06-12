import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface InfoCardProps {
  title: string;
  description: string;
  imageSrc: string;
  linkText: string;
  linkHref: string;
  dark: boolean;
}

export function InfoCard({
  title,
  description,
  imageSrc,
  linkText,
  linkHref,
  dark,
}: InfoCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg p-6 overflow-hidden",
        dark ? "bg-gray-900 text-white" : "bg-white text-gray-900 shadow-md"
      )}
    >
      <Image
        src={imageSrc}
        alt={title}
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-20"
      />
      <div className="relative z-10">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-sm mb-4">{description}</p>
        <Link
          href={linkHref}
          className={cn(
            "inline-flex items-center gap-1 font-semibold text-sm",
            dark
              ? "text-white hover:text-blue-300"
              : "text-blue-600 hover:text-blue-800"
          )}
        >
          {linkText} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
