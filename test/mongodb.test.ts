import { MongoDBConnection, mongoUrl } from "../src/mongodb";

describe("Test MongoDB URL", () => {
  test("Format conn string", () => {
    const tests: [MongoDBConnection, string][] = [
      [{ username: "user" }, "mongodb://user:password@localhost:27017"],
      [
        { username: "user", password: "some_secret" },
        "mongodb://user:some_secret@localhost:27017",
      ],
      [{ port: 27077 }, "mongodb://root:password@localhost:27077"],
    ];

    tests.forEach((test) => {
      const [conn, expected] = test;
      expect(mongoUrl(conn)).toEqual(expected);
    });
  });
});
