// 1. Set correct IPv4 address on .env
      // a. To find IPv4 address: click on Start Menu, type cmd, press enter, type
      //    'ipconfig /all', press enter, and look for row data labelled IPv4 address
// 2. Log onto SQL server using MySQL Workbench
// 3. Use mocha to run tests

import request from 'supertest'
import app from '../app.js'
import chai from 'chai'
const expect = chai.expect;

describe('HTTP Server', function () {

  describe('GET /events', function () {
    it('should return status code 200 - OK', async () => {
      const response = await request(app).get("/events");
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.be.an('array');
    });
  });

  describe('DELETE /events/:id', function () {
    it('should return status code 204 - No Content', async () => {
      const response = await request(app).delete("/events/4");
      expect(response.statusCode).to.equal(204);
    });
  });

  describe('POST /events', function () {
      it('should return status code 201 - Created', async () => {
        const response = await request(app).post("/events").send({
          date: "2023-06-12",
          title: "Testing 1 2 3"
        });
        expect(response.statusCode).to.equal(201);
      });
  });

  describe('PUT /events/:id', function () {
    it('should return status code 200 - OK', async () => {
      const response = await request(app).put("/events/5").send({
        "id": 80,
        "title": "Put test",
        "date": "2023-11-25"
      });
      expect(response.statusCode).to.equal(200);
    });
  });

  describe('PATCH /events/:id', function () {
    it('should return status code 200 - OK', async () => {
      const response = await request(app).patch("/events/5").send({
        "title": "Patch testing again or again dog"
      });
      expect(response.statusCode).to.equal(200);
    });
  });

  describe('GET /stats', function () {
    it('should return status code 200 - OK', async () => {
      const response = await request(app).get("/events");
      expect(response.statusCode).to.equal(200);
    });
  });
});
