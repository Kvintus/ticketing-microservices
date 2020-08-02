import Router from "next/router";
import { useRequest } from "../../hooks/useRequest";
import { AuthForm } from "../../components/auth/AuthForm";
import Link from "next/link";

export default () => {
  const executeRequest = useRequest({
    onSuccess: () => Router.push("/"),
  });

  const onFinish = (values) => {
    executeRequest({
      method: "post",
      url: "/api/users/signup",
      data: values,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <AuthForm
      title="Sign Up"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      actionSlot={<Link href="/auth/signin"><a title="Sign in">Sign In</a></Link>}
    />
  );
};
