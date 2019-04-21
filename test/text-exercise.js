"use strict";
require("dotenv").config();
const mongoose = require("mongoose");
const { Exercise } = require("../exercise/models");
const jwt = require("jsonwebtoken");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.should();
const config = require("../config");
const { app, runServer, closeServer } = require("../server");
const { TEST_DATABASE_URL } = require("../config");
const testData = require("../testdb/exercise");
chai.use(chaiHttp);

function tearDownDb() {
  console.warn("Deleting database!");
  return mongoose.connection.db.dropDatabase();
}

function tearDownDb() {
  console.warn("Deleting database!");
  return mongoose.connection.db.dropDatabase();
}
const createAuthToken = user => {
  return jwt.sign({ user }, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: "HS256"
  });
};

const testing_user = {
  username: "testing",
  password: "1234567890",
  id: "5ae64682847aa30637797c96"
};
const user_token = createAuthToken(testing_user);
describe("Exercise", function() {
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });
  beforeEach(function() {
    return Exercise.insertMany(testData);
  });
  afterEach(function() {
    return tearDownDb();
  });
  after(function() {
    return closeServer();
  });

  describe("get endpoint", function() {
    it("should return all exercises", function() {
      let res;
      return chai
        .request(app)
        .get("/exercise/")
        .set("Authorization", "Bearer ${user_token}")
        .then(function(_res) {
          res = _res;
          expect(res).to.be.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a("array");
          expect(res.body).to.have.lengthOf.at.least(1);
        });
    });
});

    describe("DELETE endpoint", function() {
      it("should delete exercise event", function() {
        let log;
        return Exercise.findOne()
          .then(function(_log) {
            log = _log;
            return chai
              .request(app)
              .delete(`/exercise/delete/${log.id}`)
              .set("Authorization", `Bearer ${user_token}`);
          })
          .then(function(res) {
            expect(res).to.have.status(204);
            return Exercise.findById(log.id);
          })
          .then(function(_log) {
            expect(_log).to.be.null;
          });
      });
    });

    describe('PUT endpoint', function() {
        it('should update the fields you send over', function() {
            const toUpdate = {
                title: 'Running',
                time: '40 mins'
            }

        return Exercise
            .findOne()
            .then(post => {
                toUpdate._id = post.id;
        
        return chai.request(app)
            .put(`/exercise/edit/${post.id}`)
            .set('Authorization', `Bearer ${ user_token }`)
            .send(toUpdate);
        })
        .then(res => {
            expect(res).to.have.status(204);
            return Exercise.findById(toUpdate._id);
        }) 

    // we retrieve the update post from db and prove the post in db is equal to the updated values we sent over   
        .then(post => {
            expect(toUpdate.details).to.equal(post.details);
            expect(toUpdate.location).to.equal(post.location);
        });
        });
    });

    describe('POST endpoint', function() {
        it('should add a new House post', function() {
            
        const newPost = {
            "_id" : "5afb2a4975ea22988c67541r",
            "strengthExercise" : [],
            "title" : "Zumba",
            "time" : "20-minutes",
            "creator" : "5ae64682847aa30637797c96",
            "start" : "2018-05-12T04:00:00.000Z",
            "end" : "2018-05-12T04:00:00.000Z",
            "__v" : 0
        }

        return chai.request(app)
            .post('/exercise/add/exercise')
            .set('Authorization', 'Bearer ${user_token}')
            .send(newPost)
            .then(function(res) {
                console.log(res.text);
                expect(res).to.be.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                console.log(res.body);
               return Exercise.findById(res.body._id);
              
            });   
        });
    });


  });

