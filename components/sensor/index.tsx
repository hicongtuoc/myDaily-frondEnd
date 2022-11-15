import ItemSenser from "./item-senser";
import {Button, List} from "antd";
import {useCallback, useEffect, useRef, useState} from "react";
import {getListSensor} from "../api/gateway";
import {SensorProps} from "../../pages";
import io from "socket.io-client";
import * as socketIOClient from "socket.io-client";
// import { io, Socket } from "socket.io-client";
// import * as socketIO from 'socket.io-client';

const host = "http://localhost:3000";
const host2 = "https://tkdt.hidro.dev";
interface ListSensorProps {
  listSensor?: SensorProps[];
  handleIdSensor: (id: string) => void;
  handleUpdateListSensor: () => void;
}

// const socket = io.connect("http://localhost:3001");

export default function ListSenser(props: ListSensorProps) {
  const [lastPong, setLastPong] = useState(null);

  // const socket = io(host2);

  // const socket2 = socketIO.connect('http://localhost:4000');

  // useEffect(() => {

  //   // socket2.on("event", (data) => {
  //   //   console.log("ahihi2: ",data);
  //   // });
  
  //   socket.on('event', function(msg) {
  //     var item = document.createElement('li');
  //     item.textContent = msg;
  //     console.log('msg',msg);
      
  //     window.scrollTo(0, document.body.scrollHeight);
  //   });
  //   socket.on("connect", () => {
  //     console.log("id ne", socket.id);
  //   });
  //   socket.on("event", (data) => {
  //     console.log("ahihi: ",data);
  //   });
  //   socket.on("chat message", (data) => {
  //     console.log("dataaaaaa: ", data);
  //   });
  // }, []);

  const data = {
    "name_gateway": "123124"
  };

  const deleteSensor = useCallback(() => {
    fetch('https://tkdt.hidro.dev/scan_sensor', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }, []);

  const handSubmit = () => {
    deleteSensor();
    setTimeout(() => {
      console.log('Call Api');
    },10000)
  }

  return (
    <div className="w-1/4 mx-8 item-sensor">
      <List
        itemLayout="horizontal"
        dataSource={props.listSensor}
        renderItem={(item) => (
          <List.Item>
            <ItemSenser
              handleUpdateListSensor={props.handleUpdateListSensor}
              name={item.name}
              id={item.id}
              handleIdSensor={props.handleIdSensor}
            />
          </List.Item>
        )}
      />
      {/* <p>Connected: { '' + isConnected }</p>
      <p>Last pong: { lastPong || '-' }</p>
      <button onClick={ sendPing }>Send ping</button> */}
      <div id="messages"></div>
      <Button type="primary" onClick={handSubmit}>Scan Sensor</Button>
    </div>
  );
}
