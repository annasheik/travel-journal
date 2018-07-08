'use strict';
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);


const {app, runServer, closeServer} = require('../server');

describe('static routes', function() {

	before(function () {
    return runServer();
  });

	after(function() {
		return closeServer();
	});

	it('should get index.html', function() {
		return chai.request(app)
		.get('/')
		.then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.html;
		})
	})

	it('should get login.html', function() {
		return chai.request(app)
		.get('/login.html')
		.then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.html;
		})
	})

	it('should get signup.html', function() {
		return chai.request(app)
		.get('/signup.html')
		.then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.html;
		})
	})

	it('should get user-dashboard.html', function() {
		return chai.request(app)
		.get('/user-dashboard.html')
		.then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.html;
		})
	})

	it('should get add-edit-entry.html', function() {
		return chai.request(app)
		.get('/add-edit-entry.html')
		.then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.html;
		})
	})
})








