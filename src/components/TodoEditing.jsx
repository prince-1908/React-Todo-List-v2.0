import React from 'react'
import { useState } from 'react';

export const TodoEditing = (props) => {
    const [value, setValue] = useState(props.content);
    const handleSubmit = (e) => {
        e.preventDefault();
        props.editTodo(props.id, value);
    }
    return (
        <>
            <form onSubmit={handleSubmit} className='flex w-full'>
            <input
                type="text"
                placeholder='Edit Todo'
                className='py-2 px-4 outline-none grow'
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button type="submit" className='bg-[#BEADFA] py-2 px-4 hover:bg-[#8c6cff] transition-all'>Done</button>
        </form>
        </>
    )
}
