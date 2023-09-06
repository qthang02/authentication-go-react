import {SyntheticEvent, useState} from "react";
import {Navigate} from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('http://localhost:8080/api/authentication/register', {
            username: userName,
            email: email,
            password: password
        })

        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to={'/login'} />
    }

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please register</h1>

            <input className="form-control" placeholder="username" required
                   onChange={e => setUserName(e.target.value)}
            />

            <input type="email" className="form-control" placeholder="email" required
                   onChange={e => setEmail(e.target.value)}
            />

            <input type="password" className="form-control" placeholder="password" required
                   onChange={e => setPassword(e.target.value)}
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    );
}

export default Register