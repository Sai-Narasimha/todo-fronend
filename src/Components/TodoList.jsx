import React from 'react'
import axios from 'axios';
import Modal from '@mui/material/Modal';
import { Box, Button, Input, TextField, Typography } from '@mui/material';
import { EditModal } from './EditModal';
export const TodoList = ({ postRes }) => {

    const [open, setOpen] = React.useState(false);

    const [id, setId] = React.useState(null);
    const handleOpen = (todoId) => {
        setOpen(true);
        setId(todoId)
    };

    const handleClose = () => setOpen(false);

    const [todoList, setTodoList] = React.useState([]);

    const getTodoList = () => {
        const token = JSON.parse(localStorage.getItem('token'));
        axios.get("https://nanitodoapp.cyclic.app/todos", { headers: { 'Content-Type': "application/json", "Authorization": `Bearer ${token}` } }).then((response) => setTodoList(response.data)).catch((error) => alert(error));
    }
    const delTodo = (id) => {
        const token = JSON.parse(localStorage.getItem('token'));
        axios.delete(`https://nanitodoapp.cyclic.app/todos/delete/${id}`, { headers: { 'Content-Type': "application/json", "Authorization": `Bearer ${token}` } }).then(() => getTodoList()).catch((error) => alert(error));
    };


    React.useEffect(() => {
        getTodoList();
    }, [postRes])

    // console.log(todoList);
    return (
        <div>
            <h1>TodoList</h1>
            <table style={{
                borderCollapse: "separate",
                borderSpacing: "0 15px "
            }}>
                <thead>
                    <tr>
                        <th style={styles.row}>S.no</th>
                        <th style={styles.row}> Todo </th>
                        <th style={styles.row}> Description </th>
                        <th style={styles.row}> Status </th>
                        <th style={styles.row}> Edit </th>
                        <th style={styles.row}> Delete </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todoList?.map((todo, ind) => {
                            return (
                                <tr style={styles.row} key={todo._id}>
                                    <td >{ind + 1}</td>
                                    <td >{todo.title}</td>
                                    <td >{todo.description}</td>
                                    <td>
                                        <button style={{
                                            backgroundColor: todo.completed ? "green" : "red",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "5px",
                                            padding: "5px 10px",
                                            cursor: "pointer",
                                        }}>{todo.completed ? "Completed" : "Progress"}</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleOpen(todo._id)}>Edit</button>
                                    </td>
                                    <td>
                                        <button onClick={() => delTodo(todo._id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    <tr>

                    </tr>
                </tbody>
            </table>
            <EditModal modalOpen={open} handleClose={handleClose} todoId={id} />
        </div>
    )
}

const styles = {
    row: {
        border: '1px solid black',
        padding: '10px',
        margin: '10px',
    },

}