import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Button, Form, Input } from 'antd';
import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addPostAPI, loadMyInfoAPI, uploadImagesAPI } from '../apis';
import CONSTANTS from '../constants';

const FormWrap = styled(Form)`
  margin: 10px 0 20px;
`;

const SubmitButton = styled(Button)`
  float: right;
`;

const PostImageWrapper = styled.div`
    display: inline-block;
`;

const PostImage = styled.img`
  width: 200px;
`;

const PostForm = () => {
  const queryClient = useQueryClient();
  const { data: me } = useQuery('user', loadMyInfoAPI);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [imagePaths, setImagePaths] = useState([]);
  const imageInput = useRef(null);
  const mutation = useMutation('posts', addPostAPI, {
    onMutate() {
      if (!me) return;
      setLoading(true);
      queryClient.setQueryData('posts', (data) => {
        const newPages = data?.pages.slice() || [];
        newPages[0].unshift({
          id: 0,
          User: me,
          content: text,
          Images: imagePaths.map((v, i) => ({ src: v, id: i })),
          Comments: [],
          Likers: [],
          createdAt: new Date().toString(),
        });
        return {
          pageParams: data?.pageParams || [],
          pages: newPages,
        };
      });
    },
    onSuccess() {
      setText('');
      setImagePaths([]);
      queryClient.refetchQueries('posts');
    },
    onSettled() {
      setLoading(false);
    },
  });

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    const images = e.target.files;
    const imageForm = new FormData();
    Array.from(images).forEach((file) => {
      imageForm.append('image', file);
    });

    uploadImagesAPI(imageForm).then((result) => {
      setImagePaths((prev) => prev.concat(result));
    });
  }, []);

  const onClickRemoveImage = useCallback((index) => () => {
    setImagePaths((prev) => prev.filter((v, i) => i !== index));
  }, []);

  const textAreaStyle = useMemo(() => ({
    marginBottom: 10,
  }), []);

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요.');
    }

    const formData = new FormData();
    imagePaths.forEach((path) => {
      formData.append('image', path);
    });

    formData.append('content', text);
    return mutation.mutate(formData);
  }, [mutation, text, imagePaths]);

  return (
    <FormWrap onFinish={onSubmit} encType="multipart/form-data">
      <Input.TextArea
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
        value={text}
        onChange={onChangeText}
        style={textAreaStyle}
      />
      <div>
        <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <SubmitButton type="primary" htmlType="submit" loading={loading}>짹짹</SubmitButton>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <PostImageWrapper key={v}>
            <PostImage src={`${CONSTANTS.IMAGE_PREFIX}${v}`} alt={v} />
            <div>
              <Button onClick={onClickRemoveImage(i)}>제거</Button>
            </div>
          </PostImageWrapper>
        ))}
      </div>
    </FormWrap>
  );
};

export default PostForm;
