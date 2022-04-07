import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { loginAPI } from '../apis';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = () => {
  const { control, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const mutation = useMutation('user', loginAPI, {
    onMutate: () => {
      setLoading(true);
    },

    onError: (error) => {
      alert(error.response?.data);
    },

    onSuccess: (user) => {
      queryClient.setQueryData('user', user);
    },
  });

  const onSubmitForm = (e) => {
    mutation.mutate({ email: e['user-email'], password: e['user-password'] });
  };

  return (
    <FormWrapper onFinish={handleSubmit(onSubmitForm)}>
      <div>
        <label htmlFor="login-user-email">이메일</label>
        <br />
        <Controller
          render={({ field }) => (
            <Input {...field} id="login-user-email" type="email" />
          )}
          rules={{ required: true }}
          control={control}
          name="user-email"
        />
      </div>
      <div>
        <label htmlFor="login-user-password">비밀번호</label>
        <br />
        <Controller
          render={({ field }) => (
            <Input
              id="login-user-password"
              type="password"
              {...field}
            />
          )}
          rules={{ required: true }}
          control={control}
          name="user-password"
        />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={loading}>로그인</Button>
        <Link href="/signup"><a><Button>회원가입</Button></a></Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default LoginForm;
