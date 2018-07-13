'use strict';
// LOGIN PAGE
function renderLoginPage() {
	return `
		<section class="login-screen">
			<form role="form" class="login">
				<fieldset name="login-info">
					<div class="login-header">
						<legend>Log In</legend>
				    </div>
					<label for="email" required>Email</label>
					<input type="email" name="email" id="email" placeholder="Email address" required="">
					<label for="password" required>Password</label>
					<input type="password" name="password" id="password" placeholder="Password" required>
				</fieldset>
				<button type="submit" class="js-login-button">Login</button>
				<p>Don't have an account? <a href="" class ="nav-signup">Sign up</a></p>
			</form>
		</section> `
}

function displayLoginPage() {
	const loginPage = renderLoginPage();
	$('#main-page').html(loginPage);
	$('.landing-page').prop('hidden', true);
}

function handleLoginButton () {
	$('.main-area').on('click', '.nav-login', function(event) {
		console.log('Login button clicked');
		event.preventDefault();      
		displayLoginPage();
	})
}




// SIGNUP PAGE

function renderSignupPage() {
	return `
	<section class="signup-page-screen">
			<form role="form" class="signup">
				<fieldset name="signup-info">
					<div class="login-header">
						<legend>Sign Up</legend>
				    </div>
					<label for="email" required>Email</label>
					<input type="email" name="email" id="email" placeholder="Email address" required="">
					<label for="password" required>Password</label>
					<input type="password" name="password" id="password" placeholder="Password" required>
					<label for="password-confirm" required>Confirm password</label>
					<input type="password" name="password" id="password-confirm" placeholder="Confirm password" required >
				</fieldset>
				<button type="submit" class="js-signup-button">Sign up</button>
				<p>Already have an account? <a href="" class="nav-login">Log in</p></a>
			</form>
		</section>
	`
}

function displaySignupPage() {
	const signupPage = renderSignupPage();
	$('.landing-page').prop('hidden', true);
	$('#main-page').html(signupPage);
}

function handleSignUpButton() {
	$('.main-area').on('click','.nav-signup', function(event) {
		console.log('SignUp button clicked');
		event.preventDefault();
		displaySignupPage();

	});
}


function handleSignUpSuccess() {
	$('.main-area').on('submit', '.signup', function(event) {
		console.log('SignUp Success');
		event.preventDefault();
		const username = $('#email').val();
		const password = $('#password').val();
		signUp(username, password, displayLoginPage);
	})

}


// USER DASHBOARD PAGE
function renderUserDashboard(journalEntries) {
	return `
	<div class="nav-bar">
		<div class="nav-1">
			<div class="nav-link"><a href="" class='my-journal-button'>My Journal</a></div>
			<div class="nav-link"><a href="" class="js-edit-entry plus">&#43;</a></div>
			<div class="nav-link"><a href="">Log out</a></div>
		</div>
	</div>
	
	<main role="main" class="user-dashboard">
		<div class="dashboard-header">
			<h2>My trips</h2>
		</div>
		<section class="trip-entries">
			<h4>Let the journey begin!</h4>

			<div class="entry"><a href=""class="js-edit-entry">${journalEntries.length>0 ? "Add a trip": "Add my first trip"}</a></div>
			<ul>
			${journalEntries ? journalEntries.map(function(entry) {
      		 return ` <li><h5 class="entry-title"><a data-entryid="${entry.id}">${entry.title}</a></h5>
      		 <p class="entry-date">${entry.travelDate}</p>
      		 <div class="entry-list"><img class="main-entry-photo" src="${entry.coverPhoto}"></div>

      		 </li>`
			}).join('\n') : ""}
			</ul>
		</section>	
	`
}

function displayUserDashboard(journalEntries) {
	const userDashboard = renderUserDashboard(journalEntries);
	$('.landing-page').prop('hidden', true);
	$('.main-nav-bar').prop('hidden', true);
	$('.main-area').html(userDashboard);
}

function getUserDashboard() {
    journalEntriesStorage.get(displayUserDashboard);

}

function handleLoginSuccess() {
	$('.main-area').on('submit', '.login', function(event) { 
		console.log('Login Success');
		event.preventDefault();
		const username = $('#email').val();
		const password = $('#password').val();
		login(username, password, getUserDashboard);
	});
}


// MY JOURNAL
function handleMyJournalButton() {
	$('.main-area').on('click', '.my-journal-button', function(event) {
		console.log('My Journal button clicked');
		event.preventDefault();
		$('.landing-page').prop('hidden', true);
		getUserDashboard();
		
	});
}


// ADD or EDIT ENTRY

function renderAddEditEntry (entry=null) {
	return `
		<div class="nav-bar">
		<div class="nav-1">
			<div class="nav-link"><a href="" class="my-journal-button">My Journal</a></div>
			<div class="nav-link"><a href="" class="js-edit-entry plus">&#43;</a></div>
			<div class="nav-link"><a href="">Log Out</a></div>
		</div>
	</div>
	
	<main role="main" class="edit-journal-entry">
		<div class="dashboard-header">
			<h2>Edit My Journal</h2>
		</div>
		<form class='create-entry'>
		<div class="save-delete">
			<button class="save" id="js-save-button">Save</button>
			<button class="cancel" id="js-cancel-button">Cancel</button>
		</div>
		<section class="edit-entry">
			<div class="entry-title">
				<input type="text" name="journal-title" id="journal-title" placeholder="Name your trip here" maxlength="70" type="text" 
				${entry ? `value="${entry.title}"` : ""}>
			</div>
			<div class="entry-date">
				<input type="text" name="travel-date" id="travel-date" placeholder="Enter the date of trip"
				${entry ? `value="${entry.travelDate}"` : ""}>
			</div>
			<div class="entry-photo"><a href="">Add a cover photo</a></div>
			<div class="entry-description">
				<input type="text" name="entry-description" id="journal-description" 
				placeholder="Add description of your trip here..." ${entry ? `value="${entry.description}"` : ""}>
			</div>
			<div class="best-memory">
				<h5>Best memory</h5>
				<input type="text" name="best-memory" id="entry-best-memory" placeholder="Share your best memory of the trip..." 
				${entry ? `value="${entry.memories}"` : ""}>
			</div>
			<div class="foreign-words">
				<h5>Foreign words to remember</h5>
				<input type="text" name="foreign-words" id="entry-foreign-words" placeholder="Keep the new foreign words learned here..." 
				${entry ? `value="${entry.words}"` : ""}>
			</div>
			<div class="more-photos">
				<p>Add more photos here</p>>
				<input type="file" name="pic" accept="image/*">
				<input type="submit">
			</div>
		</section>
		</form>	
	</main>
	`
}

function displayAddEditEntry(entry=null) {
	console.log(entry)
	const entryEditor = renderAddEditEntry(entry);
	$('.landing-page').prop('hidden', true);
	$('.main-nav-bar').prop('hidden', true);
	$('.main-area').html(entryEditor);
}

function handleAddEditButtons() {
	$('.main-area').on('click', '.js-edit-entry', function(event) {
		console.log('Add entry clicked');
		
		displayAddEditEntry();
	})
}

function handleEditButton() {
	$('.main-area').on('click', '#js-edit-button', function(event) {
		console.log('Edit button clicked')
		const id = $(this).data("entryid");
		journalEntriesStorage.get(displayAddEditEntry, id);

		
	})
}

function renderEachEntry(entry) {
		console.dir(entry);
	return `
		<div class="nav-bar">
		<div class="nav-1">
			<div class="nav-link"><a href="" class="my-journal-button">My Journal</a></div>
			<div class="nav-link"><a href="" class="js-edit-entry plus">&#43;</a></div>
			<div class="nav-link"><a href="">Log Out</a></div>
		</div>
		</div>
		<main role="main" class="journal-entry">
		<div class="dashboard-header">
			<h2>My Journal</h2>
		</div>
		<div class="edit-delete">
			<button class="edit" id="js-edit-button" data-entryid="${entry.id}">EDIT</button>
			<button class="delete" id="js-delete-button" data-entryid="${entry.id}">DELETE</button>
		</div>
		<section class="each-entry">
			<div class="entry-title">
				<h5 class="entry-title">${entry.title}</h5>
			</div>
			<p class="entry-date">${entry.travelDate}</p>
			 <div class="entry-list"><img class="main-entry-photo" src="${entry.coverPhoto}"></div>
			<div class="main-entry-description">
				<p class="p-entry">${entry.description}</p>		
			</div>
			<div class="main-best-memory">
				<h5>Best memory</h5>
				<p class="p-entry"> 
					${entry.memories}
				</p>	
			</div>
			<div class="main-foreign-words">
				<h5>Foreign words to remember</h5>
				<p class="p-entry">
					${entry.words}
				</p>
			</div>
			<div class="more-photos">
			${entry.morePhotos.map(function(photoUrl) {
				return `
				<img src="${photoUrl}">
				`
			}).join('\n')}
		</section>	
	</main>
	`
}

function displayEachEntry(entry) {
	const eachEntry = renderEachEntry(entry);
	$('.landing-page').prop('hidden', true);
	$('.main-nav-bar').prop('hidden', true);
	$('.main-area').html(eachEntry);
}

function getEachEntry(id) {
	console.log(id);
	journalEntriesStorage.get(displayEachEntry, id);
}

function handleEntryClick() {
 	$('.main-area').on('click', '.entry-title a', function() {
 		console.log('Individual entry clicked');
 		const id = $(this).data("entryid");
 		getEachEntry(id);
 	})
}

//CANCEL BUTTON
function handleCancelButton() {
	$('.main-area').on('click', '#js-cancel-button', function() {
		console.log('Cancel button clicked');
		$('.landing-page').prop('hidden', true);
		getUserDashboard();
	})
}

//DELETE button
function deleteEntry(id) {
	journalEntriesStorage.delete(getUserDashboard, id);
}

function handleDeleteButton() {
	$('.main-area').on('click', '#js-delete-button', function() {
		console.log('Delete button clicked');
		const id = $(this).data('entryid');
		deleteEntry(id);

	})
}


function setUpEventHandlers() {
	handleLoginButton();
	handleSignUpButton();
	handleLoginSuccess();
	handleMyJournalButton();
	handleAddEditButtons();
	handleSignUpSuccess();
	handleEntryClick();
	handleEditButton();
	handleCancelButton();
	handleDeleteButton();
}





// SET UP HOME BUTTON?

$(setUpEventHandlers);
