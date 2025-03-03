import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Switch,
  Box,
  Grid,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TodoList from "./components/TodoList.jsx";
import DeveloperInfo from "./components/DevoloperInfo";
import "./App.css";

// Light Mode Theme
const lightTheme = createTheme({
  typography: { fontFamily: "Poppins, sans-serif" },
  palette: {
    mode: "light",
    primary: { main: "#007bff" },
    secondary: { main: "#28a745" },
    background: { default: "#f4f7fc", paper: "#ffffff" },
    text: { primary: "#333", secondary: "#555" },
  },
});

// Dark Mode Theme (Perfect Contrast)
const darkTheme = createTheme({
  typography: { fontFamily: "Poppins, sans-serif" },
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#f48fb1" },
    background: { default: "#121212", paper: "#1e1e1e" },
    text: { primary: "#E0E0E0", secondary: "#B0BEC5" },
  },
});

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showDeveloperCard, setShowDeveloperCard] = useState(true);
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  /** ✅ Function to Play Notification Sound */
  const playNotificationSound = () => {
    const audio = new Audio("/notification.mp3");
    audio.play().catch((error) => console.error("Sound play blocked:", error));
  };

  /** ✅ Request Web Notification Permission */
  const requestNotificationPermission = () => {
    if (!("Notification" in window)) {
      toast.error("❌ Your browser does not support notifications.");
      return;
    }

    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        toast.success("✅ Notifications enabled!");
        showTestNotification();
      } else {
        toast.error("❌ Notifications blocked!");
      }
    });
  };

  /** ✅ Function to Show a Test Notification */
  const showTestNotification = () => {
    if (Notification.permission === "granted") {
      new Notification("Test Notification", {
        body: "This is a test notification from your hosted app! 🚀",
        icon: "/Logo.jpeg",
      });

      playNotificationSound();
    }
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      {showDeveloperCard ? (
        <DeveloperInfo onContinue={() => setShowDeveloperCard(false)} />
      ) : (
        <Box sx={{ minHeight: "100vh", padding: 2, bgcolor: darkMode ? "#121212" : "#f4f7fc" }}>
          {/* ✅ Dark Mode Toggle & Buttons */}
          <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Grid item>
              <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={requestNotificationPermission}
                sx={{
                  fontSize: "12px",
                  padding: "8px 15px",
                  bgcolor: darkMode ? "#2196F3" : "#007bff",
                  color: "#fff",
                  "&:hover": { bgcolor: darkMode ? "#1976D2" : "#0056b3" },
                }}
              >
                🔔 Enable Notifications
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={playNotificationSound}
                sx={{
                  fontSize: "12px",
                  padding: "8px 15px",
                  bgcolor: darkMode ? "#43A047" : "#28a745",
                  color: "#fff",
                  "&:hover": { bgcolor: darkMode ? "#388E3C" : "#218838" },
                }}
              >
                🔊 Test Sound
              </Button>
            </Grid>
          </Grid>

          {/* 📋 Task Manager Container */}
          <Container maxWidth="sm" className={`container ${darkMode ? "dark-mode" : ""}`}>
            <Typography variant="h4" gutterBottom sx={{ color: darkMode ? "#E0E0E0" : "#343" }}>
              Task Manager
            </Typography>
            <TodoList todos={todos} setTodos={setTodos} />
            <ToastContainer />
          </Container>
        </Box>
      )}
    </ThemeProvider>
  );
}

export default App;
