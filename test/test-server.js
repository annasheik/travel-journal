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

})

describe('Journal Entries', function() {
	before(function() {
		return runServer();
	});
	after(function() {
		return closeServer();
	});
	//GET TEST
	//1. Make GET req to '/journal-entries'
	//2. Inspect res obj to have status 200 and correct keys
	it('should list journal-entries on GET', function() {
		return chai.request(app)
		.get('/journal-entries')
		.then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body).to.be.a('array');
			expect(res.body.length).to.be.at.least(1);
			const expectedKeys = ['id', 'title', 'travelDate', 'coverPhoto', 'description', 'memories', 'words', 'morePhotos'];
			//leaving out 'words' and 'more photos': not required
			res.body.forEach(function(item) {
				expect(item).to.be.a('object');
				expect(item).to.include.keys(expectedKeys);
			});
		}); 
	});

	// GET by id
	// 1. Make a GET req to '/journal-entries/:id'
	// 2. Inspect the res to have correct keys and res status
	/* it ('should return joutnal entry by id on GET', function() {
		return chai.request(app)
		.get('/journal-entries/:id')
		.then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.json;

			const myEntry 
		})
	}) */

	//POST request
	//1. Make POST req with a data for a new journal entry
	//2. Inspect res obj to have status 201 and id
	it('should create new journal entry on POST', function() {
		const testEntry = {title: 'test', travelDate: '2018', coverPhoto: 'url', description:
		'test test test', memories: 'test memories', words: 'test words', morePhotos: ['url1']};
		return chai.request(app)
		.post('/journal-entries')
		.send(testEntry)
		.then(function(res) {
			expect(res).to.have.status(201);
			expect(res).to.be.json;
			expect(res.body).to.be.a('object');
			expect(res.body.id).to.not.equal(null);
			expect(res.body).to.deep.equal(Object.assign(testEntry, {id: res.body.id, 
				title: res.body.title, travelDate: res.body.travelDate, description:
				res.body.description, memories: res.body.memories, words: res.body.words,
				morePhotos: res.body.morePhotos}));
		});
	});

	//PUT request
	//1. Create some test entry without id
	//2. Make GET req so we can get an item by id
	//3. Add that id to test entry
	//4. Make PUT req with test entry
	//5. Inspect the res to have status 204
	it('should update journal entry on PUT', function() {
		const testEntry2 = {title: 'test2', travelDate: '2018', coverPhoto: 'url', description:
		'test test test', memories: 'test memories', words: 'test words', morePhotos: ['url1']};
		return chai.request(app)
		.get('/journal-entries')
		.then(function(res) {
			testEntry2.id = res.body[0].id;
			return chai.request(app)
			.put(`/journal-entries/${testEntry2.id}`)
			.send(testEntry2);
		})
		.then(function(res) {
			expect(res).to.have.status(204);
		})	
	})

	// DELETE request
	//1. Make GET req so we can get 1 entry id to delete
	//2. send DELETE req and make sure we get back status 204
	it('should delete journal entry on DELETE', function() {
		return chai.request(app)
		.get('/journal-entries')
		.then(function(res) {
			return chai.request(app)
			.delete(`/journal-entries/${res.body[0].id}`)
		}) 
		.then(function(res) {
			expect(res).to.have.status(204)
		})
	})
})









