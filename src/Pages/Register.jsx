import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export const Register = () => {
    const navigate = useNavigate()
    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: "",
        age: ""
    })

    const handleUser = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }


    const handleSubmit = () => {

        axios.post("https://nanitodoapp.cyclic.app/user/register", JSON.stringify(user), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            alert(response.data.msg)
            navigate('/login');
        }).catch((err) => console.log(err));

    }

    return (
        <div style={{ display: "grid", placeItems: "center" }}>
            <h1>Register</h1>
            <input type="text" placeholder='User Name' style={styles.input} name="username" onChange={handleUser} />

            <br />
            <input type="email" placeholder='Enter Email' style={styles.input} name="email" onChange={handleUser} />
            <br />
            <input type="password" placeholder='Enter Password' style={styles.input} name="password" onChange={handleUser} />
            <br />
            <input type="number" placeholder='age' style={styles.input} name='age' onChange={handleUser} />
            <br />
            <input type="submit" onClick={handleSubmit} />
        </div>
    )
}


const styles = {
    input: {
        padding: '5px',
    }
}
