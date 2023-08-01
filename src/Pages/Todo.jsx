import React from 'react'
import { TodoInput } from '../Components/TodoInput'
import { TodoList } from '../Components/TodoList'

export const Todo = () => {
    const [postRes, setPostRes] = React.useState("");
    const handlePostRes = (data) => {
        setPostRes(data);
    }
    return (
        <>
            <TodoInput handlePostRes={handlePostRes} />
            <TodoList postRes={postRes} />
        </>
    )
}
