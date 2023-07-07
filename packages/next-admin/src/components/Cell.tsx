import React from "react";

import { ListDataFieldValue, ModelName } from "../types";
import { ADMIN_BASE_PATH } from "../config";
import Link from "next/link";
import clsx from "clsx";

type Props = {
  cell: ListDataFieldValue;
};
export default function Cell({ cell }: Props) {
  if (cell !== null) {
    if (typeof cell === "object") {
      if (cell.type === "link") {
        return (
          <Link
            onClick={(e) => e.stopPropagation()}
            href={`${ADMIN_BASE_PATH}/${cell.value.url}`}
            className="hover:underline cursor-pointer text-indigo-700 hover:text-indigo-900 font-semibold"
          >
            {cell.value.label}
          </Link>
        );
      } else if (cell.type === "count") {
        return (
          <div className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
            <p>{cell.value}</p>
          </div>
        );
      } else if (cell.type === "date") {
        return (
          <div className="whitespace-nowrap max-w-[20ch] overflow-hidden text-ellipsis text-neutral-600">
            <p>{cell.value.toString()}</p>
          </div>
        );
      }
    } else if (typeof cell === "string") {
      return (
        <div className="whitespace-nowrap overflow-hidden text-ellipsis text-neutral-600">
          <p>{cell.toString()}</p>
        </div>
      );
    } else if (typeof cell === "number") {
      return (
        <div className="whitespace-nowrap max-w-[20ch] overflow-hidden text-ellipsis text-neutral-600">
          <p>{cell.toString()}</p>
        </div>
      );
    } else if (typeof cell === "boolean") {
      return (
        <div
          className={clsx(
            "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium",
            {
              "bg-indigo-50 text-indigo-500": cell === true,
              "bg-neutral-50 text-neutral-600": cell === false,
            }
          )}
        >
          <p>{cell.toString()}</p>
        </div>
      );
    }
    return <div>{JSON.stringify(cell)}</div>;
  }
  return null;
}
