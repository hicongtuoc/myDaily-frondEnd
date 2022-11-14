import ItemSenser from "./item-senser";
import {Button, List} from "antd";
import { useEffect, useState } from "react";
import { getapi, getListSensor } from "../api/gateway";
import { SensorProps } from "../../pages";
import io from "socket.io-client";

interface ListSensorProps {
  listSensor?: SensorProps[];
  handleIdSensor: (id: string) => void
}

// const socket = io.connect("http://localhost:3001");

export default function ListSenser(props: ListSensorProps) {

  // const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  // useEffect(() => {
  //   socket.on('connect', () => {
  //     setIsConnected(true);
  //   });

  //   socket.on('disconnect', () => {
  //     setIsConnected(false);
  //   });

  //   socket.on('event', (data) => {
  //     console.log('data Socket:', data);
  //   });

  //   return () => {
  //     socket.off('connect');
  //     socket.off('disconnect');
  //     socket.off('event');
  //   };
  // }, []);

  // const sendPing = () => {
  //   socket.emit('ping');
  // }

  return (
    <div className="w-1/4 mx-8 item-sensor">
      <List
        itemLayout="horizontal"
        dataSource={props.listSensor}
        renderItem={(item) => (
          <List.Item>
            <ItemSenser name={item.name} id={item.id} handleIdSensor={props.handleIdSensor}/>
          </List.Item>
        )}
      />
      {/* <p>Connected: { '' + isConnected }</p>
      <p>Last pong: { lastPong || '-' }</p>
      <button onClick={ sendPing }>Send ping</button> */}
      <Button type="primary">Scan Sensor</Button>
    </div>
  );
}
