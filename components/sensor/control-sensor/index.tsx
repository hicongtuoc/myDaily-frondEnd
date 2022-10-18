import {Button, Drawer, notification, Switch} from "antd";
import {useState} from "react";
import 'antd/dist/antd.css';

export default function ControlSensor() {
  const [open, setOpen] = useState(false);

  type NotificationType = "success" | "info" | "warning" | "error";
  
  const openNotificationWithIcon = (type: NotificationType , isOpen: boolean) => {
    notification[type]({
      message: "Trạng thái",
      description: `${isOpen}`,
    });
  };


  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
    openNotificationWithIcon('info', checked)
  };

  return (
    <div className="">
      <Button type="primary" onClick={showDrawer}>
        Cotrol Sensor
      </Button>
      <Drawer title="Cotrol Sensor" placement="right" onClose={onClose} visible={open}>
        <div className="my-3">
          <span className="mr-4">Máy bơm</span>
          <Switch defaultChecked onChange={onChange} />
        </div>
        <div className="my-3">
          <span className="mr-4">Đèn</span>
          <Switch defaultChecked onChange={onChange} />
        </div>
        <div className="my-3">
          <span className="mr-4">Quạt</span>
          <Switch defaultChecked onChange={onChange} />
        </div>
      </Drawer>
    </div>
  );
}
