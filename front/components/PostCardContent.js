import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const PostCardContent = ({ postData }) => (
  <div>
    {postData.split(/(#[^\s#]+)/g).map((v, i) => {
      if (/(#[^\s#]+)/g.test(v)) {
        return <Link key={i} href={`/hashtag/${v.slice(1)}`}><a>{v}</a></Link>;
      }

      return v;
    })}
  </div>
);

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
