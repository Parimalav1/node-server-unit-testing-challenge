
const db = require("../data/dbConfig.js");
const Resources = require("./resourceModel.js");

describe("resourcesModel", () => {
    beforeEach(async () => {
        // empty table and reset primary key back to 1
        await db("resources").truncate();
    });

    describe("insert()", () => {
        it("should add resources", async () => {
            // truncate the table to make sure it's empty
            // happens in the beforeEach() global

            // make request, send data
            await Resources.insert({
                name: "Library",
            });

            // check the hobbit is in the database (without using the GET / route)
            const resources = await db("resources");

            expect(resources).toHaveLength(1);
        });
    });
});
