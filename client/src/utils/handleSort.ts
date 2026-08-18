import { MutableRefObject } from "react";

export default function handleSort<T>(
  dragItem: MutableRefObject<number | null>,
  dragOverItem: MutableRefObject<number | null>,
  sortingItems: T[],
  onSortingItem: (items: T[]) => void,
) {
  if (dragItem.current !== null && dragOverItem.current !== null) {
    const items = [...sortingItems];
    const draggedItem = items.splice(dragItem.current, 1)[0];
    items.splice(dragOverItem.current, 0, draggedItem);
    onSortingItem(items);
  }

  dragItem.current = null;
  dragOverItem.current = null;
}
