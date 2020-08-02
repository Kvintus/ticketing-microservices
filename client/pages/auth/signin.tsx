import Router from "next/router";
import { useRequest } from "../../hooks/useRequest";
import { AuthForm } from "../../components/auth/AuthForm";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/slices/userSlice";

const SignInPage = () => {
  const dispatch = useDispatch()
  const executeRequest = useRequest({
    onSuccess: (data) => {
      dispatch(signIn(data))
      Router.push("/");
    },
  });

  const onFinish = (values) => {
    executeRequest({
      method: "post",
      url: "/api/users/signin",
      data: values,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <AuthForm
      title="Sign In"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      actionSlot={
        <Link href="/auth/signup">
          <a title="Sign up">Sign up</a>
        </Link>
      }
    />
  );
};

export default SignInPage;
