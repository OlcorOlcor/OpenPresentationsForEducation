import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SlideItemProps {
    id: string;
    index: number;
    isActive: boolean;
    isSelected: boolean;
    onClick: () => void;
}

const SortableSlideItem: React.FC<SlideItemProps> = ({ id, index, isActive, isSelected, onClick }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    return (
        <div ref={setNodeRef} style={{
            transform: CSS.Transform.toString(transform),
            transition,
            padding: "6px 12px",
            border: "1px solid gray",
            borderRadius: "4px",
            cursor: "grab",
            background: isSelected ? "#d0e6ff" : "#fff",
            opacity: isActive ? 1 : 0.5,
            marginRight: "5px"
        }} {...attributes} {...listeners} onClick={onClick}>
            {index + 1}
        </div>
    );
};

export default SortableSlideItem;