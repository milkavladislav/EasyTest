import  { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextFieldGroup';
import { addPost } from '../../actions/postActions';

const PostForm = (props) => {
  const [text, setText] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors(props.errors);
  }, [props.errors]);

  const onSubmit = (e) => {
    e.preventDefault();
    const { user } = props.auth;
   

    const newPost = {
      text,
      name: user.name,
      avatar: user.avatar,
    };
    props.addPost(newPost);
    setText('');
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Say Somthing...</div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <TextAreaFieldGroup
                placeholder="Create a post"
                name="text"
                type="text"
                value={text}
                onChange={onChange}
                error={errors.text}
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addPost })(PostForm);
