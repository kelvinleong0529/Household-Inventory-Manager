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
      .get("/") // pass the resource URL here
      .end((error, response) => {
        // put the expectation  and assertion here
        response.should.have.status(200);
        // response.body.should.be.a("array");
        response.body.length.should.be.eq(3);
        done();
      });
  });
});
