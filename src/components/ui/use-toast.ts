"use client";

import { toast as sonnerToast } from "sonner";

interface CustomToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  // Add other sonner options as needed, e.g., action, duration, etc.
}

export function useToast() {
  const toast = ({ title, description, ...props }: CustomToastProps) => {
    sonnerToast(title, {
      description,
      ...props,
    });
  };

  return { toast };
}
