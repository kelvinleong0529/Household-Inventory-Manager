import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server.js";

// Assertion style
const should = chai.should();

chai.use(chaiHttp);

describe("GET /", () => {
  it("it should GET all the users", (done) => {
    chai
      .request(server)
      .get("/api/users")
      .end((error, response) => {
        response.should.have.status(200);
        response.headers["content-type"].should.contains("application/json");
        done();
      });
  });

  it("it should not GET all the users", (done) => {
    chai
      .request(server)
      .get("/api/user") // invalid resource URL
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
  });
});

describe("GET /:id", () => {
  it("it should GET a user by Id", (done) => {
    const userId = 1;
    chai
      .request(server)
      .get("/api/users/" + userId)
      .end((error, response) => {
        response.should.have.status(200);
        response.headers["content-type"].should.contains("application/json");
        done();
      });
  });
});
