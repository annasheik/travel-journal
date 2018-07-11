const uuid = require('uuid');
const faker = require('faker');


function StorageException(message) {
   this.message = message;
   this.name = "StorageException";
}


const JournalEntries = {

	create: function(title, travelDate, coverPhoto, description, memories, words, morePhotos) {

	const entry = {
       id: uuid(),
       title,
       travelDate,
       coverPhoto,
       description,
       memories,
       words,
       morePhotos
	}
	this.entries.push(entry);
	return entry;
},

get:  function(id=null) {
//if id passed in, retrieve a single entry
// otherwise send all entries
if( id !== null) {
	return this.entries.find(entry => entry.id === id);
}
return this.entries.sort(function(a,b) {
	return b.travelDate - a.travelDate;
});
},

delete: function(id) {
	const entryIndex = this.entries.findIndex(
		entry => entry.id === id);
	if (entryIndex > -1) {
		this.entries.splice(entryIndex, 1);
	}
},


update: function(newEntry) {  
	const {id} = newEntry;
	const index = this.entries.findIndex(function(item) {
		return item.id === newEntry.id;
	});
if (index === -1) {
	throw new StorageException(`Can't update item ${id}  because it doesn't exist`);
}
this.entries[index] = Object.assign(
	this.entries[index], newEntry);
return this.entries[index];
}
};

function createJournalEntryModel() {
	const storage = Object.create(JournalEntries);
	storage.entries = [];
	return storage;
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

module.exports = {JournalEntries: createJournalEntryModel()};

