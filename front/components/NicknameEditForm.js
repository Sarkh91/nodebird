import React from 'react';
import { Form, Input } from 'antd';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useQueryClient } from 'react-query';
import { changeNicknameRequestAction } from '../reducers/user';
import { changeNicknameAPI } from '../apis';

const FormWrapper = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
`;

const NicknameEditForm = () => {
  const { control, handleSubmit } = useForm();
  const queryClient = useQueryClient();

  const onSubmit = (e) => {
    changeNicknameAPI(e).finally(() => {
      queryClient.refetchQueries('user');
    });
  };

  return (
    <FormWrapper>
      <Controller
        render={({ field }) => (
          <Input.Search {...field} id="nickname" addonBefore="닉네임" enterButton="수정" onSearch={handleSubmit(onSubmit)} />
        )}
        rules={{ required: true }}
        control={control}
        name="nickname"
      />

    </FormWrapper>
  );
};

export default NicknameEditForm;
