import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addCommentRequestAction } from '../reducers/post';
import { addCommentAPI, likePostAPI, loadMyInfoAPI } from '../apis';

const FormItemWrap = styled(Form.Item)`
  position: relative;
  margin: 0;
`;

const CommentSubmitButton = styled(Button)`
  position: absolute;
  z-index: 1;
  right: 0;
  bottom: -40px;
  
  &.ant-btn-loading {
    position: absolute;
  }
`;

const CommentForm = ({ post }) => {
  const { data: me } = useQuery('user', loadMyInfoAPI);
  const { control, handleSubmit, setValue } = useForm();
  const queryClient = useQueryClient();

  const commentMutation = useMutation(['comment', post.id], addCommentAPI, {
    onSettled() {
      queryClient.refetchQueries('posts');
      setValue('commentText', '');
    },
  });

  const onSubmitComment = ({ commentText }) => {
    if (me) {
      commentMutation.mutate({ postId: post.id, content: commentText, userId: me.id });
    }
  };

  return (
    <Form onFinish={handleSubmit(onSubmitComment)}>
      <FormItemWrap>
        <Controller
          render={({ field }) => (
            <Input.TextArea
              row={4}
              {...field}
            />
          )}
          name="commentText"
          control={control}
        />
        <CommentSubmitButton type="primary" htmlType="submit" loading={commentMutation.isLoading}>삐약</CommentSubmitButton>
      </FormItemWrap>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
