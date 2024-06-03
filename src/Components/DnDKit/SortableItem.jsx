import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import Accordion from 'react-bootstrap/Accordion';

export function SortableItem({ id, data }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} >
            <Accordion.Item eventKey={`${data.id}`}>
                <Accordion.Header>
                    <div className='d-flex justify-content-between'>
                        <div>{data.name} {id}</div>
                        <div>
                            <button {...attributes} {...listeners}>Drag me Now</button>
                        </div>
                    </div>


                </Accordion.Header>
                <Accordion.Body>

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
            </Accordion.Item>
        </div>
    );
}