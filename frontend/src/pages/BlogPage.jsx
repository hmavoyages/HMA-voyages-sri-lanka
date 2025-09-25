import React from 'react';
import styled from 'styled-components';
import Blog from '../components/Blog';

const BlogContainer = styled.div`
  margin-top: 120px;
  min-height: 100vh;
`;

const BlogPage = () => {
  return (
    <BlogContainer>
      <Blog />
    </BlogContainer>
  );
};

export default BlogPage; 