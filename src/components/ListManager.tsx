import type { FormInputs, Item } from "@/lib/definitions";
import { useState } from "react";
import { EmptyList } from "@/components/EmptyList";
import { List } from "@/components/List";
import { ItemFormModal } from "./ItemFormModal";
import ItemDeleteAlert from "./ItemDeleteAlert";

export function ListManager() {
  const [items, setItems] = useState<Item[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<string>("");
  const [deletingItemId, setDeletingItemId] = useState<string>("");
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const editingItem = items.find((item) => item.id === editingItemId);

  const createItem = (formData: FormInputs) => {
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
      createItem(data);
    }
  };

  const deleteHandler = (id: string) => {
    setItems((previousItems) => previousItems.filter((item) => item.id !== id));
    setDeletingItemId("");
    setIsAlertOpen(false);
  };

  //   TODO: save to local storage

  return (
    <div className="w-2xl flex h-screen">
      {items.length > 0 ? (
        <List
          items={items}
          onCreate={() => setIsOpen(true)}
          onEdit={(id: string) => {
            setIsOpen(true);
            setEditingItemId(id);
          }}
          onDelete={(id: string) => {
            setIsAlertOpen(true);
            setDeletingItemId(id);
          }}
        />
      ) : (
        <EmptyList onCreate={() => setIsOpen(true)} />
      )}
      <ItemFormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={submitHandler}
        editingItem={editingItem}
      />
      <ItemDeleteAlert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onDelete={() => deleteHandler(deletingItemId)}
      />
    </div>
  );
}
