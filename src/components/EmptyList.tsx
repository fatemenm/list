import { Button } from "@/components/ui/button";

export function EmptyList({ onCreate: createItem }: { onCreate: () => void }) {
  return (
    <div className="w-full self-center flex flex-col gap-10 items-center">
      <h2 className="text-2xl">Create your first Item!</h2>
      <Button onClick={createItem} className="w-fit">
        Create an Item
      </Button>
    </div>
  );
}
