const express = require("express");
const path = require("path");
const taskManager = require("./taskManager");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "1234") {
    res.redirect("/dashboard");
  } else {
    res.redirect("/?error=1");
  }
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

app.get("/api/tasks", (req, res) => {
  res.json(taskManager.getAllTasks());
});

app.post("/api/tasks", (req, res) => {
  const { title } = req.body;
  const task = taskManager.addTask(title);
  res.status(201).json(task);
});

app.patch("/api/tasks/:id/toggle", (req, res) => {
  const task = taskManager.toggleTask(Number(req.params.id));
  if (task) {
    res.json(task);
  } else {
    res.status(404).send();
  }
});

app.delete("/api/tasks/:id", (req, res) => {
  taskManager.deleteTask(Number(req.params.id));
  res.status(204).send();
});

app.get("/api/tasks/:id", (req, res) => {
  const task = taskManager.getTaskById(Number(req.params.id));
  if (task) {
    res.json(task);
  } else {
    res.status(404).send();
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
  });
}

module.exports = app;
