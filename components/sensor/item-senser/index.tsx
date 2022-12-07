import {Dropdown, Modal, Menu, Input} from "antd";
import notification, {NotificationPlacement} from "antd/lib/notification";
import {useCallback, useId, useState} from "react";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import "./index.scss";

interface ItemSenserprops {
  id: string;
  name: string;
  handleIdSensor: (id: string) => void;
  handleUpdateListSensor: () => void;
  // time_update: string;
  // time_reset: string;
}

export default function ItemSenser(props: ItemSenserprops) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [api] = notification.useNotification();
  const {confirm} = Modal;
  const id = useId();
  const [inputData, setInput] = useState("");

  type NotificationType = "success" | "info" | "warning" | "error";

  const openNotificationWithIcon = (type: NotificationType) => {
    notification[type]({
      message: "Chỉnh sửa thành công",
      description: "DONE",
    });
  };

  const data = {
    id_sensor: props.id,
    delete: 0,
  };

  const deleteSensor = useCallback(() => {
    fetch("https://tkdt.hidro.dev/delete_sensor", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const showDeleteConfirm = () => {
    confirm({
      title: "Xóa sensor",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn chắc chứ?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteSensor();
        openNotificationWithIcon("success");
        setTimeout(() => {
          props.handleUpdateListSensor();
        }, 1000);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const dataUpdate = {
    id_sensor: props.id,
    set_time: inputData,
  };

  const updateSensor = useCallback(() => {
    // const input = document.getElementById('gitetway').value;

    // input?.addEventListener('input', event => {
    //   // 👇️ inline type assertion
    //   const result = (event.target as HTMLInputElement).value;
    //   console.log(result)
    // });

    fetch("https://tkdt.hidro.dev/set_time", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_sensor: props.id,
        set_time: inputData,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [inputData]);

  const handleOk = () => {
    updateSensor();
    setIsModalOpen(false);
    openNotificationWithIcon("success");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePin = () => {
    if (Number(props.id) === 1) return 68;
    if (Number(props.id) === 2) return 56;
    if (Number(props.id) === 3) return 47;
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
    <div className="flex w-full mb-4 p-4 item-sensor-long">
      <Modal
        title="Edit Sensor"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <label htmlFor="gitetway">SetTime:</label>
        <input
          id="gitetway"
          value={inputData}
          onInput={(e) => setInput((e.target as HTMLInputElement).value)}
          className="ml-2 border-solid border-2 border-sky-500"
        />
      </Modal>
      <div className="w-10/12" onClick={() => props.handleIdSensor(props.id)}>
        <div className="flex items-center">
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="44" height="44" rx="8" fill="#F4EFFF" />
            <g clipPath="url(#clip0_3_102)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M26.6578 18.4398C26.7942 18.4058 26.9305 18.4398 27.0328 18.5418C27.135 18.6438 27.1691 18.7798 27.101 18.9498L21.3063 33.3642C21.2722 33.5002 21.1358 33.5682 20.9995 33.5682H20.8972C20.7268 33.5342 20.6245 33.3642 20.6586 33.1942L22.4311 23.2673L16.9773 24.2532C16.875 24.2532 16.7387 24.2192 16.6705 24.1512C16.6023 24.0492 16.5682 23.9472 16.5682 23.8452L17.9317 13.4424C17.9658 13.2724 18.1021 13.1364 18.2726 13.1364H23.5219C23.6241 13.1364 23.7264 13.1704 23.7946 13.2724C23.8627 13.3744 23.8627 13.4763 23.8287 13.5783L21.3403 20.3096L26.6578 18.4398ZM23.1812 22.8593L21.92 29.9985L26.1808 19.3237L20.8974 21.1595C20.7952 21.2275 20.6588 21.1935 20.5566 21.0915C20.4884 21.0235 20.4543 20.8875 20.4884 20.7515L23.0449 13.8163H18.5796L17.2843 23.4372L22.7722 22.4513H22.8404C22.9426 22.4513 23.0108 22.4853 23.079 22.5533C23.1812 22.6213 23.2153 22.7573 23.1812 22.8593Z"
                fill="#7A40F2"
              />
              <path
                d="M26.6578 18.4398L26.6335 18.3424L26.6247 18.3455L26.6578 18.4398ZM27.101 18.9498L27.1937 18.9871L27.1938 18.987L27.101 18.9498ZM21.3063 33.3642L21.2126 33.3266L21.2093 33.3399L21.3063 33.3642ZM20.8972 33.5682L20.8777 33.6663L20.8873 33.6682H20.8972V33.5682ZM20.6586 33.1942L20.7567 33.2139L20.7571 33.2118L20.6586 33.1942ZM22.4311 23.2673L22.5296 23.2849L22.5548 23.1433L22.4133 23.1689L22.4311 23.2673ZM16.9773 24.2532V24.3532H16.9862L16.9951 24.3516L16.9773 24.2532ZM16.6705 24.1512L16.5874 24.2068L16.5929 24.215L16.5999 24.222L16.6705 24.1512ZM16.5682 23.8452L16.4682 23.8321V23.8452H16.5682ZM17.9317 13.4424L17.8334 13.4226L17.8325 13.4294L17.9317 13.4424ZM23.7946 13.2724L23.7114 13.3279L23.7946 13.2724ZM23.8287 13.5783L23.9225 13.613L23.9235 13.61L23.8287 13.5783ZM21.3403 20.3096L21.2465 20.2749L21.1728 20.4745L21.3735 20.404L21.3403 20.3096ZM21.92 29.9985L21.8215 29.9811L22.0129 30.0356L21.92 29.9985ZM23.1812 22.8593L23.0864 22.8276L23.084 22.8346L23.0827 22.8419L23.1812 22.8593ZM26.1808 19.3237L26.2737 19.3607L26.3549 19.1573L26.148 19.2292L26.1808 19.3237ZM20.8974 21.1595L20.8646 21.065L20.8526 21.0692L20.8421 21.0762L20.8974 21.1595ZM20.5566 21.0915L20.6272 21.0207L20.5566 21.0915ZM20.4884 20.7515L20.394 20.7167L20.3914 20.7272L20.4884 20.7515ZM23.0449 13.8163L23.1387 13.8508L23.1883 13.7163H23.0449V13.8163ZM18.5796 13.8163V13.7163H18.4921L18.4804 13.8029L18.5796 13.8163ZM17.2843 23.4372L17.1852 23.4239L17.1668 23.5599L17.3019 23.5357L17.2843 23.4372ZM22.7722 22.4513V22.3513H22.7633L22.7545 22.3529L22.7722 22.4513ZM23.079 22.5533L23.0083 22.6241L23.0154 22.6311L23.0236 22.6366L23.079 22.5533ZM27.1034 18.471C26.9752 18.3432 26.8025 18.3007 26.6336 18.3428L26.682 18.5368C26.7858 18.511 26.8858 18.5364 26.9622 18.6126L27.1034 18.471ZM27.1938 18.987C27.2335 18.888 27.246 18.792 27.2291 18.7018C27.212 18.6113 27.1667 18.5342 27.1034 18.471L26.9622 18.6126C27.0011 18.6514 27.024 18.6933 27.0325 18.7388C27.0411 18.7845 27.0366 18.8416 27.0081 18.9125L27.1938 18.987ZM21.399 33.4015L27.1937 18.9871L27.0082 18.9125L21.2135 33.3269L21.399 33.4015ZM20.9995 33.6682C21.1614 33.6682 21.3537 33.586 21.4033 33.3885L21.2093 33.3399C21.1906 33.4144 21.1102 33.4682 20.9995 33.4682V33.6682ZM20.8972 33.6682H20.9995V33.4682H20.8972V33.6682ZM20.5606 33.1746C20.5167 33.3935 20.6479 33.6204 20.8777 33.6663L20.9168 33.4701C20.8057 33.448 20.7324 33.335 20.7567 33.2139L20.5606 33.1746ZM22.3327 23.2497L20.5602 33.1767L20.7571 33.2118L22.5296 23.2849L22.3327 23.2497ZM16.9951 24.3516L22.4489 23.3657L22.4133 23.1689L16.9595 24.1548L16.9951 24.3516ZM16.5999 24.222C16.65 24.272 16.7184 24.3038 16.7818 24.3233C16.8466 24.3432 16.9161 24.3532 16.9773 24.3532V24.1532C16.9362 24.1532 16.8864 24.1462 16.8404 24.1321C16.7931 24.1176 16.7591 24.0984 16.7411 24.0804L16.5999 24.222ZM16.4682 23.8452C16.4682 23.9707 16.5105 24.0917 16.5874 24.2068L16.7536 24.0956C16.6942 24.0067 16.6682 23.9237 16.6682 23.8452H16.4682ZM17.8325 13.4294L16.4691 23.8322L16.6674 23.8582L18.0308 13.4553L17.8325 13.4294ZM18.2726 13.0364C18.0444 13.0364 17.875 13.2166 17.8336 13.4227L18.0297 13.462C18.0566 13.3281 18.1598 13.2364 18.2726 13.2364V13.0364ZM23.5219 13.0364H18.2726V13.2364H23.5219V13.0364ZM23.8777 13.2168C23.7858 13.0794 23.6471 13.0364 23.5219 13.0364V13.2364C23.6012 13.2364 23.6669 13.2614 23.7114 13.3279L23.8777 13.2168ZM23.9235 13.61C23.9649 13.4861 23.967 13.3504 23.8777 13.2168L23.7114 13.3279C23.7585 13.3984 23.7606 13.4666 23.7338 13.5466L23.9235 13.61ZM21.4341 20.3443L23.9224 13.613L23.7349 13.5437L21.2465 20.2749L21.4341 20.3443ZM26.6247 18.3455L21.3072 20.2153L21.3735 20.404L26.691 18.5342L26.6247 18.3455ZM22.0185 30.0159L23.2797 22.8767L23.0827 22.8419L21.8215 29.9811L22.0185 30.0159ZM26.088 19.2866L21.8271 29.9615L22.0129 30.0356L26.2737 19.3607L26.088 19.2866ZM20.9303 21.2539L26.2137 19.4181L26.148 19.2292L20.8646 21.065L20.9303 21.2539ZM20.4859 21.1623C20.6073 21.2834 20.796 21.347 20.9528 21.2427L20.8421 21.0762C20.7943 21.1079 20.7103 21.1036 20.6272 21.0207L20.4859 21.1623ZM20.3914 20.7272C20.3511 20.8881 20.3868 21.0634 20.4859 21.1623L20.6272 21.0207C20.59 20.9836 20.5576 20.8869 20.5854 20.7758L20.3914 20.7272ZM22.951 13.7817L20.3946 20.7169L20.5822 20.7861L23.1387 13.8508L22.951 13.7817ZM18.5796 13.9163H23.0449V13.7163H18.5796V13.9163ZM17.3834 23.4506L18.6787 13.8296L18.4804 13.8029L17.1852 23.4239L17.3834 23.4506ZM22.7545 22.3529L17.2666 23.3388L17.3019 23.5357L22.7899 22.5498L22.7545 22.3529ZM22.8404 22.3513H22.7722V22.5513H22.8404V22.3513ZM23.1496 22.4825C23.1096 22.4426 23.0656 22.4087 23.013 22.3854C22.9599 22.3619 22.9031 22.3513 22.8404 22.3513V22.5513C22.8799 22.5513 22.9083 22.5578 22.9319 22.5683C22.956 22.5789 22.9802 22.596 23.0083 22.6241L23.1496 22.4825ZM23.2761 22.891C23.3228 22.7513 23.2785 22.5659 23.1343 22.47L23.0236 22.6366C23.0839 22.6767 23.1079 22.7633 23.0864 22.8276L23.2761 22.891Z"
                fill="#7A40F2"
              />
            </g>
            <defs>
              <clipPath id="clip0_3_102">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(10 10)"
                />
              </clipPath>
            </defs>
          </svg>
          <div className="flex flex-col ml-4">
            <span>{props.name}</span>
            <span>Pin: {handlePin()}%</span>
          </div>
        </div>
        {/* <div>
          <span>Thời gian cập nhập: </span>
          <span>Time reset</span>
        </div> */}
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
