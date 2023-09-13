import React from 'react'
import { MoveLeft, Trash2 } from 'lucide-react';

export const Completed = (props) => {
  const handleDelete = (e) => {
    e.preventDefault();
    props.onCompleteDelete(props.todos.id);
  }

  const handleBack = (e) => {
    e.preventDefault();
    props.onBack(props.todos.id, props.todos.content, props.todos.isEditing);
  }
  return (
    <>
      <div className='w-full flex items-center rounded-sm overflow-hidden'>

        <div className="bg-green-400 grow p-2">{props.todos.content}</div>

        <div className='flex gap-2 p-2 bg-green-600'>
          <button onClick={handleBack}>
            <MoveLeft />
          </button>
          <button onClick={handleDelete}>
            <Trash2 />
          </button>
        </div>
      </div>
    </>
  )
}
