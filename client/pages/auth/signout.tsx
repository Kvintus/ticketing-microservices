import { NextPage } from "next";

import React, { useEffect } from "react";
import { useRequest } from "../../hooks/useRequest";
import Router from "next/router";
import { useDispatch } from 'react-redux'
import { signOut } from "../../store/slices/userSlice";

const SignOutPage = () => {
  const dispatch = useDispatch()
  const request = useRequest({
    onSuccess: () => {
      dispatch(signOut())
      Router.push("/")
    },
  });
  useEffect(() => {
    request({
      url: "/api/users/signout",
      method: "post",
    });
  }, []);

  return <div>Signing you out...</div>
};

export default SignOutPage;
