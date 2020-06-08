const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

describe("Proxy", () => {
  it("calling /shelly1/* should send req. to shelly1", () => {
    return fetch("http://localhost:3000/shelly1/settings?foo=bar")
      .then((res) => res.json())
      .then((json) =>
        expect(json).toEqual({
          name: "shelly1",
          msg: "got request",
          req: "/settings?foo=bar",
        })
      );
  });

  it("calling /shelly2/* should send req. to shelly2", () => {
    return fetch("http://localhost:3000/shelly2/settings?foo=bar")
      .then((res) => res.json())
      .then((json) =>
        expect(json).toEqual({
          name: "shelly2",
          msg: "got request",
          req: "/settings?foo=bar",
        })
      );
  });

  describe("Dynamically adding new route", () => {
    let originalRoutes;
    beforeAll(() => {
      originalRoutes = JSON.parse(
        fs.readFileSync(path.join(__dirname, "routes.json"), {
          encoding: "utf-8",
        })
      );
    });

    afterAll(() => {
      fs.writeFileSync(
        path.join(__dirname, "routes.json"),
        JSON.stringify(originalRoutes, null, 4),
        "utf-8"
      );
    });

    it("should route to correct shelly server", async () => {
      const routes = JSON.parse(
        fs.readFileSync(path.join(__dirname, "routes.json"))
      );
      routes.routes.push({
        name: "shelly3",
        baseUrl: "http://localhost:3038",
      });

      fs.writeFileSync(
        path.join(__dirname, "routes.json"),
        JSON.stringify(routes),
        "utf-8"
      );

      await fetch("http://localhost:3000/config/reload");

      return fetch("http://localhost:3000/shelly3/settings?foo=bar")
        .then((res) => res.json())
        .then((json) =>
          expect(json).toEqual({
            name: "shelly3",
            msg: "got request",
            req: "/settings?foo=bar",
          })
        );
    });
  });
});
