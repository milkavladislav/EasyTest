import { connect } from 'react-redux';
import React from 'react';
//import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost } from '../../actions/postActions';

const PostItem = ({ post, auth, deletePost, showActions }) => {
  //console.log(auth);
  //console.log(post);

  const onDeleteClick = (id) => {
    deletePost(id);
  };

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <img
            className="rounded-circle d-none d-md-block"
            src={post.avatar}
            alt=""
          />
          <br />
          <p className="text-center">{post.name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{post.text}</p>

          {showActions ? (
            <div>
              <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                Comments
              </Link>
              {post.user === auth.user.id && (
                <button
                  type="button"
                  className="btn btn-danger mr-1"
                  onClick={onDeleteClick.bind(null, post._id)}
                >
                  <i className="fas fa-times" />
                </button>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost })(PostItem);
