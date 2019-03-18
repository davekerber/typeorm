import {Connection} from "../../../src";
import {closeTestingConnections, createTestingConnections, reloadTestingDatabases} from "../../../test/utils/test-utils";
import {User} from "./entity/User";

describe("github issues > #2005", () => {

    let connections: Connection[];
    beforeAll(async () => connections = await createTestingConnections({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["sqlite"]
    }));
    beforeEach(() => reloadTestingDatabases(connections));
    afterAll(() => closeTestingConnections(connections));

    test("should be able to find by boolean find", () => Promise.all(connections.map(async connection => {
        const user = new User();
        user.activated = true;
        await connection.manager.save(user);
        expect(user.activated).toEqual(true);
    })));

});