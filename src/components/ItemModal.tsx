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

const initialForm: FormInputs = { title: "", subtitle: "" };

export function ItemModal({
  isOpen,
  onClose,
  onSubmit,
  editingItem,
}: ItemModalProps) {
  const [form, setForm] = useState<FormInputs>(initialForm);

  useEffect(() => {
    if (editingItem)
      setForm({ title: editingItem.title, subtitle: editingItem.subtitle });
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
            <DialogTitle>Create an Item</DialogTitle>
            <DialogDescription>Create your first item! 🚀</DialogDescription>
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
            <Button type="submit">Add Item</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
