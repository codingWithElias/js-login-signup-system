/*
 * js-login-signup-system
 * version: 1.0.0
 * By: Elias Abdurrahman
 * date: August 19, 2019
 */
var app = document.getElementById("app");
var db_users;

if(localStorage.getItem('db_users') === null){
	localStorage.setItem('db_users', '');
	db_users = [];
}else{
	if(localStorage.getItem('db_users') === ""){
	  db_users = [];
	}else{
	  db_users = JSON.parse(localStorage.getItem('db_users'));
	}
}

var loggedUser;
var loginIntf = function(){
   app.innerHTML = 
   `
   <div class="login">
      <h2>Login</h2>
      <h3 class="error-msg" id="errorMsg"></h3>
        <label>user name</label>
        <input type="text" id="uName">
        <br>
        <label>password</label>
        <input type="password" id="uPass">
        <div class="btn-holder">
         <span class="signup-text-1">Don't  have an account?</span>
         <span class="signup-btn-1" onclick="signupIntf()">Sign Up</span>
          <button id="loginBtn" onclick="login()">Login</button>
        </div>
    </div>
   `;
}

var login = function(){
	
  let uName = document.getElementById("uName");
  let uPass = document.getElementById("uPass");
  let errorMsg = document.getElementById("errorMsg");
  
  for(let i = 0; i < db_users.length; i++){

  	if (db_users[i].userName === uName.value) {
      var {userName, userPass} = db_users[i];
      loggedUser = db_users[i];
  	}
  }

  if (uName.value === userName && uPass.value === userPass) {
	   showProfile(loggedUser);
  }else{
	uName.value = "";
	uPass.value = "";
	errorMsg.innerHTML = "incorrect user name or password";
  }
}
document.addEventListener('DOMContentLoaded', loginIntf());