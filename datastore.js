const uuid = require('uuid');


let entries = [];

function createEntry(title, coverPhoto, description, memories, words, morePhotos, callback) {

	const myEntry = {
       id: uuid(),
       title,
       coverPhoto,
       description,
       memories,
       words,
       morePhotos
	}
	entries.push(myEntry);
	callback(myEnt\
		ry);
};

function getEntries(callback) {
	callback(entries);
}

function getEntry(id, callback) {
	const entry = entries.find(function(item) {
		return item.id === id;
	});
	callback(entry);
}

function deleteEntry(id, callback) {
	const filteredArray = entries.filter(function(item) {
		return item.id !== id;
	});

	entries = filteredArray;
	callback();
}


function updateEntry (id, newEntry, callback) {  
	const index = entries.findIndex(function(item) {
		return item.id === id;
	});
	newEntry.id = id;
	entries[index] = newEntry;
	callback(newEntry);

}


for (let i=1; i<= 5; i++) {
	createEntry(faker.lorem.words(), faker.image.imageUrl(), faker.lorem.paragraph(),faker.lorem.sentence(), 
		faker.lorem.words(), [faker.image.imageUrl()]);
}

let user = null;
let loggedIn = false;

function signUp(username, password, callback) {
	user = {
		username,
		password
	};
	callback();
}

function login(username, password, callback) {
	
	if (user && username===user.username && user.password===password) {
		callback(user);
	}
	else { callback(null)};
}


