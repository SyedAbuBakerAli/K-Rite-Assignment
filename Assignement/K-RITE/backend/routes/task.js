const express = require(`express`);
const router = express.Router();

const {
  getTask,
  getSingleTask,
  updateTask,
  newTask,
  deleteTask,
} = require("../controllers/taskController");

router.route("/tasks").get(getTask);
router.route("/task/:id").get(getSingleTask);
router.route("/task/new").post(newTask);
router.route("/task/:id").put(updateTask).delete(deleteTask);

module.exports = router;
