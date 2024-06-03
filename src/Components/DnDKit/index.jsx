import React, { useState } from 'react'

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { SortableItem } from './SortableItem';

import Accordion from 'react-bootstrap/Accordion';

const DnDKit = () => {
  const [items, setItems] = useState([
    {
      "id": 2,
      "order": 0,
      "name": "Category 1",
      "groups": [
        {
          "id": 0,
          "name": "Cat 1 Group 1",
          "hint": "",
          "questions": [
            {
              "id": 1,
              "pageNo": 1,
              "type": "text",
              "x": 0,
              "y": 0,
              "question": "Question 1?",
              "options": [],
              "pdfWidth": 700,
              "boxW": 60,
              "boxH": 35
            }
          ]
        },
        {
          "id": 1,
          "name": "Cat 1 Group 2",
          "hint": "",
          "questions": [
            {
              "id": 3,
              "pageNo": 1,
              "type": "text",
              "x": 0,
              "y": 0,
              "question": "Question 2",
              "options": [],
              "pdfWidth": 700,
              "boxW": 60,
              "boxH": 35
            },
            {
              "id": 5,
              "pageNo": 1,
              "type": "text",
              "x": 0,
              "y": 0,
              "question": "Question 3",
              "options": [],
              "pdfWidth": 700,
              "boxW": 60,
              "boxH": 35
            }
          ]
        }
      ]
    },
    {
      "id": 5,
      "order": 1,
      "name": "Category 2",
      "groups": [
        {
          "id": 2,
          "name": "Category 2 Group 1",
          "hint": "",
          "questions": [
            {
              "id": 7,
              "pageNo": 1,
              "type": "text",
              "x": 0,
              "y": 0,
              "question": "Question 5",
              "options": [],
              "pdfWidth": 700,
              "boxW": 60,
              "boxH": 35
            }
          ]
        },
        {
          "id": 3,
          "name": "Category 2 Group 3",
          "hint": "",
          "questions": [
            {
              "id": 9,
              "pageNo": 1,
              "type": "text",
              "x": 0,
              "y": 0,
              "question": "Question 6",
              "options": [],
              "pdfWidth": 700,
              "boxW": 60,
              "boxH": 35
            }
          ]
        }
      ]
    }
  ]);

  // const [items, setItems] = useState([1, 2, 3])
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    console.log(active, over);

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);

        console.log(oldIndex, newIndex);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }


  return (

    <div className='bg-secondary'>
      <Accordion defaultActiveKey="0">

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items}
            strategy={verticalListSortingStrategy}
          >
            {items.map((data) => <SortableItem key={data.id} id={data.id} data={data}/>)}
          </SortableContext>
        </DndContext>
      </Accordion>

    </div>

  );


}

export default DnDKit