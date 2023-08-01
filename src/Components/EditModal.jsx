import { Box, Button, Modal, TextField } from '@mui/material'
import axios from 'axios';
import React from 'react'

export const EditModal = ({ modalOpen, handleClose, todoId }) => {
    console.log(todoId, "ididid")
    const [singleTodo, setSingleTodo] = React.useState({
        title: "",
        description: "",
    });

    const getSingleTodo = () => {
        const token = JSON.parse(localStorage.getItem('token'));
        axios.get(`https://nanitodoapp.cyclic.app/todos/${todoId}`, { headers: { 'Content-Type': "application/json", "Authorization": `Bearer ${token}` } }).then((res) => setSingleTodo(res.data)).catch((error) => alert(error));
    };
    
    const editTodo = () => {
        const token = JSON.parse(localStorage.getItem('token'));
        axios.patch(`https://nanitodoapp.cyclic.app/todos/update/${todoId}`,JSON.stringify(singleTodo), { headers: { 'Content-Type': "application/json", "Authorization": `Bearer ${token}` } }).then((res) => console.log(res.data)).catch((error) => alert(error));
    }

    const handleTodoChange = (e) => {
        const { name, value } = e.target
        setSingleTodo({ ...singleTodo, [name]: value });
    }

    React.useEffect(() => {
        getSingleTodo();
    }, [modalOpen])

    console.log(singleTodo);
    return (
        <Modal
            open={modalOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styles.modal} >
                <div style={{ width: "400px", display: 'grid', placeItems: "center", marginTop: "20px" }}>

                    <TextField type='text' value={singleTodo.title} variant="outlined" placeholder="Enter Your Todo" name="title" style={{ padding: "5px" }} onChange={handleTodoChange} />
                    <br />
                    <TextField type='text' value={singleTodo.description} placeholder='Description' style={{ padding: "5px" }} name="description" onChange={handleTodoChange} />
                    <br />
                    <Button onClick={editTodo}>Save</Button>
                </div>
            </Box>
        </Modal>
    )
}

const styles = {
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }
}