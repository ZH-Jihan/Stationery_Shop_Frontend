import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";

import { Button, Checkbox, Form, FormProps, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  type FieldType = {
    email: string;
    password: string;
    remember: string;
  };
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const toastId = toast.loading("Login in-progress...");
    try {
      const res = await login({
        email: values.email,
        password: values.password,
      }).unwrap();

      const user = verifyToken(res?.data?.accessToken) as TUser;
      toast.success("user logged in successfully", { id: toastId });
      dispatch(setUser({ user: user, token: res?.data?.accessToken }));
      navigate(`/${user?.role}/dashboard`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(`Something went wrong: ${err.message}`, { id: toastId });
      } else {
        toast.error("Something went wrong", { id: toastId });
      }
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, margin: "auto", marginTop: "100px" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          rules={[{ required: true, message: "Please input your username!" }]}
          initialValue={"zakir@gmail.com"}
          name="email"
        >
          <Input placeholder="" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          initialValue={"Zakir@gmail.com1"}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          valuePropName="checked"
          name="remember"
          label={null}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
