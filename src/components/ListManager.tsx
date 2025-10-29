import type { Item } from "@/lib/definitions";
import { useState } from "react";
import { EmptyListState } from "@/components/EmptyListState";
import { List } from "@/components/List";

export function ListManager() {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = (item: Item) => {
    setItems([...items, item]);
  };

  return (
    <div className="w-2xl flex h-screen">
      {items.length > 0 ? (
        <List
          items={items}
          addItem={() =>
            addItem({
              id: "id" + Math.random().toString(16).slice(2),
              title: "fist todo",
              subTitle: "sub e todo",
              createdAt: new Date(),
            })
          }
        />
      ) : (
        <EmptyListState
          addItem={() =>
            addItem({
              id: "id" + Math.random().toString(16).slice(2),
              title: "fist todo",
              subTitle: "sub e todo",
              createdAt: new Date(),
            })
          }
        />
      )}
    </div>
  );
}
