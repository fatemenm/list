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
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

type ItemModalProps = {
  onClose: (open: boolean) => void;
  onSubmit: (data: FormInputs) => void;
  editingItem?: Item;
};

const initialForm: FormInputs = { title: "", subtitle: "" };

const createModeTexts = {
  title: "Create Item",
  description: "Create a new item.",
  primaryButton: "Create",
} as const;

const editModeTexts = {
  title: "Edit Item",
  description: "Update the details of your item.",
  primaryButton: "Save changes",
} as const;

export function ItemFormModal({
  onClose,
  onSubmit,
  editingItem,
}: ItemModalProps) {
  const [modalTexts, setModalTexts] = useState<
    typeof createModeTexts | typeof editModeTexts
  >(createModeTexts);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({ defaultValues: initialForm });

  useEffect(() => {
    if (editingItem) {
      reset({ title: editingItem.title, subtitle: editingItem.subtitle });
      setModalTexts(editModeTexts);
    } else {
      reset(initialForm);
      setModalTexts(createModeTexts);
    }
  }, [editingItem, reset]);

  return (
    <Dialog modal defaultOpen={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <DialogHeader>
            <DialogTitle>{modalTexts.title}</DialogTitle>
            <DialogDescription>{modalTexts.description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                {...register("title", {
                  required: "Title is required.",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters.",
                  },
                })}
                id="title"
                name="title"
              />
              <p
                className={cn("text-red-600 invisible min-h-5 text-sm", {
                  visible: errors.title,
                })}
              >
                {errors.title?.message}
              </p>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                {...register("subtitle", {
                  required: "Subtitle is required",
                  minLength: {
                    value: 3,
                    message: "Subtitle must be at least 3 characters.",
                  },
                })}
                id="subtitle"
                name="subtitle"
              />
              <p
                className={cn("text-red-600 invisible min-h-5 text-sm", {
                  visible: errors.subtitle,
                })}
              >
                {errors.subtitle?.message}
              </p>
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
