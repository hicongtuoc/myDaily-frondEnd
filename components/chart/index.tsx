import "./index.scss";
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export interface ItemValueSensor {
  time: string;
  value: number;
}
interface DataSensorProps {
  dataSensor?: ItemValueSensor[];
}

export default function ChartData(props: DataSensorProps) {

  return <div className="w-10/12 item-chart">
    <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={props.dataSensor}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
          {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
        </BarChart>
      </ResponsiveContainer>
  </div>
  
}