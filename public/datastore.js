
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
	callback(myEntry);
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
function signUp(username, password, callback) {
	user = {
		username,
		password
	};
	callback();
}

function login(username, password, callback) {
	user = {
		username,
		password
	}
	callback();
}


