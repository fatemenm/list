import type { FormInputs, Item } from "@/lib/definitions";
import { useState } from "react";
import { EmptyList } from "@/components/EmptyList";
import { List } from "@/components/List";
import { ItemModal } from "./ItemModal";

export function ListManager() {
  const [items, setItems] = useState<Item[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<string>("");
  const editingItem = items.find((item) => item.id === editingItemId);

  const addItem = (formData: FormInputs) => {
    const newItem = {
      id: "id" + Math.random().toString(16).slice(2),
      title: formData.title,
      subtitle: formData.subtitle,
      createdAt: new Date(),
    };
    setItems([...items, newItem]);
    setIsOpen(false);
  };

  const editItem = (id: string, formData: FormInputs) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              title: formData.title,
              subtitle: formData.subtitle,
              editedAt: new Date(),
            }
          : item
      )
    );
    setEditingItemId("");
    setIsOpen(false);
  };

  const submitHandler = (data: FormInputs) => {
    if (editingItemId) {
      editItem(editingItemId, data);
    } else {
      addItem(data);
    }
  };

  return (
    <div className="w-2xl flex h-screen">
      {items.length > 0 ? (
        <List
          items={items}
          onAdd={() => setIsOpen(true)}
          onEdit={(id: string) => {
            setIsOpen(true);
            setEditingItemId(id);
          }}
        />
      ) : (
        <EmptyList onCreate={() => setIsOpen(true)} />
      )}
      <ItemModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={submitHandler}
        editingItem={editingItem}
      />
    </div>
  );
}
