import React, { useState, useEffect } from "react";
import { Container, Typography, Button, ThemeProvider, createTheme, CssBaseline, Switch, Box, Grid } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodoList from "./components/TodoList.jsx";
import DeveloperInfo from "./components/DevoloperInfo";
import "./App.css";

console.log("Checking components directory:", import.meta.glob('./components/*'));

const lightTheme = createTheme({
  typography: { fontFamily: "Poppins, sans-serif" },
  palette: { mode: "light" },
});

const darkTheme = createTheme({
  typography: { fontFamily: "Poppins, sans-serif" },
  palette: { mode: "dark" },
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

  /** ✅ Function to Play Notification Sound */
  const playNotificationSound = () => {
    const audio = new Audio("/notification.mp3"); // Ensure this file exists in "public/"
    audio.play().catch(error => console.error("Sound play blocked:", error));
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
        showTestNotification(); // Show a test notification with sound
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
        icon: "/Logo.jpeg", // Ensure the image is in "public/"
      });

      playNotificationSound(); // 🔊 Play sound when the notification appears
    }
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      {showDeveloperCard ? (
        <DeveloperInfo onContinue={() => setShowDeveloperCard(false)} />
      ) : (
        <Box sx={{ minHeight: "100vh", padding: 2 }}>
          
          {/* ✅ Responsive Button Container */}
          <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            {/* 🌙 Dark Mode Toggle */}
            <Grid item>
              <Switch 
                checked={darkMode} 
                onChange={() => setDarkMode(!darkMode)} 
              />
            </Grid>

            {/* 🔔 Enable Notifications Button */}
            <Grid item>
              <Button 
                variant="contained" 
                onClick={requestNotificationPermission} 
                sx={{
                  fontSize: "12px",
                  padding: "8px 15px",
                  backgroundColor: "#007bff",
                  "&:hover": { backgroundColor: "#0056b3" }
                }}
              >
                🔔 Enable Notifications
              </Button>
            </Grid>

            {/* 🔊 Test Sound Button */}
            <Grid item>
              <Button 
                variant="contained" 
                onClick={playNotificationSound} 
                sx={{
                  fontSize: "12px",
                  padding: "8px 15px",
                  backgroundColor: "#28a745",
                  "&:hover": { backgroundColor: "#218838" }
                }}
              >
                🔊 Test Sound
              </Button>
            </Grid>
          </Grid>

          {/* 📋 Task Manager Container */}
          <Container maxWidth="sm" className={`container ${darkMode ? "dark-mode" : ""}`}>
            <Typography variant="h4" gutterBottom>📋 Task Manager</Typography>
            <TodoList todos={todos} setTodos={setTodos} />
            <ToastContainer />
          </Container>
          
        </Box>
      )}
    </ThemeProvider>
  );
}

export default App;
