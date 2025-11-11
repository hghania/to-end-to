const taskManager = require("../taskManager");

describe("tests unitaires pour Task Manager", () => {
  test("Ajouter une tache", () => {
    const task = taskManager.addTask("Ahmed");
    expect(task.title).toBe("Ahmed");
    expect(typeof task.id).toBe("number");
    expect(task.completed).toBe(false);
  });

  test("Get All tasks", () => {
    const task = taskManager.addTask("Tache 1");
    const allTasks = taskManager.getAllTasks();

    const found = allTasks.find((t) => t.id === task.id);
    expect(found).toBeDefined();
    expect(found.title).toBe("Tache 1");
  });

  test("Toggle (comlete) une tache", () => {
    const task = taskManager.addTask("Toggle test");
    const toggled = taskManager.toggleTask(task.id);
    expect(toggled.completed).toBe(true);
  });

  test("Supprimer une tache ", () => {
    const task = taskManager.addTask("tache a supprimer");
    taskManager.deleteTask(task.id);
    const allTasks = taskManager.getAllTasks();
    const stillExists = allTasks.find((t) => t.id === task.id);
    expect(stillExists).toBeUndefined();
  });

  test("recupere une tache par son ID", () => {
    const task = taskManager.addTask("get task by id");
    const retrievedTask = taskManager.getTaskById(task.id);
    expect(retrievedTask).toBeDefined();
    expect(retrievedTask.title).toBe("get task by id");
  });
});
