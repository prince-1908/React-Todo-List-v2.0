import React, { useState } from 'react'

export const TodoForm = (props) => {
    const [value, setValue] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        props.newTodo(value);
        setValue("");
    }

    return (
        <form onSubmit={handleSubmit} className='flex w-full'>
            <input
                type="text"
                placeholder='write here...'
                className='py-2 px-4 outline-none grow'
                value={value}
                onChange={(e) => {setValue(e.target.value)}}
            />
            <button type="submit" className='bg-[#BEADFA] py-2 px-4 hover:bg-[#8c6cff] transition-all'>Add</button>
        </form>
    )
}
