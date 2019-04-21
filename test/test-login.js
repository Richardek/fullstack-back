'use strict';

const mongoose = require('mongoose');
const {User} = require('../users/models');

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should();

const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);
describe('Auth endpoints', function(){
    const username = 'exampleUser@test.com';
    const password = 'examplePass';
    const firstName = "Fake First";
    const lastName = "Fake Last";
    before(function(){
        return runServer(TEST_DATABASE_URL);
    });
    after(function(){
        return closeServer();

    });
    beforeEach(function(){
        return User.hashPassword(password).then(password =>
        User.create({
            username, 
            password,
            firstName,
            lastName
        }));
    });
    afterEach(function(){
        return User.remove({});
    });
    describe('/auth/login', function(){
        it('should return valid auth token', function(){
            return chai.request(app)
            .post('/auth/login')
            .send({username, password})
            .then(res =>{
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                const token = res.body.authToken;
                expect(token).to.be.a('string');
             });
        });
        //
    });
});