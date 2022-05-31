const request = require("supertest")
const app = require("../app")
const Faker = require("@faker-js/faker")
const faker = Faker.faker;

describe("POST /orders", () => {
    describe("Create or add to user order", () => {
        test("should return with a 200 status code", async () => {
            const auth = await request(app).post("/auth/login").send({
                "email": "customer@gmail.com",
                "password": "customerpassword"
            })
            const products = await request(app)
                .get("/products")
                .set("Authorization", `Bearer ${auth.body.token}`)
                .send()
            let lastProduct = products.body.data.pop()
            const response = await request(app)
                .post("/orders")
                .set("Authorization", `Bearer ${auth.body.token}`)
                .send({
                    "productId": lastProduct._id,
                    "quantity": 2
                })
            console.log(response.statusCode)
            await expect(response.statusCode).toBe(200)
        }, 30000)

        test("should return 401 when authorization header is not provided", async () => {
            const response = await request(app)
                .post("/orders")
                .send({
                    "productId": "test",
                    "quantity": 2
                })
            console.log(response.statusCode)
            await expect(response.statusCode).toBe(401)
        }, 30000)
    })
})

describe("GET /orders", () => {
    describe("GET User existing Order", () => {
        test("should return with a 200 status code", async () => {
            const auth = await request(app).post("/auth/login").send({
                "email": "customer@gmail.com",
                "password": "customerpassword"
            })
            const response = await request(app)
                .get("/orders")
                .set("Authorization", `Bearer ${auth.body.token}`)
                .send()
            console.log(response.statusCode)
            await expect(response.statusCode).toBe(200)
        }, 10000)

        test("should return 401 when authorization header is not provided", async () => {
            const response = await request(app)
                .get("/orders")
                .send()
            console.log(response.statusCode)
            await expect(response.statusCode).toBe(401)
        }, 10000)
    })
})

describe("PUT /orders", () => {
    describe("Update User existing Order", () => {
        test("should return with a 200 status code", async () => {
            const auth = await request(app).post("/auth/login").send({
                "email": "customer@gmail.com",
                "password": "customerpassword"
            })
            const order = await request(app)
                .get("/orders")
                .set("Authorization", `Bearer ${auth.body.token}`)
                .send()
            const lastItem = order.body.items.pop()
            const response = await request(app)
                .put("/orders")
                .set("Authorization", `Bearer ${auth.body.token}`)
                .send({
                    "items": [{
                        "itemId": lastItem._id,
                        "quantity": 3
                    }]
                })
            console.log(response.statusCode)
            await expect(response.statusCode).toBe(200)
        }, 10000)

        test("should return 401 when authorization header is not provided", async () => {
            const response = await request(app)
                .put("/orders")
                .send()
            console.log(response.statusCode)
            await expect(response.statusCode).toBe(401)
        }, 10000)
    })
})

describe("POST /orders/checkout", () => {
    describe("Checkout User existing Order", () => {
        test("should return with a 200 status code", async () => {
            const auth = await request(app).post("/auth/login").send({
                "email": "customer@gmail.com",
                "password": "customerpassword"
            })
            const response = await request(app)
                .post("/orders/checkout")
                .set("Authorization", `Bearer ${auth.body.token}`)
                .send()
            await expect(response.statusCode).toBe(200)
        }, 10000)

        test("should return 401 when authorization header is not provided", async () => {
            const response = await request(app)
                .post("/orders/checkout")
                .send()
            console.log(response.statusCode)
            await expect(response.statusCode).toBe(401)
        }, 10000)
    })
})
