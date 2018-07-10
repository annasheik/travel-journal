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
		event.preventDefault();         // do we need it here??
		displayLoginPage();
	})
}


handleLoginButton();

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

handleSignUpButton();


// USER DASHBOARD PAGE
function renderUserDashboard() {
	return `
	<div class="nav-bar">
		<div class="nav-1">
			<div class="nav-link"><a href="" class='my-journal-button'>My Journal</a></div>
			<div class="nav-link"><a href="" class="plus">&#43;</a></div>
			<div class="nav-link"><a href="">Log out</a></div>
		</div>
	</div>
	
	<main role="main" class="user-dashboard">
		<div class="dashboard-header">
			<h2>My trips</h2>
		</div>
		<section class="trip-entries">
			<h4>Let the journey begin!</h4>
			<div class="entry"><a href=""class="js-edit-entry">Add my first trip</a></div>
		</section>	
	`
}

function displayUserDashboard() {
	const userDashboard = renderUserDashboard();
	$('.landing-page').prop('hidden', true);
	$('.main-nav-bar').prop('hidden', true);
	$('.main-area').html(userDashboard);
}

function handleLoginSuccess() {
	$('#main-page').on('click', '.js-login-button', function(event) { //WHY SUBMIT DOESNt work??
		console.log('Login Success');
		event.preventDefault();
		displayUserDashboard();
	});
}
 handleLoginSuccess();

// MY JOURNAL
function handleMyJournalButton() {
	$('.main-area').on('click', '.my-journal-button', function(event) {
		console.log('My Journal button clicked');
		event.preventDefault();
		$('.landing-page').prop('hidden', true);
		displayUserDashboard();
	});
}
handleMyJournalButton();

// ADD or EDIT ENTRY

function renderAddEditEntry (entry=null) {
	return `
		<div class="nav-bar">
		<div class="nav-1">
			<div class="nav-link"><a href="" class="my-journal-button">My Journal</a></div>
			<div class="nav-link"><a href="" class="plus">&#43;</a></div>
			<div class="nav-link"><a href="">Log Out</a></div>
		</div>
	</div>
	
	<main role="main" class="edit-journal-entry">
		<div class="dashboard-header">
			<h2>Edit My Journal</h2>
		</div>
		<div class="save-delete">
			<button class="save" id="js-save-button">Save</button>
			<button class="cancel" id="js-cancel-button">Cancel</button>
		</div>
		<section class="edit-entry">
			<div class="entry-title">
				<input type="text" name="journal-title" id="journal-title" placeholder="Name your trip here" maxlength="70" type="text" value="Name your trip here">
			</div>
			<div class="entry-photo"><a href="">Add a cover photo</a></div>
			<div class="entry-description">
				<input type="text" name="entry-description" id="journal-description" placeholder="Add description of your trip here..." value="Add description of your trip here..">
			</div>
			<div class="best-memory">
				<input type="text" name="best-memory" id="entry-best-memory" placeholder="Share your best memory of the trip..." value="Share your best memory of the trip...">
			</div>
			<div class="foreign-words">
				<input type="text" name="foreign-words" id="entry-foreign-words" placeholder="Keep the new foreign words learned here..." value="Keep the new foreign words learned here...">
			</div>
			<div class="more-photos">
				<p>Add more photos here</p>>
				<input type="file" name="pic" accept="image/*">
				<input type="submit">
			</div>
		</section>	
	</main>
	`
}

function displayAddEditEntry(entry=null) {
	const entryEditor = renderAddEditEntry();
	$('.landing-page').prop('hidden', true);
	$('.main-nav-bar').prop('hidden', true);
	$('.main-area').html(entryEditor);
}

function handleAddEditButtons() {
	$('.main-area').on('click', '.js-edit-entry', function(event) {
		console.log('Add entry clicked');
		event.preventDefault();
		displayAddEditEntry();
	})
}
handleAddEditButtons();

function handlePlusButton() {
	$('.main-area').on('click', '.plus', function(event) {
		console.log('Plus button clicked');
		event.preventDefault();
		displayAddEditEntry();
})
}
handlePlusButton();

// why does it work by default???
function handleHomeButton() {

}


