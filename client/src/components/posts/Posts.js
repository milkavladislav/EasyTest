import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postActions';
import PostForm from './PostForm';
import PostFeed from './PostFeed';

const Posts = (props) => {
  const { posts, loading } = props.post;
  const { getPosts } = props;

  let postContent;

  if (posts === null || loading) {
    postContent = <Spinner />;
  } else {
    postContent = <PostFeed posts={posts} />;
  }

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className="feed">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PostForm />
            {postContent}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
