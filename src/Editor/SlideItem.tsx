import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useColorMode } from "./ThemeContext";

interface SlideItemProps {
    id: string;
    index: number;
    isActive: boolean;
    isSelected: boolean;
    onClick: () => void;
}

const SortableSlideItem: React.FC<SlideItemProps> = ({
    id,
    index,
    isActive,
    isSelected,
    onClick,
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });
    const { mode } = useColorMode();

    return (
        <div
            ref={setNodeRef}
            style={{
                transform: CSS.Transform.toString(transform),
                transition,
                padding: "6px 12px",
                border: "1px solid gray",
                borderRadius: "4px",
                cursor: "grab",
                background: isSelected
                    ? mode === "dark"
                        ? "#2a5d9f"
                        : "#d0e6ff"
                    : mode === "dark"
                      ? "#1e1e1e"
                      : "#fff",
                color: mode === "dark" ? "#fff" : "#000",
                opacity: isActive ? 1 : 0.5,
                marginRight: "5px",
            }}
            {...attributes}
            {...listeners}
            onClick={onClick}
        >
            {index + 1}
        </div>
    );
};

export default SortableSlideItem;
