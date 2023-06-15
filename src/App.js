import logo from "./logo.svg";
import Popup from "./components/Popup";
import "./App.css";
import { getToken } from "./utils/utils.js";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserData from "./components/UserData";

function App() {
  useEffect(() => {
    if (!window.location.hash) {
      window.open(
        "https://zendeskcodingchallenge6917.zendesk.com/oauth/authorizations/new?response_type=token&redirect_uri=http://localhost:3000/&client_id=zendeskcodingchallenge6917&scope=read%20write"
      );
    }
  }, []);

  const acc_token = getToken(window.location.hash);
  sessionStorage.setItem("token", acc_token);
  const baseURL =
    "https://zendeskcodingchallenge6917.zendesk.com/api/v2/tickets";

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseURL, {
          headers: {
            Authorization: "Bearer" + " " + sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        });
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  console.log(data);

  return (
    <div className="App">
      <h1>Ticket Viewer </h1>
      <script>document.getElementById("App").innerHTML = data;</script>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created At </th>
            <th>subject</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>{<UserData data={data} />}</tbody>
      </table>
      {/* <Popup trigger={true}>
        <h3>hello deatials</h3>
      </Popup> */}
    </div>
  );
}

export default App;
