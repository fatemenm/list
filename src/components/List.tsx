import type { Item } from "@/lib/definitions";
import { ListItem } from "./ListItem";
import { Button } from "@/components/ui/button";

export function List({
  items,
  onCreate,
  onEdit,
  onDelete,
}: {
  items: Item[];
  onCreate: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="w-full flex flex-col gap-8 my-20 ">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-semibold">Items</h1>
        <Button className="cursor-pointer " onClick={onCreate}>
          Create an Item
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <ListItem
            item={item}
            key={item.id}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
