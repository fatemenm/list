import type { FormInputs, Item } from "@/lib/definitions";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";

type ItemModalProps = {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  onSubmit: (data: FormInputs) => void;
  editingItem?: Item;
};

type ModalTexts = {
  title: string;
  description: string;
  primaryButton: string;
};

const initialForm: FormInputs = { title: "", subtitle: "" };
const defaultModalTexts = {
  title: "Create Item",
  description: "Create a new item.",
  primaryButton: "Create",
};

export function ItemFormModal({
  isOpen,
  onClose,
  onSubmit,
  editingItem,
}: ItemModalProps) {
  const [form, setForm] = useState<FormInputs>(initialForm);
  const [modalTexts, setModalTexts] = useState<ModalTexts>(defaultModalTexts);

  useEffect(() => {
    if (editingItem) {
      setForm({ title: editingItem.title, subtitle: editingItem.subtitle });
      setModalTexts({
        title: "Edit Item",
        description: "Update the details of your item.",
        primaryButton: "Save changes",
      });
    }
    return () => setModalTexts(defaultModalTexts);
  }, [editingItem]);

  return (
    <Dialog modal open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
            setForm(initialForm);
          }}
          className="flex flex-col gap-6"
        >
          <DialogHeader>
            <DialogTitle>{modalTexts.title}</DialogTitle>
            <DialogDescription>{modalTexts.description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                name="subtitle"
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">{modalTexts.primaryButton}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
