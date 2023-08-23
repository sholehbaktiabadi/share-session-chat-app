import axios from "axios"
import { useEffect, useState } from "react"
import { Variables } from "../../config/env-loader"
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode"
import { UserToken } from "../../types/user";
import io from 'socket.io-client'

interface SocketChannel { event?: string }
function Room(props: SocketChannel){
    const [message, setMessage] = useState([{ id: '', msg: '', event: '', sender: '' }])
    const event = props.event ?? 'M2Y3Zjk4NjItZjQyOC00YWJkLTk3NjItODU2YzAyZDFkNzhkLXNlcGFyYXRvci00NzAzNTdjYi03ZjUzLTQxZGYtYjc3ZC1hNzM4N2I2NmJlMTg='
    const [cookies] = useCookies(['user']);
    const [userCookies] = useState(cookies.user)
    const user: UserToken = jwtDecode(userCookies)
    const [msg, setMsg] = useState('')

    useEffect(()=> {
        const app = io('http://localhost:3001')
        app.on('M2Y3Zjk4NjItZjQyOC00YWJkLTk3NjItODU2YzAyZDFkNzhkLXNlcGFyYXRvci00NzAzNTdjYi03ZjUzLTQxZGYtYjc3ZC1hNzM4N2I2NmJlMTg=', (data)=> setMessage(prevData=> [...prevData, data])) 
        axios.get(Variables.VITE_CHAT_API_URL+'/message/channel', { params: { event: event }, headers: { Authorization: `Bearer ${cookies.user}` } })
        .then(res => setMessage(res.data.data))
        .catch(err => console.log(err))
        return ()=> {
            app.disconnect()
        }
    },[])

    const submitMessage = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        axios.post(Variables.VITE_CHAT_API_URL+'/message', { msg: msg, phone: "082231817175" }, { headers: { Authorization: `Bearer ${cookies.user}` } })
        .then(res => console.log(res.data.data))
        .catch(err => console.log(err))
    }

    const onChangeMsg= (event: { target: { name: any; value: any; }; }) => {
        const { value } = event.target;
        setMsg(value);
        console.log(msg)
    };
    return(
        <>
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-6">
                    <ul className="list-group list-group-flush">
                    { message.map((res) => 
                    res.sender == user.id ?  <li className="list-group-item" key={res.id}> <p>{res.msg}</p> </li> : <li className="list-group-item text-end" key={res.id}> <p>{res.msg}</p> </li>
                    ) }
                    </ul>
                    <div className="row justify-content-center align-items-center">
                    <form onSubmit={submitMessage}>
                    <div className="col">
                        <div className="mb-3">
                        <textarea className="form-control" id="exampleFormControlTextarea1" name="message" onChange={onChangeMsg} rows={3}></textarea>
                        </div>
                    </div>
                    <div className="col">
                    <button type="submit"  className="btn btn-primary">Primary</button>
                    </div>
                    </form>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Room