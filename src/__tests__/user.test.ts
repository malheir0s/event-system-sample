import request from 'supertest';
import { app } from '../server';

import { mongoose } from '../database';

describe("User", () => {
  beforeAll(async () => {
    const options = {
      "useNewUrlParser": true,
      "useUnifiedTopology": true
    }
    mongoose.connect("mongodb://localhost:27017/MBLabs", options)
  })


  it("Should not be able to created a user with existing email", async () => {
    const response = await request(app).post("/signup")
      .send({
        email: "andre2@example.com",
        name: "User Example",
        password: "123456"
      })
    expect(response.status).toBe(201);
  })

  it("Should be able to login", async () => {
    const response = await request(app).post("/signin")
      .send({
        email: "andre2@example.com",
        password: "123456"
      })
    expect(response.status).toBe(200);

  })


})