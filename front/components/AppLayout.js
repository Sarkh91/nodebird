import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import { loadMyInfoAPI } from '../apis';
import useInput from '../hooks/useInput';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  const router = useRouter();
  const [menuKey, setMenuKey] = useState(router.asPath);
  const { data: me } = useQuery('user', loadMyInfoAPI);
  const [searchInput, onChangeSearchInput] = useInput();

  const menuHandler = (e) => {
    setMenuKey(e.key);
  };

  const onSearch = useCallback(() => {
    router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <div>
      <Menu mode="horizontal" onClick={menuHandler} selectedKeys={[menuKey]}>
        <Menu.Item key="/">
          <Link href="/"><a>노드버드</a></Link>
        </Menu.Item>
        <Menu.Item key="/profile">
          <Link href="/profile"><a>프로필</a></Link>
        </Menu.Item>
        <Menu.Item key="search">
          <SearchInput
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch}
            enterButton
          />
        </Menu.Item>
        {/* <Menu.Item key="/signup"> */}
        {/*  <Link href="/signup"><a>회원가입</a></Link> */}
        {/* </Menu.Item> */}
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="https://sarkh91.github.io/" target="_blank" rel="noopener noreferrer">Made By Sarkh91</a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
