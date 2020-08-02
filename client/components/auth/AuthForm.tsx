import React from "react";
import { Container } from "../Shared/Container/Container";
import { Form, Input, Card, Button } from "antd";
import styled from "styled-components";
import { Typography } from 'antd';
const { Title } = Typography;


export interface AuthFormProps {
  title: string;
  onFinish: (values) => void;
  onFinishFailed: (errorinfo) => void;
  actionSlot?: JSX.Element;
  className?: string;
}

const AuthFormInner = (props: AuthFormProps) => {
  return (
    <div className={props.className}>
      <Card className="card">
        <Form
          layout="vertical"
          name="basic"
          initialValues={{ email: null, password: null }}
          onFinish={props.onFinish}
          onFinishFailed={props.onFinishFailed}
        >
          <Title>{props.title}</Title>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button size="large" type="primary" htmlType="submit">
              {props.title}
            </Button>
            <div style={{ paddingLeft: "20px", display: "inline-block" }}>
              {props?.actionSlot}
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export const AuthForm = styled(AuthFormInner)`
  display: flex;
  height: calc(100vh - 64px);
  align-items: center;
  justify-content: center;
  .card {
    width: 450px;
  }
`;
