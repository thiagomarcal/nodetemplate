/* jshint expr:true */

'use strict';

const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const response = require('./response.json');
const axios = require('axios');
const config = require('../../config/settings.json');

describe('Users test', () => {

    // Mockando requisicao com Nock
    beforeEach(()=>{
       nock(config.server_url).get('/users/heavybear638').reply(200, response.user);
       nock(config.server_url).get('/users').reply(200, response.users);
    });

    it('Get a user by username', (done) => {
        axios.get(`${config.server_url}/users/heavybear638`)
            .then(res => res.data).catch(error => console.log(error))
            .then((response) => {
                expect(typeof response).to.equal('object');
                expect(response.gender).to.equal('male');
                expect(response.login.username).to.equal('heavybear638');
            })
            .then(done, done);
    });

    it('Get a users list', (done) => {
        axios.get(`${config.server_url}/users`)
            .then(res => res.data).catch(error => console.log(error))
            .then((response) => {
                expect(response).to.be.a('array');
                expect(response.length).to.equal(3);

            })
            .then(done, done);
    });


});

