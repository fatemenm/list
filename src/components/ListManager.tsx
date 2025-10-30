import type { FormInputs, Item } from "@/lib/definitions";
import { useEffect, useState } from "react";
import { EmptyList } from "@/components/EmptyList";
import { List } from "@/components/List";
import { ItemFormModal } from "./ItemFormModal";
import ItemDeleteAlert from "./ItemDeleteAlert";

export function ListManager() {
  const [items, setItems] = useState<Item[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<string>("");
  const [deletingItemId, setDeletingItemId] = useState<string>("");
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const editingItem = items.find((item) => item.id === editingItemId);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const items = localStorage.getItem("items");
    if (!items) return;

    setItems(
      JSON.parse(items).map((item: Record<string, string>) => ({
        ...item,
        createdAt: new Date(item.createdAt),
        editedAt: item.editedAt ? new Date(item.editedAt) : undefined,
      }))
    );
    setIsLoading(false);
  }, [isLoading]);

  const createItem = (formData: FormInputs) => {
    const newItem = {
      id: "id" + Math.random().toString(16).slice(2),
      title: formData.title,
      subtitle: formData.subtitle,
      createdAt: new Date(),
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    localStorage.setItem("items", JSON.stringify(newItems));
  };

  const editItem = (id: string, formData: FormInputs) => {
    setItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              title: formData.title,
              subtitle: formData.subtitle,
              editedAt: new Date(),
            }
          : item
      );
      localStorage.setItem("items", JSON.stringify(newItems));
      return newItems;
    });
  };

  const deleteItem = (id: string) => {
    setItems((previousItems) => {
      const newItems = previousItems.filter((item) => item.id !== id);
      localStorage.setItem("items", JSON.stringify(newItems));
      return newItems;
    });
  };

  const submitHandler = (data: FormInputs) => {
    if (editingItemId) {
      editItem(editingItemId, data);
    } else {
      createItem(data);
    }
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItemId("");
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
    setDeletingItemId("");
  };

  if (isLoading) return <div className="mt-100">Loading...</div>;
  return (
    <div className="w-2xl flex h-screen">
      {items.length > 0 ? (
        <List
          items={items}
          onCreate={() => setIsModalOpen(true)}
          onEdit={(id: string) => {
            setIsModalOpen(true);
            setEditingItemId(id);
          }}
          onDelete={(id: string) => {
            setIsAlertOpen(true);
            setDeletingItemId(id);
          }}
        />
      ) : (
        <EmptyList onCreate={() => setIsModalOpen(true)} />
      )}
      {isModalOpen && (
        <ItemFormModal
          onClose={() => closeModal()}
          onSubmit={submitHandler}
          editingItem={editingItem}
        />
      )}
      {isAlertOpen && (
        <ItemDeleteAlert
          onClose={() => closeAlert()}
          onDelete={() => {
            deleteItem(deletingItemId);
            closeAlert();
          }}
        />
      )}
    </div>
  );
}
