function uuid() {
  var uuid = "", i, random;
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;

    if (i == 8 || i == 12 || i == 16 || i == 20) {
      uuid += "-"
    }
    uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
}



function StorageException(message) {
   this.message = message;
   this.name = "StorageException";
}




const JournalEntries = {

	create: function(callback, title, travelDate, coverPhoto, description, memories,
		words, morePhotos) {
    // entry.id = uuid();
      const entry = {
       id: uuid(),
       title,
       travelDate,
       coverPhoto,
       description,
       memories,
       words,
       morePhotos
	}; 
	 this.entries.push(entry);
	 callback(entry);
},

get:  function(callback, id=null) {
//if id passed in, retrieve a single entry
// otherwise send all entries
if( id !== null) {
	callback(this.entries.find(entry => entry.id === id));
}
else {const sortedEntries = this.entries.sort(function(a,b) {
	return b.travelDate - a.travelDate;
});
callback(sortedEntries);
}},

delete: function(callback, id) {
	const entryIndex = this.entries.findIndex(
		entry => entry.id === id);
	if (entryIndex > -1) {
		this.entries.splice(entryIndex, 1);
	}
	callback();
},


update: function(callback, newEntry) {  
	const {id} = newEntry;
	const index = this.entries.findIndex(function(item) {
		return item.id === newEntry.id;
	});
if (index === -1) {
	throw new StorageException(`Can't update item ${id}  because it doesn't exist`);
}
this.entries[index] = Object.assign(
	this.entries[index], newEntry);
callback ();
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
	else {callback(null)};
}


const journalEntriesStorage = createJournalEntryModel();

for (let i=1; i <= 5; i++) {
	let morePhotos = [];
	const count = Math.floor(Math.random() * 6);
	for (let i=1; i<= count; i++) {
		morePhotos.push(faker.image.imageUrl())
	}

journalEntriesStorage.create(function(){},faker.address.country(), `${faker.date.month()}, 2017`, faker.image.imageUrl(), faker.lorem.paragraph(), faker.lorem.sentence(), 
    faker.lorem.words(), morePhotos);
};

