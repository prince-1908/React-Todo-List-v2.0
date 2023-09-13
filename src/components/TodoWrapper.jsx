import React, { useEffect, useState } from 'react'
import { TodoForm } from './TodoForm'
import { Todo } from './Todo'
import { TodoEditing } from './TodoEditing'
import { Completed } from './Completed'
import { set, ref, onValue, remove, update } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyD6bVeCDqfSYBdeqLKmj5X91vK-vjOrdRU",
    authDomain: "todo-list-1c197.firebaseapp.com",
    projectId: "todo-list-1c197",
    storageBucket: "todo-list-1c197.appspot.com",
    messagingSenderId: "521888047918",
    appId: "1:521888047918:web:8869dee215267c63d090bf",
    measurementId: "G-8QM257GEWE",
    databaseURL: "https://todo-list-1c197-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const analytics = getAnalytics(app);

export const TodoWrapper = (props) => {
    const [todos, setTodos] = useState([]);
    const [checkedTodos, setCheckedTodes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Create
    const newTodo = (value) => {
        const ID = uuidv4();
        const addedTodo = { id: ID, content: value, isEditing: false };
        set(ref(db, "todos/" + ID), addedTodo).then().catch(err => console.log(`Error in adding Todo: ${err}`));
    };

    // Read
    useEffect(() => {
        onValue(ref(db, "todos/"), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const tempTodo = [];
                Object.values(data).map((todo) => {
                    tempTodo.push(todo);
                });
                setTodos(tempTodo);
                setIsLoading(false);
            }
        });
    }, []);


    // Read Completed
    useEffect(() => {
        onValue(ref(db, "completedTodos/"), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const tempCompleted = [];
                Object.values(data).map((todo) => {
                    tempCompleted.push(todo);
                });
                setCheckedTodes(tempCompleted);
                setIsLoading(false);
            }
        });
    }, []);

    // Delete
    const onDelete = (index) => {
        remove(ref(db, "todos/" + index)).then().catch(err => console.log(`Error in Deleting Todo: ${err}`));
        if (todos.length == 1) {
            location.reload();
        }
    };

    const onEdit = (index) => {
        setTodos(todos.map((todo) => todo.id === index ? { ...todo, isEditing: true } : todo));
    }

    const editTodo = (index, value) => {
        update(ref(db, "todos/" + index), { id: index, content: value, isEditing: false }).then().catch(err => console.log(`Error in Editing Todo: ${err}`));
    }


    const onCompleteDelete = (index) => {
        remove(ref(db, "completedTodos/" + index)).then().catch(err => `Error in Deleting from Completed Todos: ${err}`);
        if (checkedTodos.length == 1) {
            location.reload();
        }
    }

    const onCheck = (index, content, isEditing) => {
        set(ref(db, "completedTodos/" + index), { id: index, content: content, isEditing: isEditing }).then().catch(err => console.log(`Error in Adding items to Completed Section: ${err}`));

        remove(ref(db, "todos/" + index)).then().catch(err => console.log(`Error in removing todo from todos section: ${err}`));

        if (todos.length == 1) {
            location.reload();
        }
    }

    const onBack = (index, content, isEditing) => {
        set(ref(db, "todos/" + index), { id: index, content: content, isEditing: isEditing });

        remove(ref(db, "completedTodos/" + index));
        if (checkedTodos.length == 1) {
            location.reload();
        }
    }

    return (
        <div className='bg-[#DFCCFB] w-[50vw] p-10 grid place-items-center gap-4 relative top-10'>
            <h1 className='text-center font-bold'>
                What's in your mind?
            </h1>

            <TodoForm newTodo={newTodo} />

            <div className='flex w-full'>
                {isLoading ? <div className='w-1/2 flex justify-center items-center'>
                    <div className="custom-loader"></div>
                </div>
                    : todos.length === 0 ?
                        (
                            <div className='w-1/2 text-center font-bold pb-1 mb-2'>
                                empty
                            </div>
                        )
                        : (
                            <div className='w-1/2 flex flex-col gap-2 p-2'>
                                {todos.map((todo) =>
                                    todo.isEditing ?
                                        (<TodoEditing key={todo.id} todos={todo} content={todo.content} id={todo.id} editTodo={editTodo} />)
                                        : (<Todo key={todo.id} todos={todo} onDelete={onDelete} onEdit={onEdit} onCheck={onCheck} db={db} />)
                                )}
                            </div>
                        )
                }

                <div className='w-1/2 border-l border-black p-2'>
                    <div className='text-center font-bold border-b border-black pb-1 mb-2'>completed</div>

                    {isLoading ? <div className='flex justify-center items-center'>
                        <div className="custom-loader"></div>
                    </div> :
                        <div className='flex flex-col-reverse items-center gap-2'>
                            {checkedTodos.map((todo) => {
                                return <Completed key={todo.id} todos={todo} onCompleteDelete={onCompleteDelete} onBack={onBack} />
                            })}
                        </div>}
                </div>
            </div>
        </div>
    )
}