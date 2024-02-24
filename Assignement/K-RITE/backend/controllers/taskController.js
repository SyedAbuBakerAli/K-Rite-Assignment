const Task = require(`../models/task`);

const ErrorHandler = require(`../utils/errorHandler`);
const catchAsyncErrors = require(`../middleware/catchAsyncErrors`);
const APIFeatures = require("../utils/apiFeatures");

//Create new Task
exports.newTask = catchAsyncErrors(async (req, res, next) => {
  try {
    const task = await Task.create(req.body);

    res.status(201).json({
      sucess: true,
      task,
    });
  } catch (error) {
    return next(new ErrorHandler("Task not created", 404));
  }
});

//Update task
exports.updateTask = catchAsyncErrors(async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    return next(new ErrorHandler("Task not Updated", 404));
  }
});

//Get all Task
exports.getTask = catchAsyncErrors(async (req, res, next) => {
  try {
    const apiFeatures = new APIFeatures(Task.find(), req.query).search();

    let task = await apiFeatures.query;

    res.status(200).json({
      sucess: true,
      task,
    });
  } catch (error) {
    return next(new ErrorHandler("Task not Found", 404));
  }
});

//Get single Task
exports.getSingleTask = catchAsyncErrors(async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    res.status(200).json({
      sucess: true,
      task,
    });
  } catch (error) {
    return next(new ErrorHandler("Task not Found", 404));
  }
});

//Delete task
exports.deleteTask = catchAsyncErrors(async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: `Task is Deleted.`,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }
});
