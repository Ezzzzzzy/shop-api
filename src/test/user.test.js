const request = require("supertest")
const app = require("../app")
const Faker = require("@faker-js/faker")
const faker = Faker.faker;

describe("POST /auth/register", () => {
    describe("Given name, email, password, and role", () => {

        test("should respond with a 200 status code", async () => {
            const response = await request(app).post("/auth/register").send({
                name: faker.name.findName(),
                email: faker.internet.email(),
                password: "testcustomerpassword",
                role: "Customer"
            })
            await expect(response.statusCode).toBe(200)
        }, 10000)

        test("should receive a response with proper data", async () => {
            const response = await request(app).post("/auth/register").send({
                name: faker.name.findName(),
                email: faker.internet.email(),
                password: "testcustomerpassword",
                role: "Customer"
            })
            await expect(response.body).toEqual(
                expect.objectContaining({
                    name: expect.any(String),
                    email: expect.any(String),
                    role: expect.any(String),
                    _id: expect.any(String),
                    createdAt: expect.any(String),
                    hash_password: expect.any(String),
                }))
        }, 10000)
    })
})

describe("POST /auth/login", () => {
    describe("Given email and password", () => {

        test("should return status 200 if valid", async () => {
            const response = await request(app).post("/auth/login").send({
                "email": "merchant@gmail.com",
                "password": "merchantpassword"
            })
            await expect(response.statusCode).toBe(200)
        })

        test("should return token if valid", async () => {
            const response = await request(app).post("/auth/login").send({
                "email": "merchant@gmail.com",
                "password": "merchantpassword"
            })
            expect(response.body).toEqual(
                expect.objectContaining({
                    message: "Auth Successful",
                    token: expect.any(String)
                })
            )
        })

        test("should return error if provided with wrong credentials", async () => {
            const response = await request(app).post("/auth/login").send({
                "email": "merchant@gmail.com",
                "password": "wrongpassword"
            })
            expect(response.body).toEqual(
                expect.objectContaining({
                    message: "Auth Failed",
                })
            )
        })
    })
})