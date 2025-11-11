const request = require("supertest");
const app = require("../index");

describe("test integration:", () => {
  test("post login avec mauvaise ", async () => {
    const reponse = await request(app)
      .post("/login")
      .send("username=1234&password=abcdefg");
    expect(reponse.headers.location).toBe("/?error=1");
  });

  test("avec bon login", async () => {
    const reponse = await request(app)
      .post("/login")
      .send("username=admin&password=1234");
    expect(reponse.headers.location).toBe("/dashboard");
  });
  test("tester poste", async () => {
    const reponse = await request(app)
      .post("/api/tasks")
      .send("titre=NouvellTache555");

    expect(reponse.statusCode).toBe(201);
    expect(reponse.body.title).toBe("NouvellTache555");
  });
});
