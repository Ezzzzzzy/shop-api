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
        })

        test("should return 401 when authorization header is not provided", async () => {
            const response = await request(app)
                .get("/products")
                .send()
            console.log(response.statusCode)
            await expect(response.statusCode).toBe(401)
        })
    })
})

describe("POST /products", () => {
    describe("Get all products", () => {
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
        })

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
        })

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
        })
    })
})
