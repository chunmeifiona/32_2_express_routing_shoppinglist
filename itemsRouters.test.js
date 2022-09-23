process.env.NODE_ENV = 'test';
const request = require('supertest');

const app = require('./app');
let items = require('./fakeDb');

let popsicle = {
    "name": "popsicle",
    "price": 1.45
};

beforeEach(function () {
    items.push(popsicle);
});

afterEach(function () {
    items.lengh = 0;
})

describe('GET /items', () => {
    test("Get all items", async () => {
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ items: [popsicle] })
    })
})

describe('GET /items/:name', () => {
    test("Get item by name", async () => {
        const res = await request(app).get(`/items/${popsicle.name}`);
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ foundItem: popsicle })
    })

    test("Responds with 404 for invalid item", async () => {
        const res = await request(app).get('/items/invaliditem');
        expect(res.statusCode).toBe(404)
    })
})

describe('POST /items', () => {
    test("Post an item", async () => {
        const cheerios = { "name": "cheerios", "price": "3.40" };
        const res = await request(app).post(`/items`).send(cheerios);
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({ added: cheerios })
    })

    test("Responds with 404 for invalid item", async () => {
        const res = await request(app).post(`/items`).send({});
        expect(res.statusCode).toBe(400)
    })
})

describe('PATCH /items/:name', () => {
    test("PATCH item by name", async () => {
        let newpopsicle = { "name": "popsicle-new", "price": 2.45 };
        const res = await request(app).patch(`/items/${popsicle.name}`).send(newpopsicle);
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ updated: popsicle })
    })

    test("Responds with 404 for invalid item", async () => {
        const res = await request(app).patch(`/items/invaliditem`).send(popsicle);
        expect(res.statusCode).toBe(404)
    })
})

describe('DELETE /items/:name', () => {
    test("Delete item by name", async () => {
        const res = await request(app).delete(`/items/${popsicle.name}`);
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ message: "Deleted" })
    })

    test("Responds with 404 for invalid item", async () => {
        const res = await request(app).delete('/items/invaliditem');
        expect(res.statusCode).toBe(404)
    })
})