import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export const Login = () => {
    const navigate = useNavigate()
    const [user, setUser] = React.useState({
        email: '',
        password: ''
    })

    const hanldeUser = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }
    const handleLogin = () => {
        axios.post("https://nanitodoapp.cyclic.app/user/login", JSON.stringify(user), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.data.token !== undefined) {
                localStorage.setItem('token', JSON.stringify(response.data.token));
                alert(response.data.msg)
                navigate('/todos');
            } else alert(response.data.err)
        }).catch((err) => alert(err));

    }
    return (
        <div style={{ display: "grid", placeItems: "center", marginTop: '10px' }}>
            <h1>Login</h1>
            <br />
            <div style={{ display: "grid", placeItems: "center" }}>
                <input type="email" placeholder="Enter" name="email" onChange={hanldeUser} style={styles.input} />
                <br />
                <input type="password" placeholder="Password" name="password" onChange={hanldeUser} style={styles.input} />
                <br />
                <button type="submit" style={styles.input} onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}

const styles = {
    input: {
        padding: "5px"
    }
}
