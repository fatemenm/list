import type { Item } from "@/lib/definitions";
import { ListItem } from "./ListItem";
import { Button } from "@/components/ui/button";

export function List({
  items,
  addItem,
}: {
  items: Item[];
  addItem: () => void;
}) {
  return (
    <div className="w-full mt-20 flex flex-col gap-8">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-semibold">Items</h1>
        <Button onClick={addItem}>Add Item</Button>
      </div>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <ListItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
