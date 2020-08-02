import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import styled from "styled-components";
import Link from "next/link";
import {useSelector} from 'react-redux'

interface HeaderProps {}

const HeaderInner = (props: HeaderProps) => {
  const currentUser = useSelector(state => state.user.user)
  
  const headerLinks = [
    !currentUser && {label: "Sign up", href:'/auth/signup'},
    !currentUser && {label: "Sign in", href:'/auth/signin'},
    currentUser && {label: "Sign out", href:'/auth/signout'}
  ].filter(linkConfig => linkConfig)
  .map(({label, href}) => {
    return (
      <Menu.Item key={label}>
          <Link href={href}><a>{label}</a></Link>
        </Menu.Item>
    )
  })
  return (
    <Layout.Header className={props.className}>
      <Link href="/"><a>Home</a></Link>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
        {headerLinks}
      </Menu>
    </Layout.Header>
  );
};

export const Header = styled(HeaderInner)`
  display: flex;
  justify-content: space-between;
`
