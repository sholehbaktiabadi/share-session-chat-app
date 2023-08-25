import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import io from "socket.io-client";
import { Variables } from "../config/env-loader";
import { UserToken } from "../types/user";
import _ from "lodash";
import { useParams } from "react-router-dom";


function Room() {
  const { ch } = useParams()
  const [message, setMessage] = useState([
    { id: "", msg: "", event: "", sender: "" },
  ]);
  const [event] = useState(
    ch
  );
  const [cookies] = useCookies(["user"]);
  const [userCookies] = useState(cookies.user);
  const user: UserToken = jwtDecode(userCookies);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const app = io(Variables.VITE_SOCKETIO_HOST);
    app.on(ch as string, (data) => setMessage((prevData) => [...prevData, data]));
    axios
      .get(Variables.VITE_CHAT_API_URL + "/message/channel", {
        params: { event: event },
        headers: { Authorization: `Bearer ${cookies.user}` },
      })
      .then((res) => {setMessage(res.data.data); console.log(ch)})
      .catch((err) => console.log(err));
    return () => {
      app.disconnect();
    };
  }, []);

  const submitMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const decodeBase64 = atob(ch as string);
    const userBucket = decodeBase64.split("-separator-");
    const [target] = _.map(
      _.difference(userBucket, [user.phone]),
      (unmatchedPhone) => _.indexOf(userBucket, unmatchedPhone)
    );
    console.log(target, userBucket);
    axios
      .post(
        Variables.VITE_CHAT_API_URL + "/message",
        { msg: msg, phone: userBucket[target] },
        { headers: { Authorization: `Bearer ${cookies.user}` } }
      )
      .then((res) => console.log(res.data.data))
      .catch((err) => console.log(err));
    setMsg("");
  };

  const onChangeMsg = (event: { target: { name: any; value: any } }) => {
    const { value } = event.target;
    setMsg(value);
    console.log(msg);
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-10">
            <ul className="list-group list-group-flush">
              {message.map((res) =>
                res.sender == user.id ? (
                  <li className="list-group-item text-end" key={res.id}>
                    {" "}
                    <p>{res.msg}</p>{" "}
                  </li>
                ) : (
                  <li className="list-group-item" key={res.id}>
                    {" "}
                    <p>{res.msg}</p>{" "}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="row justify-content-center align-items-center mb-5">
          <form onSubmit={submitMessage}>
            <div className="col">
              <div className="mb-3">
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  name="message"
                  value={msg}
                  onChange={onChangeMsg}
                  rows={3}
                ></textarea>
              </div>
            </div>
            <div className="col">
              <button type="submit" className="btn btn-primary px-5">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Room;
