const request = require("supertest");

const server = require("./server.js");
const db = require("../data/dbConfig.js");

describe('server', () => {
    // empty table and reset primary key back to 1
    beforeEach(async () => {
        await db('resources').truncate();
    })
    // testing using return as testing is synchronous 
    // but server runs asynchronously
    describe('GET', () => {
        it('should return 200 OK', () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.status).toBe(200);
                })
        });

        // testing using async/await 
        it('should return 200 OK using async/await', async () => {
            const res = await request(server).get('/')
            expect(res.status).toBe(200);
        });

        // testing with Jest
        it('should return 200 OK with jest', done => {
            request(server).get('/')
                .then(res => {
                    expect(res.status).toBe(200);
                    done();
                })
        });

        // testing without  Jest
        it('should return 200 OK without jest', () => {
            return request(server).get('/').expect(200);
        });
        
        // test('the fetch fails with an error', () => {
        // expect.assertions(1);👈
        // return fetchData().catch(e => expect(e).toMatch('error'));
        // });
        // .resolves / .rejects / expect.assertions(1);
        // it('should return 200 OK without jest', () => {     ✅
        //     return request(server).get('/').expect(200).resolves.toBe([]);
        // });

        // check that the / endpoint returns an `api` property in the body
        // and that the value of that property is `running...`

        // using supertest's .expect()
        it("Should return api: running...", () => {
            return request(server).get('/').expect({ api: 'running...' })
        });
        // using jest's expect()
        it("Should return an api property with the value of ...running", () => {
            return request(server).get('/')
                .then(res => {
                    expect(res.body.api).toBe('running...')
                })
        });

        it("should respond with JSON", async () => {
            const res = await request(server).get("/");

            expect(res.type).toMatch(/json/i);
        });
    });

    describe("POST /resources", () => {
        // beforeEach(async () => {
        //     await db('Resources').truncate();
        // })
        it("should add resources", async () => {
            // truncate the table to make sure it's empty
            // happens in the beforeEach() global

            // make request, send data
            await request(server).post("/resources").send({
                name: "library",
            });

            // check the resource is in the database (without using the GET / route)
            const resources = await db("resources");
            console.log(resources);
            expect(resources).toHaveLength(1);
        });
    });

    // describe("POST /resources", () => {
    //     it("should respond with json",  async() => {
    //         const res = await  request(server).post("/resources").send({
    //             name: "Library" })

    //         expect(res.type).toMatch(/json/i);
    //     });
    // })
});

describe('GET/resource', () => {
    it('should return a resource', async() => {
        const res = await request(server).get('/resources/1')
        console.log(res.body);
        expect(res.body).toEqual({id: 1, name: "library"});
    });
});

describe('DELETE/resource', () => {
    it('should delete a resource', async() => {
        const res = await request(server).delete('/resources/1')
        console.log(res.body);
        expect(res.body).toEqual({"msg": "resource is deleted"});
    });
});

describe('DELETE/resource', () => {
    it("should add resources", async () => {
        // truncate the table to make sure it's empty
        // happens in the beforeEach() global

        // make request, send data
        await request(server).post("/resources").send({
            name: "Framework",
        });

        // check the resource is in the database (without using the GET / route)
        const resources = await db("resources");
        console.log(resources);
        expect(resources).toHaveLength(1);
    });

    it('should delete a resource', async() => {
        const res = await request(server).delete('/resources/1')
        // console.log(res.body);
        expect(res.body).toEqual({"msg": "resource is deleted"});
        const resources = await db("resources");
        expect(resources).toHaveLength(0);
    });
});

