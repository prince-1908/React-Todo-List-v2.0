import React, { useEffect } from "react";
import { FileEdit, Trash2 } from "lucide-react";
import { CheckSquare } from "lucide-react";
import { remove,ref } from "firebase/database"

export const Todo = (props) => {
  const handleDelete = (e) => {
    e.preventDefault();
    props.onDelete(props.todos.id);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    props.onEdit(props.todos.id);
  };

  const handleCheck = (e) => {
    e.preventDefault();
    props.onCheck(props.todos.id, props.todos.content, props.todos.isEditing);
  }

  return (
    <>
      <div className="w-full rounded-sm overflow-hidden flex justify-between">

        <div className="flex justify-center items-center mr-2">
          <button onClick={handleCheck}>
            <CheckSquare />
          </button>
        </div>

        <div className="bg-[#FFF3DA] grow p-2">{props.todos.content}</div>

        <div className="bg-[#BEADFA] flex gap-2 px-2">
          <button onClick={handleEdit}>
            <FileEdit />
          </button>
          <button onClick={handleDelete}>
            <Trash2 />
          </button>
        </div>
      </div>
    </>
  );
};
