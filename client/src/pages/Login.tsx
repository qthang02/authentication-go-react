import {SyntheticEvent, useState} from "react";
import {Navigate} from "react-router-dom";
import axios from "axios";


const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('http://localhost:8080/api/authentication/login', {
            username: username,
            password: password
        })
        .then(function (response) {
            const token = response.data.data;

            if(token) {
                localStorage.setItem("user", JSON.stringify(token))
            }
        })

        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to="/"/>;
    }

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <input type="username" className="form-control" placeholder="username" required
                   onChange={e => setUserName(e.target.value)}
            />

            <input type="password" className="form-control" placeholder="password" required
                   onChange={e => setPassword(e.target.value)}
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
    );
}

export default Login;