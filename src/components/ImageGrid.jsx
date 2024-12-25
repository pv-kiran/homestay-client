import React, { useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableImage } from './SortableImage';



export function ImageGrid({ urls, onReorder }) {
    const [imageUrls, setImageUrls] = useState(urls);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setImageUrls((items) => {
                const oldIndex = items.findIndex((_, index) => `${index}` === active.id);
                const newIndex = items.findIndex((_, index) => `${index}` === over.id);
                const newOrder = arrayMove(items, oldIndex, newIndex);
                onReorder?.(newOrder);
                return newOrder;
            });
        }
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={imageUrls.map((_, index) => `${index}`)}
                strategy={rectSortingStrategy}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {imageUrls.map((url, index) => (
                        <SortableImage
                            key={index}
                            id={`${index}`}
                            url={url}
                        />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
}