import {Button, Drawer} from "antd";
import {useState} from "react";
import 'antd/dist/antd.css';

export default function ControlSensor() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="">
      <Button type="primary" onClick={showDrawer}>
        Cotrol Sensor
      </Button>
      <Drawer title="Cotrol Sensor" placement="right" onClose={onClose} visible={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
}
