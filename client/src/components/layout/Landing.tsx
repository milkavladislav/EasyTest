import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing">
      <div className="dark-overlay landing-inner text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">EasyTest</h1>
              <p className="lead">
                Створюйте свої тести та проходьте тести інших. 
                Розширюйте свої знання.
              </p>
              <hr />
              <Link to="/register" className="btn btn-lg btn-info mr-2">
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-lg btn-light">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
