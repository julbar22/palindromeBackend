
const request = require("supertest");
const app = require("../index");
const expect = require("chai").expect;

describe("GET /iecho", function () {
  it("without word", async function () {
    const response = await request(app).get("/iecho");

    expect(response.status).to.eql(400);
    expect(response.body).to.have.key('error');
    expect(response.body.error).to.eq('no text');
  });

  it("word test", async function () {
    const response = await request(app).get("/iecho?text=test");

    expect(response.status).to.eql(200);
    expect(response.body).to.contain.key('text');
    expect(response.body.text).to.eq('tset');
    expect(response.body.palindrome).to.eq(false);
  });

  it("word Anana", async function () {
    const response = await request(app).get("/iecho?text=Anana");

    expect(response.status).to.eql(200);
    expect(response.body).to.contain.key('text');
    expect(response.body.text).to.eq('anana');
    expect(response.body.palindrome).to.eq(true);
  });

  it("word anita lava la tina", async function () {
    const response = await request(app).get("/iecho?text=anita lava la tina");

    expect(response.status).to.eql(200);
    expect(response.body).to.contain.key('text');
    expect(response.body.text).to.eq('anitalavalatina');
    expect(response.body.palindrome).to.eq(true);
  });

  it("word Odiosa, ¿has oído?", async function () {
    const response = await request(app).get("/iecho?text=Odiosa, ¿has oído?");

    expect(response.status).to.eql(200);
    expect(response.body).to.contain.key('text');
    expect(response.body.text).to.eq('odiosahasoido');
    expect(response.body.palindrome).to.eq(true);
  });
});