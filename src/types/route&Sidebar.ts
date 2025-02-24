import { ReactNode } from "react";

export type TRoute = {
  path: string;
  element: ReactNode;
};
export type TSidebarItem =
  | {
      key: string;
      label: { to: string; name: string };
      children?: TSidebarItem[];
    }
  | undefined;

export type TDesboardPath = {
  name?: string;
  path?: string;
  kind?: "header" | "divider";
  icon?: ReactNode;
  element?: ReactNode;
  children?: TDesboardPath[];
};
export type TPath = {
  name?: string;
  path?: string;
  element?: ReactNode;
  children?: TPath[];
};
