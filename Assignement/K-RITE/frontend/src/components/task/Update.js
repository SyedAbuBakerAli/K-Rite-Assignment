import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateTask } from "../../actions/taskAction";

function Update() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const [values, setValues] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const response = await axios.get(`/api/v1/task/${id}`);
      setValues({
        title: response.data.task.title,
        description: response.data.task.description,
        dueDate: response.data.task.dueDate,
      });
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!values.title || !values.description || !values.dueDate) {
      setErrorMsg("Please fill all fields");
    } else {
      dispatch(updateTask(id, values));
      window.location.reload();
      navigate("/dashboard");
    }
  };

  return (
    <div className="container-fluid">
      <Link to="/dashboard" className="btn btn-outline-primary back_btn">
        Back
      </Link>
      <div className="view-side borders form-fields">
        <h2 className="title-text">Update Task</h2>
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
        <div className="login-box">
          <form className="form-style" onSubmit={submitHandler}>
            <div className="form-group">
              <label for="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={values.title}
                onChange={(e) =>
                  setValues({ ...values, title: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label for="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={values.description}
                onChange={(e) =>
                  setValues({ ...values, description: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label for="description">Due Date</label>
              <input
                type="date"
                className="form-control"
                id="description"
                value={values.dueDate}
                onChange={(e) =>
                  setValues({ ...values, dueDate: e.target.value })
                }
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Update;
