import React, { useEffect, useState } from 'react'
import { TodoForm } from './TodoForm'
import { Todo } from './Todo'
import { TodoEditing } from './TodoEditing'
import { Completed } from './Completed'
import { set, ref, onValue } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

export const TodoWrapper = (props) => {
    const [todos, setTodos] = useState([]);
    const [checkedTodos, setCheckedTodes] = useState([]);

    // Create
    const newTodo = (value) => {
        const addedTodo = { id: uuidv4(), content: value, isEditing: false };
        set(ref(props.db, `${uuidv4()}`), addedTodo);
    };

    // Read
    useEffect(() => {
        onValue(ref(props.db), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const tempTodo = [];
                Object.values(data).map((todo) => {
                    tempTodo.push(todo);
                });
                setTodos(tempTodo);
            }
        });
    }, []);

    console.log(todos);

    const onDelete = (index) => {
        const deletedTodos = todos.filter(todos => todos.id !== index);
        setTodos(deletedTodos);
    };

    const onCompleteDelete = (index) => {
        const deletedTodos = checkedTodos.filter(todo => todo.id !== index);
        setCheckedTodes(deletedTodos);
    }

    const onEdit = (index) => {
        setTodos(todos.map((todo) => todo.id === index ? { ...todo, isEditing: true } : todo));
    }

    const editTodo = (index, value) => {
        setTodos(todos.map((todo) => todo.id === index ? { ...todo, content: value, isEditing: false } : todo));
    }

    const onCheck = (index) => {
        const nonCheckedTodos = todos.filter(todos => todos.id !== index);
        setTodos(nonCheckedTodos);

        const checked = todos.find(todo => todo.id === index);
        setCheckedTodes([...checkedTodos, checked]);
    }

    const onBack = (index) => {
        const addToTodo = checkedTodos.find(todo => todo.id === index);
        setTodos([...todos, addToTodo]);

        const removeFromChecked = checkedTodos.filter(todo => todo.id !== index);
        setCheckedTodes(removeFromChecked);
    }
    return (
        <div className='bg-[#DFCCFB] w-[50vw] p-10 grid place-items-center gap-4 relative top-10'>
            <h1 className='text-center font-bold'>
                What's in your mind?
            </h1>

            <TodoForm newTodo={newTodo} />

            <div className='flex w-full'>
                {todos.length === 0 ?
                    (
                        <div className='w-1/2 border-r border-black gap-2 flex justify-center items-center'>
                            empty
                        </div>
                    )
                    : (
                        <div className='w-1/2 flex flex-col-reverse gap-2 p-2'>
                            {todos.map((todo) =>
                                todo.isEditing ?
                                    (<TodoEditing key={todo.id} todos={todo} content={todo.content} id={todo.id} editTodo={editTodo} />)
                                    : (<Todo key={todo.id} todos={todo} onDelete={onDelete} onEdit={onEdit} onCheck={onCheck} />)
                            )}
                        </div>
                    )
                }

                <div className='w-1/2 border-l border-black p-2'>
                    <div className='text-center font-bold border-b border-black pb-1 mb-2'>completed</div>
                    <div className='flex flex-col-reverse items-center gap-2'>
                        {checkedTodos.map((todo) => {
                            return <Completed key={todo.id} todos={todo} onCompleteDelete={onCompleteDelete} onBack={onBack} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}