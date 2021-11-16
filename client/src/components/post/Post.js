import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PostItem from '../posts/PostItem';
import Spinner from '../common/Spinner';
import { getPost } from '../../actions/postActions';
//import comments

const Post = (props) => {
  const { post, loading } = props.post;
  const { getPost } = props;
  const id = props.match.params.id;
  let postContent;

  if (post === null || loading) {
    postContent = <Spinner />;
  } else {
    postContent = (
      <div>
        <PostItem post={post} showActions={false} />
        {/* comments components - form and feed*/}
      </div>
    );
  }

  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  return (
    <div className="post">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to="/feed" className="btn btn-light mb-3">
              Back To Feed
            </Link>
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
export default connect(mapStateToProps, { getPost })(Post);
