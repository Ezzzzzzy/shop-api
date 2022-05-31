const request = require("supertest")
const app = require("../app")
const Faker = require("@faker-js/faker")
const faker = Faker.faker;

describe("GET /products", () => {
    describe("Get all products", () => {
        test("should return with a 200 status code", async () => {
            const auth = await request(app).post("/auth/login").send({
                "email": "merchant@gmail.com",
                "password": "merchantpassword"
            })
            const response = await request(app)
                .get("/products")
                .set("Authorization", `Bearer ${auth.body.token}`)
                .send()
            console.log(response.statusCode)
            await expect(response.statusCode).toBe(200)
        }, 30000)

        test("should return 401 when authorization header is not provided", async () => {
            const response = await request(app)
                .get("/products")
                .send()
            console.log(response.statusCode)
            await expect(response.statusCode).toBe(401)
        }, 10000)
    })
})

describe("POST /products", () => {
    describe("Create new product", () => {
        test("should return with a 200 status code", async () => {
            const auth = await request(app).post("/auth/login").send({
                "email": "merchant@gmail.com",
                "password": "merchantpassword"
            })
            const response = await request(app)
                .post("/products")
                .set("Authorization", `Bearer ${auth.body.token}`)
                .send({
                    "name": faker.commerce.productName(),
                    "code": `PRDCT${faker.random.numeric(5)}`,
                    "price": faker.datatype.float({ max: 100 })
                })
            console.log(response.statusCode)
            await expect(response.statusCode).toBe(200)
        }, 10000)

        test("should return 401 when authorization header is not provided", async () => {
            const response = await request(app)
                .post("/products")
                .send({
                    "name": faker.commerce.productName(),
                    "code": `PRDCT${faker.random.numeric(5)}`,
                    "price": faker.datatype.float({ max: 100 })
                })
            console.log(response.statusCode)
            await expect(response.statusCode).toBe(401)
        }, 10000)

        test("should block access when user role is not merchant", async () => {
            const auth = await request(app).post("/auth/login").send({
                "email": "customer@gmail.com",
                "password": "customerpassword"
            })
            const response = await request(app)
                .post("/products")
                .set("Authorization", `Bearer ${auth.body.token}`)
                .send({
                    "name": faker.commerce.productName(),
                    "code": `PRDCT${faker.random.numeric(5)}`,
                    "price": faker.datatype.float({ max: 100 })
                })
            console.log(response.statusCode)
            await expect(response.statusCode).toBe(403)
        }, 10000)
    })
})

describe("PUT /products/:id", () => {
    describe("Update existing product", () => {
        test("should return with a 200 status code", async () => {
            const auth = await request(app).post("/auth/login").send({
                "email": "merchant@gmail.com",
                "password": "merchantpassword"
            })
            const response = await request(app)
                .put("/products/6294ed5b7f175f988473518e")
                .set("Authorization", `Bearer ${auth.body.token}`)
                .send({
                    "name": faker.commerce.productName(),
                    "price": faker.datatype.float({ max: 100 })
                })
            console.log(response.statusCode)
            await expect(response.statusCode).toBe(200)
        }, 10000)

        test("should return 401 when authorization header is not provided", async () => {
            const response = await request(app)
                .put("/products/6294ed5b7f175f988473518e")
                .send({
                    "name": faker.commerce.productName(),
                    "price": faker.datatype.float({ max: 100 })
                })
            console.log(response.statusCode)
            await expect(response.statusCode).toBe(401)
        }, 10000)

        test("should block access when user role is not merchant", async () => {
            const auth = await request(app).post("/auth/login").send({
                "email": "customer@gmail.com",
                "password": "customerpassword"
            })
            const response = await request(app)
                .put("/products/6294ed5b7f175f988473518e")
                .set("Authorization", `Bearer ${auth.body.token}`)
                .send({
                    "name": faker.commerce.productName(),
                    "price": faker.datatype.float({ max: 100 })
                })
            console.log(response.statusCode)
            await expect(response.statusCode).toBe(403)
        }, 10000)
    })
})

describe("DELETE /products/:id", () => {
    describe("Delete existing product", () => {
        test("should return with a 200 status code", async () => {
            const auth = await request(app).post("/auth/login").send({
                "email": "merchant@gmail.com",
                "password": "merchantpassword"
            })
            const products = await request(app)
                .get("/products")
                .set("Authorization", `Bearer ${auth.body.token}`)
                .send()
            let lastProduct = products.body.data.pop()
            const response = await request(app)
                .delete(`/products/${lastProduct._id}`)
                .set("Authorization", `Bearer ${auth.body.token}`)
                .send()
            console.log(response.statusCode)
            await expect(response.statusCode).toBe(200)
        }, 10000)

        test("should return 401 when authorization header is not provided", async () => {
            const response = await request(app)
                .delete(`/products/test`)
                .send()
            console.log(response.statusCode)
            await expect(response.statusCode).toBe(401)
        }, 10000)

        test("should block access when user role is not merchant", async () => {
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
                .delete(`/products/${lastProduct._id}`)
                .set("Authorization", `Bearer ${auth.body.token}`)
                .send()
            console.log(response.statusCode)
            await expect(response.statusCode).toBe(403)
        }, 10000)
    })
})
