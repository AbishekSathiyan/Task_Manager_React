import React from "react";
import { Card, CardContent, Typography, Button, IconButton, Link, Avatar, Box, Divider } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const DeveloperInfo = ({ onContinue }) => {
  return (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 5, p: 3, textAlign: "center", boxShadow: 3, borderRadius: "12px", background: "#fff" }}>
      <CardContent>
        
        {/* 🧑‍💻 Developer Info Section */}
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#007bff", mb: 1 }}>
          👨‍💻 Developer Info
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {/* Profile Image */}
        <Avatar alt="Abishek S" src="/Mine.jpg" sx={{ width: 90, height: 90, mx: "auto", mb: 2, boxShadow: 2 }} />

        {/* Name & Title */}
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>Abishek S</Typography>
        <Typography variant="body2" color="textSecondary">Full Stack Developer</Typography>

        {/* Qualification */}
        <Typography variant="body2" sx={{ mt: 1, fontWeight: "bold", color: "#007bff" }}>
          🎓 Master of Computer Applications
        </Typography>

        {/* Profile Summary */}
        <Typography variant="body2" sx={{ mt: 1, color: "#555" }}>
          Passionate about building scalable web applications with modern technologies.
          Skilled in MERN Stack Development.
        </Typography>

        {/* Links Section */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
          <IconButton color="primary" component="a" href="https://abisheksathiyan.github.io/Abishek_Portfolio/" target="_blank">
            <LanguageIcon />
          </IconButton>

          <IconButton color="secondary" component="a" href="http://github.com/AbishekSathiyan" target="_blank">
            <GitHubIcon />
          </IconButton>

          <IconButton color="primary" component="a" href="https://linkedin.com/in/abishek2204" target="_blank">
            <LinkedInIcon />
          </IconButton>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 3 }} />

        {/* 📋 Project Info Section */}
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#007bff", mb: 1 }}>
          📋 Task Manager Info
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {/* App Information */}
        <Box sx={{ textAlign: "center", mt: 1 }}>
          <Typography variant="body2" sx={{ mt: 1, color: "#555" }}>
            A simple and efficient Task Management App with reminders, dark mode, and notifications.
            Stay organized and never miss a task!
          </Typography>
        </Box>

        {/* Continue Button */}
        <Button variant="contained" sx={{ mt: 3, borderRadius: "20px" }} onClick={onContinue}>
          Continue
        </Button>
      </CardContent>
    </Card>
  );
};

export default DeveloperInfo;
