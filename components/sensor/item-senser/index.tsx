import {Dropdown, Modal, Menu} from "antd";
import notification, {NotificationPlacement} from "antd/lib/notification";
import {useState} from "react";
import { ExclamationCircleOutlined } from '@ant-design/icons';

interface ItemSenserprops {
  id: string;
  name: string;
  handleIdSensor: (id: string) => void
  // time_update: string;
  // time_reset: string;
}

export default function ItemSenser(props: ItemSenserprops) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [api] = notification.useNotification();
  const { confirm } = Modal;

  type NotificationType = "success" | "info" | "warning" | "error";

  const openNotificationWithIcon = (type: NotificationType) => {
    notification[type]({
      message: "Chỉnh sửa thành công",
      description: "DONE",
    });
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "Xóa sensor",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn chắc chứ?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        openNotificationWithIcon("success");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    openNotificationWithIcon("success");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <span onClick={showModal}>Edit Sensor</span>,
        },
        {
          key: "2",
          label: <span onClick={showDeleteConfirm}>Delete Sensor</span>,
        },
      ]}
    />
  );

  return (
    <div className="flex w-full mb-4 hover:bg-sky-400">
      <Modal
        title="Edit Sensor"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <div className="w-10/12" onClick={() => props.handleIdSensor(props.id)}>
        <h1>{props.name}</h1>
        <span>Cập nhập gần nhất: </span>
        <span>Time Update</span>
        <div>
          <span>Thời gian cập nhập: </span>
          <span>Time reset</span>
        </div>
      </div>
      <div className="ml-3">
        <Dropdown
          overlay={menu}
          placement="bottom"
          arrow={{pointAtCenter: true}}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.93188 5.38642L5.74952 6.11391L5.93188 5.38642ZM9.30644 3.43812L8.58523 3.2323L9.30644 3.43812ZM3.23837 10.0517L3.77722 9.53005L3.23837 10.0517ZM3.23837 13.9483L2.69952 13.4266H2.69952L3.23837 13.9483ZM5.93188 18.6136L6.11423 19.3411L5.93188 18.6136ZM9.30644 20.5619L8.58523 20.7677L9.30644 20.5619ZM14.6935 20.5619L15.4147 20.7677L14.6935 20.5619ZM18.068 18.6136L18.2504 17.8861L18.068 18.6136ZM20.7615 13.9483L20.2227 14.47V14.47L20.7615 13.9483ZM20.7615 10.0517L20.2227 9.53005V9.53005L20.7615 10.0517ZM18.068 5.38642L17.8857 4.65893L18.068 5.38642ZM14.6935 3.43812L15.4147 3.2323L14.6935 3.43812ZM5.74952 6.11391C7.60843 6.57987 9.50172 5.48678 10.0276 3.64394L8.58523 3.2323C8.28146 4.2967 7.18792 4.92806 6.11423 4.65893L5.74952 6.11391ZM3.77722 9.53005C2.34195 8.04752 3.74798 5.6122 5.74952 6.11391L6.11423 4.65893C2.6489 3.7903 0.214599 8.00664 2.69952 10.5734L3.77722 9.53005ZM3.77722 14.47C5.1102 13.0931 5.1102 10.9069 3.77722 9.53005L2.69952 10.5734C3.46944 11.3687 3.46944 12.6314 2.69952 13.4266L3.77722 14.47ZM5.74952 17.8861C3.74798 18.3878 2.34195 15.9525 3.77722 14.47L2.69952 13.4266C0.214598 15.9934 2.6489 20.2097 6.11423 19.3411L5.74952 17.8861ZM10.0276 20.3561C9.50172 18.5133 7.60843 17.4202 5.74952 17.8861L6.11423 19.3411C7.18792 19.072 8.28146 19.7033 8.58523 20.7677L10.0276 20.3561ZM13.9722 20.3561C13.406 22.3403 10.5939 22.3403 10.0276 20.3561L8.58523 20.7677C9.56564 24.2031 14.4342 24.2031 15.4147 20.7677L13.9722 20.3561ZM18.2504 17.8861C16.3915 17.4202 14.4982 18.5133 13.9722 20.3561L15.4147 20.7677C15.7184 19.7033 16.812 19.072 17.8857 19.3411L18.2504 17.8861ZM20.2227 14.47C21.6579 15.9525 20.2519 18.3878 18.2504 17.8861L17.8857 19.3411C21.351 20.2097 23.7853 15.9934 21.3004 13.4266L20.2227 14.47ZM20.2227 9.53005C18.8897 10.9069 18.8897 13.0931 20.2227 14.47L21.3004 13.4266C20.5305 12.6314 20.5305 11.3687 21.3004 10.5734L20.2227 9.53005ZM18.2504 6.11391C20.2519 5.6122 21.6579 8.04752 20.2227 9.53005L21.3004 10.5734C23.7853 8.00664 21.351 3.7903 17.8857 4.65893L18.2504 6.11391ZM13.9722 3.64394C14.4982 5.48678 16.3915 6.57987 18.2504 6.11391L17.8857 4.65893C16.812 4.92806 15.7184 4.2967 15.4147 3.2323L13.9722 3.64394ZM15.4147 3.2323C14.4342 -0.203084 9.56564 -0.203083 8.58523 3.2323L10.0276 3.64394C10.5939 1.6597 13.406 1.6597 13.9722 3.64394L15.4147 3.2323ZM8.24994 12C8.24994 14.0711 9.92888 15.75 11.9999 15.75V14.25C10.7573 14.25 9.74994 13.2427 9.74994 12H8.24994ZM11.9999 15.75C14.071 15.75 15.7499 14.0711 15.7499 12H14.2499C14.2499 13.2427 13.2426 14.25 11.9999 14.25V15.75ZM15.7499 12C15.7499 9.92895 14.071 8.25001 11.9999 8.25001V9.75002C13.2426 9.75002 14.2499 10.7574 14.2499 12H15.7499ZM11.9999 8.25001C9.92888 8.25001 8.24994 9.92895 8.24994 12H9.74994C9.74994 10.7574 10.7573 9.75002 11.9999 9.75002V8.25001Z"
              fill="#2D264B"
            />
          </svg>
        </Dropdown>
      </div>
    </div>
  );
}
