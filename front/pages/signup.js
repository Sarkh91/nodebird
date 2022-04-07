import React, { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { Button, Checkbox, Form, Input } from 'antd';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import AppLayout from '../components/AppLayout';
import { loadMyInfoAPI, signupAPI } from '../apis';

const ErrorMessage = styled.div` 
`;

const Signup = () => {
  const { data: me } = useQuery('user', loadMyInfoAPI);
  const { control, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [termError, setTermError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const Router = useRouter();

  useEffect(() => {
    if (me && me.id) {
      Router.replace('/');
    }
  }, [me && me.id]);

  const onSubmit = ({ email, nickname, password, passwordCheck, term }) => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }

    if (!term) {
      return setTermError(true);
    }

    setLoading(true);
    const params = { email, nickname, password };
    signupAPI(params)
      .then(() => {
        Router.replace('/');
      })
      .catch((err) => {
        alert(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const submitBtnStyle = useMemo(() => ({ marginTop: 10 }), []);

  return (
    <AppLayout>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <Form onFinish={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="signup-user-email">이메일</label>
          <br />
          <Controller
            render={({ field }) => (
              <Input {...field} id="signup-user-email" type="email" />
            )}
            rules={{ required: true }}
            control={control}
            name="email"
          />
        </div>
        <div>
          <label htmlFor="signup-user-nickname">닉네임</label>
          <br />
          <Controller
            render={({ field }) => (
              <Input {...field} id="signup-user-nickname" />
            )}
            rules={{ required: true }}
            control={control}
            name="nickname"
          />
        </div>
        <div>
          <label htmlFor="signup-user-password">비밀번호</label>
          <br />
          <Controller
            render={({ field }) => (
              <Input {...field} type="password" id="signup-user-password" />
            )}
            rules={{ required: true }}
            control={control}
            name="password"
          />
        </div>
        <div>
          <label htmlFor="signup-user-password-check">비밀번호</label>
          <br />
          <Controller
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                id="signup-user-password-check"
              />
            )}
            rules={{ required: true }}
            control={control}
            name="passwordCheck"
          />
          {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
        </div>
        <div>
          <Controller
            render={({ field }) => (
              <Checkbox {...field} checked={field.value}>회원가입에 동의합니다.</Checkbox>
            )}
            control={control}
            name="term"
          />

          {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
        </div>
        <div style={submitBtnStyle}>
          <Button type="primary" htmlType="submit" loading={loading}>가입하기</Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export default Signup;
