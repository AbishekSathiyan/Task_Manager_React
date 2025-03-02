import React from "react";
import { ListItem, ListItemText, IconButton, Checkbox } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { format } from "date-fns";

const TodoItem = ({ todo, onDelete }) => {
  let formattedDate = "Invalid Date";
  try {
    formattedDate = format(new Date(todo.dueDate), "MM/dd/yyyy hh:mm a");
  } catch {}

  return (
    <ListItem sx={{ background: todo.completed ? "#d4edda" : "#ffffff", borderRadius: "8px", mb: 1, boxShadow: 1 }}>
      <Checkbox checked={todo.completed} />
      <ListItemText primary={todo.text} secondary={`Due: ${formattedDate}`} />
      <IconButton edge="end" onClick={onDelete} color="error">
        <Delete />
      </IconButton>
    </ListItem>
  );
};

export default TodoItem;
