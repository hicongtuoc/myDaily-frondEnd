import ItemSenser from "./item-senser";
import {List} from "antd";

export default function ListSenser() {

  const data = [
    {
      title: 'C02',
      time_update: '17:20:20',
      time_reset: '10p',
    },
    {
      title: 'H20',
      time_update: '17:20:20',
      time_reset: '10p',
    },
    {
      title: 'hi',
      time_update: '17:20:20',
      time_reset: '10p',
    },
    {
      title: 'hello',
      time_update: '17:20:20',
      time_reset: '10p',
    },
  ];

  return (
    <div className="w-1/4 mx-8 item-sensor">
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <ItemSenser title={item.title} time_reset={item.time_reset} time_update={item.time_update}/>
          </List.Item>
        )}
      />
    </div>
  );
}
