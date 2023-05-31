import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, deleteUser, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js'
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
import { getDatabase, remove, set, ref, child, push, update, onValue } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js"


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
        apiKey: "AIzaSyCOmsmfK2mI-eqyx5FbqCqrwi31cDGRfgk",
        authDomain: "signup-cb4c7.firebaseapp.com",
        databaseURL: "https://signup-cb4c7-default-rtdb.firebaseio.com",
        projectId: "signup-cb4c7",
        storageBucket: "signup-cb4c7.appspot.com",
        messagingSenderId: "329484801937",
        appId: "1:329484801937:web:d58d4e156d36a5fde26c30",
        measurementId: "G-BHBEBJGCM8"
};
      
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
const user = auth.currentUser;

function buildAccountPage(username){

                
        let btnEdit = document.querySelector('.account__btn.edit');
        let btnSave = document.querySelector('.account__btn.save');
        let accountField = document.querySelectorAll('.account__field');
        let data = document.querySelectorAll('.account__field p');
        let usernameField = document.querySelector('.account__field .username');
        let fullNameField = document.querySelector('.account__field .fullname');
        let emailField = document.querySelector('.account__field .email');
        let genderField = document.querySelector('.account__field .gender');
        let heightField = document.querySelector('.account__field .height');
        let weightField = document.querySelector('.account__field .weight');
        let levelField = document.querySelector('.account__field .level');
        let goalsField = document.querySelector('.account__field .goals');
        let pullUps = document.querySelector('.account__field .pullups');
        let pushUps = document.querySelector('.account__field .pushups');
        let dips = document.querySelector('.account__field .dips');
        let squats = document.querySelector('.account__field .squats');

        function read() {

                
        
                let userRef = ref(database, 'users/' + username);
                onValue(userRef, (snapshot) => {
                        const data = snapshot.val();
                        usernameField.textContent = data.username;
                        fullNameField.textContent = data.fullName;
                        emailField.textContent = data.email;
                        genderField.textContent = data.userData.gender;
                        heightField.textContent = data.userData.height;
                        weightField.textContent = data.userData.weight;
                        levelField.textContent = data.userData.level;
                        pullUps.textContent = data.userData.perfomance.pullups;
                        pushUps.textContent = data.userData.perfomance.pushups;
                        dips.textContent = data.userData.perfomance.dips;
                        squats.textContent = data.userData.perfomance.squats;
                        console.log(data.userData.gender);

                        let res = ``;
                        for (let key in data.userData.goals) {
                                res += `<li>${data.userData.goals[key]}</li>`;
                        }
                        goalsField.innerHTML = res;
                        console.log(data.userData.goals);

                });
        } 
        read();

        let editInfo = function(){
                
                //btnSave.classList.remove('hidden');
        

                

                for(let item of accountField){
                        item.addEventListener('click', changeInput);
                }

                function changeInput(event){
                        let el = event.target.closest('p');
                        el.innerHTML = `<input value ="${el.textContent}">`;
                        
                        let itemInput = el.firstChild;
                        let end = itemInput.value.length;
                        itemInput.setSelectionRange(end, end);
                        
                        itemInput.focus();

                        itemInput.onblur = function (){
                                el.textContent = `${itemInput.value}`;
                                
                        } 
                        
                
                }

                // btnSave.addEventListener('click', function(){
                //         btnSave.classList.add('hidden');
                //         btnEdit.disabled = false;
                        
                                
                        
                // })
                
        }
        
        btnEdit.addEventListener('click', editInfo);
}
buildAccountPage();
