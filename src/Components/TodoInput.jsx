import React from 'react'
import axios from 'axios';
export const TodoInput = ({handlePostRes}) => {
    const [todo, setTodo] = React.useState({
        title: "",
        description: "",
        completed: false
    });

    const handleTodoChange = (e) => {
        const { name, value } = e.target
        setTodo({ ...todo, [name]: value });
    }
    const handleSubmit = () => {
        console.log(todo)
        const token = JSON.parse(localStorage.getItem('token'));
        axios.post("https://nanitodoapp.cyclic.app/todos/addTodo", JSON.stringify(todo), {
            headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
            },
        }).then(response => {  
            handlePostRes(response);
            alert(response.data.msg);
        }).catch(error => alert(error.message));
    }
    return (
        <>
            <div style={{ display: 'grid', placeItems: "center" }}>
                <div style={{ width: "400px", display: 'grid', placeItems: "center", marginTop: "20px" }}>
                    <input type='text' placeholder="Enter Your Todo" name="title" onChange={handleTodoChange} style={{ padding: "5px" }} />
                    <br />
                    <input type='text' placeholder='Description' style={{ padding: "5px" }} name="description" onChange={handleTodoChange} />
                    <br />
                    <input type='submit' style={{ padding: "5px" }} onClick={handleSubmit} />
                </div>
            </div>

        </>
    )
}
