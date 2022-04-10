import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server.js";

// Assertion style
const should = chai.should();

chai.use(chaiHttp);

describe("GET /api/users", () => {
  it("it should GET all the users", (done) => {
    chai
      .request(server)
      .get("/api/users")
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.a("array");
        done();
      });
  });

  it("it should not GET all the users because of wrong resource URL", (done) => {
    chai
      .request(server)
      .get("/api/user")
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
  });
});

describe("GET /api/users/:id", () => {
  it("it should GET a user by Id", (done) => {
    const userId = 1;
    chai
      .request(server)
      .get("/api/users/" + userId)
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("userid");
        response.body.should.have.property("firstname");
        response.body.should.have.property("lastname");
        response.body.should.have.property("age");
        done();
      });
  });

  it("it should not GET a user by of wrong userId", (done) => {
    const userId = -1;
    chai
      .request(server)
      .get("/api/users/" + userId)
      .end((error, response) => {
        response.should.have.status(404);
        response.text.should.be.eq("Invalid userId!!");
        done();
      });
  });
});
