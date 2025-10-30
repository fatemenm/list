import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ListPlus } from "lucide-react";

export function EmptyList({ onCreate: createItem }: { onCreate: () => void }) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ListPlus />
        </EmptyMedia>
        <EmptyTitle>No List Item Yet</EmptyTitle>
        <EmptyDescription>
          You&apos;re list is empty.
          <br />
          Get started by creating your first item list.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={createItem} className="w-fit">
          Create an Item
        </Button>
      </EmptyContent>
    </Empty>
  );
}
