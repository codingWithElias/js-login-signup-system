/*
 * js-login-signup-system
 * version: 1.0.0
 * By: Elias Abdurrahman
 * date: August 19, 2019
 */
var signupIntf = function(){
   app.innerHTML = 
   `
   <div class="signup">
      <h2>Sign Up</h2>
      <h3 class="error-msg" id="errorMsg"></h3>
        <label>full name</label>
        <input type="text" id="sFn">
        <br>
        <label>user name</label>
        <input type="text" id="sName">
        <br>
        <label>password</label>
        <input type="password" id="sPass">
        <br>
        <label>re_password</label>
        <input type="password" id="sRePass">

        <div class="btn-holder">
         <span class="signup-text-1">have an account?</span>
         <span class="signup-btn-1" onclick="loginIntf()">Login</span>
          <button onclick="signup()">Sign Up</button>
        </div>
    </div>
   `;
}

var signup = function(){
  let sFn = document.getElementById("sFn");
  let sName = document.getElementById("sName");
  let sPass = document.getElementById("sPass");
  let sRePass = document.getElementById("sRePass");

  let errorMsg = document.getElementById("errorMsg");


  let msg = [];
  if (sFn.value.length < 3) {
  	 sFn.style.borderColor = "#AD0000";
     if(sFn.value == ""){
       msg.push("Full name field is required.");
     }else{
       msg.push("Full name field is too short.");
     }
  }else{
  	 sFn.style.borderColor = "#ccc";
  }

  if (sName.value.length < 3) {
  	 sName.style.borderColor = "#AD0000";
     if(sName.value == ""){
       msg.push("User name field is required.");
     }else{
       msg.push("User name field is too short.");
     }
  }else{
  	 sName.style.borderColor = "#ccc";
  }

  if (sPass.value.length < 3) {
  	 sPass.style.borderColor = "#AD0000";
     if(sPass.value == ""){
       msg.push("Password field is required.");
     }else{
       msg.push("Password field is too short.");
     }
  }else{
  	 sPass.style.borderColor = "#ccc";
  }

  if (sRePass.value.length < 3) {
  	 sRePass.style.borderColor = "#AD0000";
     if(sRePass.value == ""){
       msg.push("Re_password field is required.");
     }else{
       msg.push("Re_password field is too short.");
     }
  }else{
  	 sRePass.style.borderColor = "#ccc";
  }

  if (sRePass.value !== sPass.value) {
  	   sPass.style.borderColor = "#AD0000";
  	   sRePass.style.borderColor = "#AD0000";
       msg.push("Password and re_password not match.");
  }

  for (let i3 = 0; i3 < db_users.length; i3++) {
   	if(sName.value === db_users[i3].userName){
        msg.push("Sorry, user name taken.");
  	    sName.style.borderColor = "#AD0000";
   	    break;
   	}
   }

  var listOfErr;
  let newUser;
  if(msg.length === 0){
   errorMsg.innerHTML = "";
   sName.style.borderColor = "#ccc";
   if(db_users.length){
     newUser = {
      id: db_users.length,
      fullName: sFn.value,
      userName: sName.value,
      userPass:  sPass.value
   };
   }else{
     newUser = {
      id: 0,
      fullName: sFn.value,
      userName: sName.value,
      userPass:  sPass.value
   };
   }
   
   loggedUser = newUser;
   
   db_users.push(newUser);
   let newUserStr = JSON.stringify(db_users);
   localStorage.setItem('db_users', newUserStr);
   showProfile(loggedUser);
  }else{
	  for(let i=0; i < msg.length; i++){
	  	if(i == 0){
	        listOfErr = `<li>${msg[i]}</li>`;
		}else{
		   listOfErr += `<li>${msg[i]}</li>`;

		}
	  }
   errorMsg.innerHTML = listOfErr;
  }
}