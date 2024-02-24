import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskDetails, getTasks } from "../../actions/taskAction";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function Home() {
  // const alert = useAlert();
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const { loading, task } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getTasks(keyword));
  }, [dispatch, keyword]);

  const handleDelete = async (id) => {
    const response = await axios
      .delete("/api/v1/task/" + id)
      .then((response) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const filteredTasks = task;
  return (
    <div>
      <div className="table-container table-container">
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task, index) => {
              return (
                <tr key={index}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.dueDate.slice(0, 10)}</td>
                  <td>
                    <Link
                      to={`/update/${task._id}`}
                      className="btn delete-button"
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="btn delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="create_btn">
          <Link to="/create" className="btn btn-outline-primary">
            Create
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
