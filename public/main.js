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
			<div class="nav-link"><a href="">My Jornal</a></div>
			<div class="nav-link"><a href="">Log out</a></div>
			<div class="nav-link"><a href="">Bucket List</a></div>
		</div>
	</div>
	
	<main role="main" class="user-dashboard">
		<div class="dashboard-header">
			<h2>My trips</h2>
		</div>
		<section class="trip-entries">
			<h4>Let the journey begin!</h4>
			<div class="entry"><a>Add my first trip</a></div>
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




function renderAddEditEntry (entry=null) {

}

function displayAddEditEntry(entry=null) {

}


// why does it work by default???
function handleHomeButton() {

}


