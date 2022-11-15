import type {NextPage} from "next";
import Head from "next/head";
import {Button} from "antd";
import ListSenser from "../components/sensor";
import ChartData, {ItemValueSensor} from "../components/chart";
import ControlSensor from "../components/sensor/control-sensor";
import {useCallback, useEffect, useState} from "react";

export interface SensorProps {
  id: string;
  name: string;
}

const Home: NextPage = () => {
  const [listSensor, setListSensor] = useState<SensorProps[]>();
  const [idSensor, setIdSensor] = useState("1");
  const [dataSensor, setDataSensor] = useState<ItemValueSensor[]>();
  const [updateListSensor, setUpdateListSensor] = useState(false);

  const handleUpdateListSensor = () => {
    setUpdateListSensor(!updateListSensor);
  };

  const getListSensor = useCallback(() => {
    const dataListSensor = fetch("https://tkdt.hidro.dev/scan_sensor")
      .then((response) => response.json())

      // Displaying results to console
      .then((json) => {
        setListSensor(json);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // const data = getapi();
    // setListSensor(await data);
  }, [updateListSensor]);

  const handleIdSensor = (id: string) => {
    setIdSensor(id);
  };

  const getDataSensor = useCallback(() => {
    const dataSensor = fetch(
      "https://tkdt.hidro.dev/get_data_by_id?" +
        new URLSearchParams({
          id: idSensor,
        })
    )
      .then((response) => response.json())

      // Displaying results to console
      .then((json) => setDataSensor(json.data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [idSensor]);

  useEffect(() => {
    getDataSensor();
  }, [getDataSensor]);

  // useEffect(() => {
  //   getListSensor();
  // }, [getListSensor]);

  return (
    <div>
      <Head>
        <title>Monitoring System Using LoRa</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full">
        <h1 className="text-center my-4 text-6xl font-bold mb-8" onClick={getDataSensor}>
          Monitoring System Using LoRa
        </h1>
        <div className="body-gateway">
          <div className="item-gateway">
            <ListSenser
              handleUpdateListSensor={handleUpdateListSensor}
              listSensor={listSensor}
              handleIdSensor={handleIdSensor}
            />
            <ChartData dataSensor={dataSensor} />
          </div>
          <ControlSensor />
        </div>
      </div>
    </div>
  );
};

export default Home;
