import { Button, Checkbox, Form, Input } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../utils/firebase/firebase";
import Icon from "../../utils/icon/Icon";

import "./index.scss";

export default function Login() {
  const onFinish = (values: any) => {
    signInWithEmailAndPassword (auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="lld-login">
      <Icon icon="Google" className="" size={24} />
      <Form
        name="basic"
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        initialValues={{
          email: "admin@mydaily.com",
          password: "L1234567890-=",
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{required: true, message: "Please input your username!"}]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{required: true, message: "Please input your password!"}]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{offset: 8, span: 16}}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{offset: 8, span: 16}}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
