import axios from "axios"
import { useEffect, useState } from "react"
import { Variables } from "../../config/env-loader"
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode"
import { UserToken } from "../../types/user";

interface SocketChannel { event?: string }
function Room(props: SocketChannel){
    const [message, setMessage] = useState([{ id: '', msg: '', event: '', sender: '' }])
    const event = props.event ?? 'M2Y3Zjk4NjItZjQyOC00YWJkLTk3NjItODU2YzAyZDFkNzhkLXNlcGFyYXRvci00NzAzNTdjYi03ZjUzLTQxZGYtYjc3ZC1hNzM4N2I2NmJlMTg='
    const [cookies] = useCookies(['user']);
    const [userCookies] = useState(cookies.user)
    const user: UserToken = jwtDecode(userCookies)
    console.log(user.id)
    useEffect(()=> {
        axios.get(Variables.VITE_CHAT_API_URL+'/message/channel', { params: { event: event }, headers: { Authorization: `Bearer ${cookies.user}` } })
        .then(res => {console.log(res.data); setMessage(res.data.data)})
        .catch(err => console.log(err))
    },[])
    return(
        <>
            <div className="container">
                <div className="row vh-100 justify-content-center align-items-center">
                    <div className="col-6">
                    <ul className="list-group list-group-flush">
                    { message.map((res) => 
                    res.sender == user.id ?  <li className="list-group-item" key={res.id}> <p>{res.msg}</p> </li> : <li className="list-group-item text-end" key={res.id}> <p>{res.msg}</p> </li>
                    ) }
                    </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Room