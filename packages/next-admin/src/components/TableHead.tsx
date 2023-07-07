import { formatCamelCase } from "../utils/tools";
import {
  ArrowSmallDownIcon,
  ArrowSmallUpIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useTransition } from "react";

interface Props {
  onClick: () => void;
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
  property: string;
}
export default function TableHead({
  onClick,
  sortColumn,
  sortDirection,
  property,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const isSorted = sortColumn === property;

  return (
    <button
      onClick={() => {
        startTransition(() => {
          onClick();
        });
      }}
      className="inline-flex items-center justify-center text-sm"
    >
      <span className={clsx("whitespace-nowrap font-bold text-indigo-500")}>
        {formatCamelCase(property)}
      </span>
      <span className="sr-only">, activate to sort column descending</span>
      {isSorted && sortDirection === "desc" && (
        <ArrowSmallDownIcon
          className="ml-2 h-5 w-5 text-indigo-500"
          aria-hidden="true"
        />
      )}
      {isSorted && sortDirection === "asc" && (
        <ArrowSmallUpIcon
          className="ml-2 h-5 w-5 text-indigo-500"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
