import type { Item } from "@/lib/definitions";
import { Button } from "./ui/button";
import { SquarePen, Trash2 } from "lucide-react";

export function ListItem({ item }: { item: Item }) {
  return (
    <div className="flex flex-row justify-between p-4 bg-gray-50  rounded-md gap-4 shadow">
      <div className="flex flex-col gap-1 grow">
        <h2 className="text-lg font-medium text-left">{item.title}</h2>
        <div className="flex flex-row gap-4 items-center w-full text-sm">
          <span>{item.subTitle}</span>
          <span>{item.createdAt.getTime()}</span>
        </div>
      </div>
      <div className="flex flex-row gap-3 items-center">
        <Button className="shadow text-indigo-400 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-500">
          <SquarePen />
        </Button>
        <Button className="shadow text-rose-400 bg-rose-50 hover:bg-rose-100 hover:text-rose-500">
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}
