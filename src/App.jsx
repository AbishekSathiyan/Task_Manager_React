import React, { useState, useEffect } from "react";
import { Container, Typography, Button, ThemeProvider, createTheme, CssBaseline, Switch, Box } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  const requestNotificationPermission = () => {
    Notification.requestPermission().then((result) => {
      if (result === "granted") {
        toast.success("✅ Notifications enabled!");
      } else {
        toast.error("❌ Notifications blocked!");
      }
    });
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      {showDeveloperCard ? (
        <DeveloperInfo onContinue={() => setShowDeveloperCard(false)} />
      ) : (
        <Box sx={{ position: "relative", minHeight: "100vh", padding: 2 }}>
          
          {/* 🌙 Dark Mode Toggle (Top-Left Corner) */}
          <Switch 
            checked={darkMode} 
            onChange={() => setDarkMode(!darkMode)} 
            sx={{
              position: "absolute",
              top: 20,
              left: 20,
              fontSize: "12px",
              backgroundColor: "#fff",
              borderRadius: "20px",
              padding: "5px",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)"
            }}
          />

          {/* 🔔 Enable Notifications Button (Top-Right Corner) */}
          <Button 
            variant="contained" 
            onClick={requestNotificationPermission} 
            sx={{
              position: "absolute",
              top: 20,
              right: 20,
              fontSize: "12px",
              padding: "5px 10px",
              minWidth: "auto",
              backgroundColor: "#007bff",
              "&:hover": { backgroundColor: "#0056b3" }
            }}
          >
            🔔 Enable Notifications
          </Button>

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
