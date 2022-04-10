import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server.js";

process.env.NODE_ENV = "test";

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

  it("it should not GET a user because of wrong userId", (done) => {
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

const PostErrorText = `Please ensure the following requiurements are met:
1. FirstName, LastName & Age must be PRESENT
2. FirstName's length must be smaller than 255
3. LastName's length must be smaller than 255
4. Age must be an INTEGER and greater than 0`;

describe("POST /api/users/", () => {
  it("it should POST a user", (done) => {
    const user = {
      firstName: "Testing",
      lastName: "User",
      age: 15,
    };
    chai
      .request(server)
      .post("/api/users")
      .send(user)
      .end((error, response) => {
        response.should.have.status(201);
        response.text.should.be.eq(
          `User with the name ${user.firstName} has been added to the database!`
        );
        done();
      });
  });

  it("it should not POST a user because wihtout complete info submission", (done) => {
    const user = {
      lastName: "User",
      age: 15,
    };
    chai
      .request(server)
      .post("/api/users")
      .send(user)
      .end((error, response) => {
        response.should.have.status(400);
        response.text.should.be.eq(PostErrorText);
        done();
      });
  });

  it("it should not POST a user because firstName's length is greater than 255", (done) => {
    const user = {
      firstName:
        "verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_",
      lastName: "User",
      age: 15,
    };
    chai
      .request(server)
      .post("/api/users")
      .send(user)
      .end((error, response) => {
        response.should.have.status(400);
        response.text.should.be.eq(PostErrorText);
        done();
      });
  });

  it("it should not POST a user because lastName's length is greater than 255", (done) => {
    const user = {
      firstName: "Testing",
      lastName:
        "verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_verylongstring_",
      age: 15,
    };
    chai
      .request(server)
      .post("/api/users")
      .send(user)
      .end((error, response) => {
        response.should.have.status(400);
        response.text.should.be.eq(PostErrorText);
        done();
      });
  });

  it("it should not POST a user because of Age is not integer", (done) => {
    const user = {
      firstName: "Testing",
      lastName: "User",
      age: "abc",
    };
    chai
      .request(server)
      .post("/api/users")
      .send(user)
      .end((error, response) => {
        response.should.have.status(400);
        response.text.should.be.eq(PostErrorText);
        done();
      });
  });

  it("it should not POST a user because of Age is not greater than 0", (done) => {
    const user = {
      firstName: "Testing",
      lastName: "User",
      age: -1,
    };
    chai
      .request(server)
      .post("/api/users")
      .send(user)
      .end((error, response) => {
        response.should.have.status(400);
        response.text.should.be.eq(PostErrorText);
        done();
      });
  });
});
