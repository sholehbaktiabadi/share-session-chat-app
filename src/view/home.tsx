import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Variables } from "../config/env-loader";
import { useNavigate } from "react-router-dom";

function Home() {
  const [event, setEvent] = useState([]);
  const [cookies, _] = useCookies(["user"]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(Variables.VITE_CHAT_API_URL + "/event/collect", {
        headers: { Authorization: `Bearer ${cookies.user}` },
      })
      .then((res) => setEvent(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const channelSelector=(val: string)=>{
    console.log(val)
    return navigate(`/room/${val}`)
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <ul className="list-group">
              {event.map((res) => (
                <li className="list-group-item">
                  <p className="fs-6" onClick={() => channelSelector(res)}>{res}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
