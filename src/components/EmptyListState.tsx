import { Button } from "@/components/ui/button";

export function EmptyListState({ addItem }: { addItem: () => void }) {
  return (
    <div className="w-full self-center flex flex-col gap-10 items-center">
      <h2 className="text-2xl">Create your first Item!</h2>
      <Button onClick={addItem} className="w-fit">
        Create an Item
      </Button>
    </div>
  );
}
