jest.mock("../taskManager");

const request = require("supertest");
const app = require("../index");
const taskManager = require("../taskManager");

describe("tests mackés", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test(" POST ajouter une tache :", async () => {
    const fakeTask = { id: 1, title: "TacheDeMock", completed: false };
    taskManager.addTask.mockReturnValue(fakeTask);

    const reponse = await request(app)
      .post("/api/tasks")
      .send("title=TacheDeMock");

    expect(reponse.statusCode).toBe(201);
    expect(reponse.body.title).toBe("TacheDeMock");
  });
});
