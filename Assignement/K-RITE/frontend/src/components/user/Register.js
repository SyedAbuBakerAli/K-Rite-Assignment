import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";
import { register, clearErrors } from "../../actions/userAction";
import { Link } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const { username, email, password } = user;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }

    if (error) {
      setErrorMsg(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!username) {
      setErrorMsg("Please enter username");
    } else if (!email) {
      setErrorMsg("Please enter email");
    } else if (!password) {
      setErrorMsg("Please enter password");
    } else {
      dispatch(register(username, email, password));
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <MetaData title={"Register User"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h1 className="mb-3">Register</h1>
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
            <div className="form-group">
              <label htmlFor="email_field">Username</label>
              <input
                type="username"
                id="name_field"
                className="form-control"
                name="username"
                value={username}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              REGISTER
            </button>
            <Link to="/login" className="float-right mt-3 ms-5">
              Login
            </Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
