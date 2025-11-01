import type { Item } from "@/lib/definitions";
import { Button } from "./ui/button";
import { SquarePen, Trash2 } from "lucide-react";

export function ListItem({
  item,
  onEdit,
  onDelete,
}: {
  item: Item;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="flex flex-row justify-between p-4 bg-white border border-gray-100 rounded-md gap-10 shadow">
      <div className="flex flex-col gap-1 grow w-2/3">
        <h2 className="text-lg font-medium text-left">{item.title}</h2>
        <div className="flex flex-col gap-4  justify-between w-full text-sm">
          <p className="wrap-break-word  text-left">{item.subtitle}</p>
          <span className="text-gray-400 text-xs text-left shrink-0">
            {item.editedAt
              ? `edited at: ${item.editedAt.toString().split("GMT")[0]}`
              : `created at: ${item.createdAt.toString().split("GMT")[0]}`}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center sm:flex-row gap-3 items-center">
        <Button
          id={item.id}
          onClick={(e) => onEdit(e.currentTarget.id)}
          className="shadow-sm cursor-pointer text-gray-500 bg-gray-100 hover:bg-indigo-50 hover:text-indigo-400"
        >
          <SquarePen />
        </Button>
        <Button
          id={item.id}
          onClick={(e) => onDelete(e.currentTarget.id)}
          className="shadow-sm cursor-pointer text-gray-500 bg-gray-100 hover:bg-rose-50 hover:text-rose-400"
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}
