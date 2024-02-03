import { useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";

export type UseSortableOption<SortableItem extends { index: number }> = {
  sortableItem: SortableItem;
  sortableItemType: string;
  onHover: (prevIndex: number, nextIndex: number) => void;
};

export function useSortable<SortableItem extends { index: number }>({
  sortableItem,
  sortableItemType,
  onHover,
}: UseSortableOption<SortableItem>) {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop<SortableItem>({
    accept: sortableItemType,
    hover(hoverItem: SortableItem, monitor) {
      if (!ref.current) return;
      const dragIndex = hoverItem.index;
      const hoverIndex = sortableItem.index;
      if (dragIndex === hoverIndex) return;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      onHover(dragIndex, hoverIndex);
      hoverItem.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: sortableItemType,
    item: () => {
      return { index: sortableItem.index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return {
    ref,
    drop,
    drag,
    preview,
    isDragging,
  };
}
