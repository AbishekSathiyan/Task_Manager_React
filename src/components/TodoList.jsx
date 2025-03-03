import React, { useState, useEffect } from "react";
import { List, TextField, Button, Box, Checkbox, IconButton, ListItem, ListItemText, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

const TodoList = ({ todos, setTodos }) => {
  const [newTodo, setNewTodo] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const audioRef = new Audio("/notification.mp3");
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const playSound = () => {
    audioRef.currentTime = 0;
    audioRef.play().catch((error) => console.error("🔊 Error playing sound:", error));
  };

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

    scheduleNotification(newTask);
  };

  const toggleComplete = (taskId) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === taskId ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    toast.info("🔄 Task updated!");
  };

  const deleteTask = (taskId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== taskId);
    setTodos(updatedTodos);
    toast.error("🗑️ Task deleted!");
  };

  const scheduleNotification = (task) => {
    const now = new Date().getTime();
    const delay = task.dueDate - now;

    if (delay > 0) {
      setTimeout(() => {
        if (Notification.permission === "granted") {
          const notification = new Notification("Task Reminder ⏰", { body: `Your task "${task.text}" is due now!` });
          playSound();
          toast.info(`⏰ Task "${task.text}" is due now!`);

          notification.onclick = () => {
            window.focus();
            playSound();
          };
        }
      }, delay);
    }
  };

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

  useEffect(() => {
    todos.forEach((todo) => {
      if (!todo.completed) {
        scheduleNotification(todo);
      }
    });
  }, [todos]);

  return (
    <Box sx={{ p: 3, bgcolor: isDarkMode ? "#222" : "#f5f5f5", borderRadius: 2, boxShadow: 3 }}>
  <TextField
    label="Task"
    fullWidth
    value={newTodo}
    onChange={(e) => setNewTodo(e.target.value)}
    sx={{
      mb: 2,
      input: { color: isDarkMode ? "#fff" : "#000" },
      label: { color: isDarkMode ? "#bbb" : "#444" },
      bgcolor: isDarkMode ? "#2a2a2a" : "#fff",
      borderRadius: 1,
    }}
  />
  <TextField
    type="date"
    fullWidth
    value={taskDate}
    onChange={(e) => setTaskDate(e.target.value)}
    sx={{
      mb: 2,
      input: { color: isDarkMode ? "#fff" : "#000" },
      label: { color: isDarkMode ? "#bbb" : "#444" },
      bgcolor: isDarkMode ? "#2a2a2a" : "#fff",
      borderRadius: 1,
    }}
  />
  <TextField
    type="time"
    fullWidth
    value={taskTime}
    onChange={(e) => setTaskTime(e.target.value)}
    sx={{
      mb: 2,
      input: { color: isDarkMode ? "#fff" : "#000" },
      label: { color: isDarkMode ? "#bbb" : "#444" },
      bgcolor: isDarkMode ? "#2a2a2a" : "#fff",
      borderRadius: 1,
    }}
  />
  <Button
    variant="contained"
    fullWidth
    onClick={addTodo}
    sx={{
      bgcolor: isDarkMode ? "#1976d2" : "#1976d2",
      "&:hover": { bgcolor: isDarkMode ? "#115293" : "#1565c0" },
    }}
  >
    Add Task
  </Button>

  <List sx={{ mt: 2 }}>
    {todos.map((todo) => (
      <ListItem
        key={todo.id}
        sx={{
          background: isDarkMode ? (todo.completed ? "#1b5e20" : "#333") : todo.completed ? "#d4edda" : "#fff",
          color: isDarkMode ? "#fff" : "#000",
          mb: 1,
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        <Checkbox checked={todo.completed} onChange={() => toggleComplete(todo.id)} />
        <ListItemText
          primary={todo.text}
          secondary={new Date(todo.dueDate).toLocaleString()}
          sx={{
            textDecoration: todo.completed ? "line-through" : "none",
            color: isDarkMode ? (todo.completed ? "#999" : "#ccc") : "#000",
          }}
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
