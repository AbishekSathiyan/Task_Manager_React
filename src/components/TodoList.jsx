import React, { useState, useEffect } from "react";
import { List, TextField, Button, Box, Checkbox, IconButton, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

const TodoList = ({ todos, setTodos }) => {
  const [newTodo, setNewTodo] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const audioRef = new Audio("/notification.mp3"); // 🔊 Preload Audio

  // 📌 Function to Play Notification Sound
  const playSound = () => {
    audioRef.currentTime = 0; // Reset audio to start
    audioRef.play().catch((error) => console.error("🔊 Error playing sound:", error));
  };

  // 📌 Function to Add a Task
  const addTodo = () => {
    if (!newTodo.trim() || !taskDate || !taskTime) {
      toast.error("❌ Please fill in all fields.");
      return;
    }

    const taskDateTime = new Date(`${taskDate}T${taskTime}:00`).getTime();
    if (isNaN(taskDateTime)) {
      toast.error("⚠️ Invalid date or time!");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      dueDate: taskDateTime,
    };

    setTodos([...todos, newTask]);
    toast.success(`✅ Task "${newTodo}" added!`);
    setNewTodo("");
    setTaskDate("");
    setTaskTime("");

    scheduleNotification(newTask); // 🚀 Schedule Notification Immediately
  };

  // 📌 Function to Toggle Task Completion
  const toggleComplete = (taskId) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === taskId ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    toast.info("🔄 Task updated!");
  };

  // 📌 Function to Delete a Task
  const deleteTask = (taskId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== taskId);
    setTodos(updatedTodos);
    toast.error("🗑️ Task deleted!");
  };

  // 📌 Function to Show Task Notifications with Sound
  const scheduleNotification = (task) => {
    const now = new Date().getTime();
    const delay = task.dueDate - now;

    if (delay > 0) {
      setTimeout(() => {
        if (Notification.permission === "granted") {
          const notification = new Notification("Task Reminder ⏰", { body: `Your task "${task.text}" is due now!` });
          playSound(); // 🔊 Play Sound When Notified
          toast.info(`⏰ Task "${task.text}" is due now!`);

          // 📌 Allow sound to play when clicking notification
          notification.onclick = () => {
            window.focus();
            playSound();
          };
        }
      }, delay);
    }
  };

  // 📌 Request Notification Permission on Load
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          toast.success("✅ Notifications enabled!");
        } else {
          toast.error("❌ Notifications blocked!");
        }
      });
    }
  }, []);

  // 📌 Schedule Notifications for All Tasks on Load
  useEffect(() => {
    todos.forEach((todo) => {
      if (!todo.completed) {
        scheduleNotification(todo);
      }
    });
  }, [todos]);

  return (
    <Box>
      {/* Task Input Fields */}
      <TextField label="Task" fullWidth value={newTodo} onChange={(e) => setNewTodo(e.target.value)} sx={{ mb: 2 }} />
      <TextField type="date" fullWidth value={taskDate} onChange={(e) => setTaskDate(e.target.value)} sx={{ mb: 2 }} />
      <TextField type="time" fullWidth value={taskTime} onChange={(e) => setTaskTime(e.target.value)} sx={{ mb: 2 }} />
      <Button variant="contained" fullWidth onClick={addTodo}>Add Task</Button>

      {/* Task List */}
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id} sx={{ background: todo.completed ? "#d4edda" : "#fff", mb: 1, borderRadius: "8px", boxShadow: 1 }}>
            <Checkbox checked={todo.completed} onChange={() => toggleComplete(todo.id)} />
            <ListItemText
              primary={todo.text}
              secondary={new Date(todo.dueDate).toLocaleString()}
              sx={{ textDecoration: todo.completed ? "line-through" : "none" }}
            />
            <IconButton edge="end" color="error" onClick={() => deleteTask(todo.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TodoList;
