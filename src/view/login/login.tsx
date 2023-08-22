import axios from "axios";
import { useState } from "react"

function Login(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const emailOnChange = (event: { target: { name: any; value: any; }; }) => {
        const { value } = event.target;
        setEmail(value);
    };

    const passwordOnChange = (event: { target: { name: any; value: any; }; }) => {
        const { value } = event.target;
        setPassword(value);
    };

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = { email, password }
        console.log(data)
        const request = await axios.post('http://localhost:5001/auth/login', data)
        const res = request.data
        if(res.statusCode == 200){
            console.log(res)
            localStorage.setItem('user', res.data)
            // TODO change to proper router
            window.location.replace('/view/home/');
        }else{
            return
        }
    } 

    return(
        <>
            <div className="container">
                <div className="row vh-100 justify-content-center align-items-center">
                    <div className="col-6">
                    <form onSubmit={login}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" value={email} onChange={emailOnChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" value={password} onChange={passwordOnChange} id="exampleInputPassword1"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login