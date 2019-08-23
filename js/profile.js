/*
 * js-login-signup-system
 * version: 1.0.0
 * By: Elias Abdurrahman
 * date: August 19, 2019
 */
var showProfile = function(userData){
   const {fullName: fn, id} = userData;
   loggedUser = userData;
   app.innerHTML = 
   `
   <div class="profile">
      <img src="img/user.jpg" class="user-img">
      <h2 class="full-name">${fn}</h2>
      <div class="opt">
        <span onclick="editProIntf(loggedUser)">Edit Profile</span> |
        <span onclick="loginIntf()">Logout</span>
      </div>
    </div>
   `;
}

function editProIntf(userData){
   const {fullName, userName, userPass} = userData;
	app.innerHTML =
	`
	<div class="edit-profile">
      <div class="edit-form">
        <h2>Edit Profile</h2><br>
        <h3 class="suc-msg" id="sucMsg2"></h3>
        <ul class="error-msg" id="errorMsg2"></ul>
        <label>full name</label>
        <input type="text" value="${fullName}" id="editFn">
        <br>
        <label>user name</label>
        <input type="text" value="${userName}" id="editUn">
        <br>
        <div class="btn-holder">
          <button id="loginBtn" onclick="saveProf()">Save</button>
        </div><br><br>

        <h2>Edit password</h2><br>
        <h3 class="suc-msg" id="sucMsg3"></h3>
        <ul class="error-msg" id="errorMsg3"></ul>

        <label>old password</label>
        <input type="password" id="oldPass">
        <br>
        <label>new password</label>
        <input type="password" id="newPass">
        <br>
        <label>re new password</label>
        <input type="password" id="newPassRe">

        <div class="btn-holder">
          <button id="loginBtn" onclick="savePass()">Save</button>
        </div><br><br>
      </div>
      <div class="opt">
        <span onclick="showProfile(loggedUser)">My Profile</span> |
        <span onclick="loginIntf()">Logout</span>
      </div>
    </div>
	`;
}

function savePass(){
  let oldPass = document.getElementById("oldPass");
  let newPass = document.getElementById("newPass");
  let newPassRe = document.getElementById("newPassRe");

  let errorMsg = document.getElementById("errorMsg3");
  let sucMsg2 = document.getElementById("sucMsg3");

  let msg = [];
  if (newPass.value.length < 3) {
  	 newPass.style.borderColor = "#AD0000";
     if(newPass.value == ""){
       msg.push("New Password field is required.");
     }else{
       msg.push("New password field is too short.");
     }
  }else{
  	 newPass.style.borderColor = "#ccc";
  }

  if (newPassRe.value.length < 3) {
  	 newPassRe.style.borderColor = "#AD0000";
     if(newPassRe.value == ""){
       msg.push("Re_password field is required.");
     }else{
       msg.push("Re_password field is too short.");
     }
  }else{
  	 newPassRe.style.borderColor = "#ccc";
  }

  if (newPassRe.value !== newPass.value) {
  	   newPass.style.borderColor = "#AD0000";
  	   newPassRe.style.borderColor = "#AD0000";
       msg.push("New Password and re_password not match.");
  }

  if (oldPass.value !== loggedUser.userPass) {
  	   oldPass.style.borderColor = "#AD0000";
  	   newPassRe.style.borderColor = "#AD0000";
  	   newPass.style.borderColor = "#AD0000";
       msg.push("Incorrect Password!");
  }else{
  	oldPass.style.borderColor = "#ccc";
  }


  let listOfErr;
  if(msg.length === 0){
  	newPass.style.borderColor = "#ccc";
  	newPassRe.style.borderColor = "#ccc";

  	errorMsg.innerHTML = "";
  	for (let i = 0; i < db_users.length; i++) {
	   	if(loggedUser.userName === db_users[i].userName){
	   		db_users[i].userPass = newPass.value;	        
	        loggedUser = db_users[i];
			let newUserStr = JSON.stringify(db_users);
			localStorage.setItem('db_users', newUserStr);
			sucMsg2.innerHTML = "Password changed successfully";
	   	}
   }

  }else{
   errorMsg.innerHTML = "";
   sucMsg2.innerHTML = "";

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

function saveProf(){
  let editFn = document.getElementById("editFn");
  let editUn = document.getElementById("editUn");

  let errorMsg = document.getElementById("errorMsg2");
  let sucMsg2 = document.getElementById("sucMsg2");
  let msg = [];

  if (editFn.value.length < 3) {
  	 editFn.style.borderColor = "#AD0000";
     if(editFn.value == ""){
       msg.push("Full name field is required.");
     }else{
       msg.push("Full name field is too short.");
     }
  }else{
  	 editFn.style.borderColor = "#ccc";
  }


  if (editUn.value.length < 3) {
  	 editUn.style.borderColor = "#AD0000";
     if(editUn.value == ""){
       msg.push("User name field is required.");
     }else{
       msg.push("User name field is too short.");
     }
  }else{
  	 editUn.style.borderColor = "#ccc";
  }

   for (let i3 = 0; i3 < db_users.length; i3++) {
   	if(editUn.value === db_users[i3].userName){
   	   if(loggedUser.userName !== db_users[i3].userName){
         msg.push("Sorry, user name taken.");
  	     editUn.style.borderColor = "#AD0000";
   	   }
   	   break;
   	}
   }

  let listOfErr;
  if(msg.length === 0){
   errorMsg.innerHTML = "";
   editUn.style.borderColor = "#ccc";

   
   for (let i = 0; i < db_users.length; i++) {
   	if(loggedUser.userName === db_users[i].userName){
   		db_users[i].fullName = editFn.value;
   		db_users[i].userName = editUn.value;
        
        loggedUser = db_users[i];
		let newUserStr = JSON.stringify(db_users);
		localStorage.setItem('db_users', newUserStr);
		sucMsg2.innerHTML = "Profile updated successfully";
   	}
   }

  }else{
   errorMsg.innerHTML = "";
   sucMsg2.innerHTML = "";

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