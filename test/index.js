const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../app");

chai.use(chaiHttp);

describe("API testing", () => {
  it("get method", (done) => {
    chai
      .request(app)
      .get("/api/v1/contact")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.be.an("object");
        done();
      });
  });

  it("get by id method", (done) => {
    chai
      .request(app)
      .get("/api/v1/contact/2")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.be.an("object");
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.have.all.keys(
          "id",
          "name",
          "phone",
          "avatar",
          "createdAt",
          "updatedAt"
        );
        done();
      });
  });

  it("put method", (done) => {
    chai
      .request(app)
      .put("/api/v1/contact/2")
      .send({ name: "Dani", phone: "05932389049" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message");
        done();
      });
  });
});
