
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
let username;
                function buildCreateAccount(){
                        let mainAccountCreate = document.createElement('div');
       
                        
                
                        let genderFlag = null;
                        function genderChoose() {
                                let prev = null;
                                let genderContainer = document.querySelector('.gender');
                                let male = document.querySelector('.gender__male');
                                highlight(male);
                                
                                genderContainer.addEventListener('click', function(event) {
                                        let btn = event.target.closest('.gender-type');
                                        if (!btn) return;
                                        highlight(btn);
                                        
                                })
                                function highlight(el) {
                                        if (prev) {//prev
                                                prev.classList.remove('active');
                                        }
                                        prev = el;
                                        prev.classList.add('active');
                                        genderFlag = el.id;
                                        console.log(el.id);
                                        
                                }
                        }
                        genderChoose();
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        let heightFlag = null;
                        function buildHeight(){
                                let cmBtn = document.querySelector('.cm');
                                let inBtn = document.querySelector('.in');
                                let chose = document.querySelector('.cm-or-inch');
                                let listOfHeights = document.querySelector('.height-list');
                                let selectField = document.querySelector('.selectField');
                                let selectText = document.querySelector('#selectText');
                                let options = document.querySelectorAll('.option');
                                let iconArrow = document.querySelector('.icon-circle-down'); 
                                
                                
                                let measure = '';
                                listOfHeights.addEventListener('click', function(event){
                                        let el = event.target;
                                        heightFlag = el.id;
                                        selectText.textContent = el.id;
                                        
                                        listOfHeights.classList.toggle('hidden');
                                        iconArrow.classList.toggle('rotate');
                                        
                                })

                                selectField.addEventListener('click', function() {
                                        listOfHeights.classList.toggle('hidden');
                                        iconArrow.classList.toggle('rotate');
                                        
                                })

                                chose.addEventListener('click', function(event) {
                                        let el = event.target;
                                        measure = el.className === 'cm active' ? 'cm' : 'in';
                                        console.log(measure);
                                        //console.log(measure);     
                                        if (measure === 'cm') {
                                                if (isNaN(selectText.textContent)){
                                                        selectText.textContent = 'Choose height';
                                                } else{
                                                        selectText.textContent = Math.round((selectText.textContent * 2.535));
                                                }
                                                
                                                fillSelectCm();
                                        } else if (measure === 'in'){
                                                if (isNaN(selectText.textContent)){
                                                        selectText.textContent = "Choose height";
                                                } else{
                                                        selectText.textContent = Math.round((selectText.textContent / 2.535));
                                                }
                                                fillSelectIn();
                                        }
                                        
                                })
                                
                                cmBtn.addEventListener('click', function() {
                                        cmBtn.classList.add('active');
                                        inBtn.classList.remove('active');
                                        
                                        
                                })
                                inBtn.addEventListener('click', function() {
                                        inBtn.classList.add('active');
                                        cmBtn.classList.remove('active');
                                        
                                        
                                })

                                function fillSelectCm() {
                                        
                                                let res = ``;
                                                for (let i = 100; i <= 250; i++) {
                                                        res += `<li id='${i}' class='option'>${i}</li>`;
                                                }
                                                listOfHeights.innerHTML = res;
                                                
                                        
                                }
                                fillSelectCm();
                                function fillSelectIn() {
                                        
                                                let res = ``;
                                                for (let i = 39; i <= 98; i++) {
                                                        res += `<li id='${i}' class='option'>${i}</li>`;
                                                }
                                                listOfHeights.innerHTML = res;
                                        
                                }
                        }
                        buildHeight();

                        let weightFlag = null;
                        function buildWeight(){
                                let kgBtn = document.querySelector('.kg');
                                let lbBtn = document.querySelector('.lb');
                                let chose = document.querySelector('.kg-or-lb');
                                let listOfWeights = document.querySelector('.weight-list');
                                let selectField = document.querySelector('.weight .selectField');
                                let selectText = document.querySelector('.weight #selectText');
                                let options = document.querySelectorAll('.weight .option');
                                let iconArrow = document.querySelector('.icon-circle-down'); 
                                
                                
                                let measure = '';
                                listOfWeights.addEventListener('click', function(event){
                                        let el = event.target;
                                        weightFlag = el.id;
                                        selectText.textContent = el.id;
                                        listOfWeights.classList.toggle('hidden');
                                        iconArrow.classList.toggle('rotate');
                                })

                                selectField.addEventListener('click', function() {
                                        listOfWeights.classList.toggle('hidden');
                                        iconArrow.classList.toggle('rotate');
                                })

                                chose.addEventListener('click', function(event) {
                                        let el = event.target;
                                        measure = el.className === 'kg active' ? 'kg' : 'lb';
                                        //console.log(measure);     
                                        if (measure === 'kg') {
                                                if (isNaN(selectText.textContent)){
                                                        selectText.textContent = 'Choose weight';
                                                } else{
                                                        selectText.textContent = Math.round((selectText.textContent / 2.2));
                                                }
                                                
                                                fillSelectKg();
                                        } else if (measure === 'lb'){
                                                if (isNaN(selectText.textContent)){
                                                        selectText.textContent = "Choose weight";
                                                } else{
                                                        selectText.textContent = Math.round((selectText.textContent * 2.2));
                                                }
                                                fillSelectLb();
                                        }
                                        
                                })
                                
                                kgBtn.addEventListener('click', function() {
                                        kgBtn.classList.add('active');
                                        lbBtn.classList.remove('active');
                                        
                                        
                                })
                                lbBtn.addEventListener('click', function() {
                                        lbBtn.classList.add('active');
                                        kgBtn.classList.remove('active');
                                        
                                        
                                })

                                function fillSelectKg() {
                                        
                                                let res = ``;
                                                for (let i = 40; i <= 150; i++) {
                                                        res += `<li id='${i}' class='option'>${i}</li>`;
                                                }
                                                listOfWeights.innerHTML = res;
                                        
                                }
                                fillSelectKg();
                                function fillSelectLb() {
                                        
                                                let res = ``;
                                                for (let i = 88; i <= 330; i++) {
                                                        res += `<li id='${i}' class='option'>${i}</li>`;
                                                }
                                                listOfWeights.innerHTML = res;
                                        
                                }
                        }
                        buildWeight();
                        ///////////////////////////////////////////////////////////////////////
                        let levelFlag = null;
                        function buildLevel() {
                                let prev = null;
                                let levelContainer = document.querySelector('.level');
                                let beginner = document.querySelector('.level .beginner');
                                levelFlag = beginner.querySelector('.level-option__title').textContent;
                                highlight(beginner);
                                levelContainer.addEventListener('click', function(event) {
                                        let btn = event.target.closest('div');
                                        let title = btn.querySelector('.level-option__title');
                                        levelFlag = title.textContent;
                                        if (!btn) return;
                                        highlight(btn);
                                        
                                })
                                function highlight(el) {
                                        if (prev) {//prev
                                                prev.classList.remove('active');
                                        }
                                        prev = el;
                                        prev.classList.add('active');
                                        
                                }
                        }
                        buildLevel();

                        let goalsFlag = {};
                        function buildGoals() {
                                
                                let goalsContainer = document.querySelector('.goals');
                                let muscleBuildOption = goalsContainer.querySelector('.muscle');
                                let loseFatOption = goalsContainer.querySelector('.fat-loss');
                                muscleBuildOption.classList.add('active');
                                loseFatOption.classList.add('active');

                                goalsFlag[muscleBuildOption.id] = muscleBuildOption.querySelector('.goals__option__title').textContent;
                                goalsFlag[loseFatOption.id] = loseFatOption.querySelector('.goals__option__title').textContent;

                                goalsContainer.addEventListener('click', function(event) {
                                        let btn = event.target.closest('div');
                                        goalsFlag[btn.id] = btn.querySelector('.goals__option__title').textContent;
                                        if (!btn) return;
                                        btn.classList.toggle('active');
                                        if (!btn.className.includes('active')) {
                                                delete goalsFlag[btn.id];
                                        }
                                        
                                })
                                
                        }
                        buildGoals();

                        let perfomanceFlag = {};
                        function buildPerfomance() {

                                let perfomance = document.querySelector('.main_slider .perfomance');
                                let listOfInputs = perfomance.querySelectorAll('input');
                                
                                let errorModal = document.createElement('div');
                                errorModal.textContent = `The value mustn't be empty or negative`;
                                errorModal.classList.add('error-modal');
                                perfomance.append(errorModal);
                                
                                for (let el of listOfInputs){
                                        el.onblur = function() {
                                                if (!el.value || el.value < 0) {
                                                        errorModal.classList.add('show');
                                                } else {
                                                        errorModal.classList.remove('show');
                                                }
                                                
                                                if(el.value > 0 && el.value !== ''){
                                                        perfomanceFlag[el.id] = el.value;
                                                }
                                        }
                                }
                                
                        }
                        buildPerfomance();
                        function buildRegForm(){
                                
                                let signUpForm = document.querySelector('.registration .form');
                                let userNameInput = document.querySelector('.registration .form #user-name');
                                let fullNameInput = document.querySelector('.registration .form #full-name');
                                let emailInput = document.querySelector('.registration .form #email');
                                let passwordInput = document.querySelector('.registration .form #password');
                                let passwordEye = document.querySelector('.fa-solid');
                                let btnCreate = document.querySelector('.registration .form .form__btn.create');
                                let btnSave = document.querySelector('.registration .form .form__btn.save');
                                let userData = {};
                                btnSave.setAttribute('disabled', 'disabled');
                                btnSave.classList.add('disabled');
                                btnSave.addEventListener('click', save);
                                btnSave.addEventListener('click', saveToBase);
                                btnSave.addEventListener('click', addUser);
                                //btnCreate.addEventListener('click', createAccount);
        
                                let errorModal = document.createElement('div');
                                errorModal.textContent = `The length of your input must be at least 10 symbols or check if your email contains "@"`;
                                errorModal.classList.add('error-modal');
                                signUpForm.append(errorModal);
                                
        
                                userNameInput.addEventListener('input', removeDisBtn);
                                fullNameInput.addEventListener('input', removeDisBtn);
                                emailInput.addEventListener('input', removeDisBtn);
                                passwordInput.addEventListener('input', removeDisBtn);
                                
                                
                                function removeDisBtn() {
                                        if((!userNameInput.value || userNameInput.value.length < 5) 
                                        || (!fullNameInput.value || userNameInput.value.length < 5) 
                                        || (!emailInput.value || emailInput.value.length < 5 || !emailInput.value.includes('@')) 
                                        || (!passwordInput.value || passwordInput.value.length < 5)){
                                                btnSave.setAttribute('disabled', 'disabled');
                                                btnSave.classList.add('disabled');
                                                errorModal.classList.add('show');
                                        } else{
                                                btnSave.removeAttribute('disabled');
                                                btnSave.classList.remove('disabled');
                                                errorModal.classList.remove('show');
                                        }
                                }
        
                                function save(event){
                                        
                                        event.preventDefault();
                                        
                                        userData['username'] = userNameInput.value;
                                        userData['fullname'] = fullNameInput.value;
                                        userData['email'] = emailInput.value;
                                        userData['gender'] = genderFlag;
                                        userData['height'] = heightFlag;
                                        userData['weight'] = weightFlag;
                                        userData['level'] = levelFlag;
                                        userData['goals'] = goalsFlag;
                                        userData['perfomance'] = perfomanceFlag;
        
                                        for (let key in userData){
                                                if (!userData[key]){
                                                        userData[key] = "Haven't specified:(";
                                                }
                                        }
        
                                        //localStorage.setItem('userData', JSON.stringify(userData));
                                        //clearingValues();
        
                                        //btnCreate.setAttribute('disabled', 'disabled');
                                        
                                        
                                        //clearingValues();
                                
                                        btnSave.setAttribute('disabled', 'disabled');
                                        btnSave.classList.add('disabled');
                                        btnCreate.classList.remove('hidden');
        
                                        // buildAccountPage();
                
                                        //window.location.href = "https://www.google.com/";
                                };
                                function saveToBase() {
                                        let email = emailInput.value;
                                        let password = passwordInput.value
                                        username = userNameInput.value;
                                        let fullName = fullNameInput.value;
                                        
                
                                        set(ref(database, 'users/' + username), {
                                     
                                                userData: userData
                                        });
                                        console.log('saved');
                                }
                                function addUser() {
                                        let email = emailInput.value;
                                        let password = passwordInput.value
                                        username = userNameInput.value;
                                        let fullName = fullNameInput.value;
        
                                        createUserWithEmailAndPassword(auth, email, password)
                                        .then((userCredential) => {
                                                const user = userCredential.user;
        
                                                set(ref(database, 'users/' + user.username),{
                                             
                                                        userData: userData
                                                })
                                                console.log('added');
                                                
                                        })
                                        .catch((error) => {
                                                console.log(error);
                                        })
                                }
                                function clearingValues() {
                                        userNameInput.value = '';
                                        fullNameInput.value = '';
                                        emailInput.value = '';
                                        passwordInput.value = '';
                                }
        
                                passwordEye.addEventListener('click',function() {
                                        this.classList.toggle('fa-eye');
                                        let type = passwordInput.getAttribute('type');
                                        if (type === 'password') {
                                                passwordInput.setAttribute('type', 'text');
                                        } else {
                                                passwordInput.setAttribute('type', 'password');
                                        }
                                })
        
        
        
        
        
                        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
                        
        
                        // let signUpForm = document.querySelector('.registration .form');
        
                        // let fullName = fullNameInput.value;
        
        
                        // let passwordEye = document.querySelector('.fa-solid');
                        //let btnCreate = document.querySelector('.form__btn');
                        /*const links = {
                                signup: `<main class="main main_slider">
                                <div class="slider">
                                        
                                        <div class="slider__item">
                                        
                                                <div class="registration form-container">
                                
                                                        <form class="form" action="POST">
                                                                <h2 class="form__title">Sign up</h2>
                                                                <div class="form__field">
                                                                        <input tabindex="0" id="user-name" type="text" placeholder="Username" autocomplete="off"   maxlength="35">
                                                                </div>
                                                                <div class="form__field">
                                                                        <input tabindex="1" id="full-name" type="text" placeholder="Full name" autocomplete="off"  maxlength="35">
                                                                </div>
                                                                <div class="form__field">
                                                                        <input tabindex="2" id="email" type="email" placeholder="Email" autocomplete="off" maxlength="35">
                                                                </div>
                                                                <div class="form__field">
                                                                        <input tabindex="3" id="password" type="password" placeholder="Password" autocomplete="off"  maxlength="15">
                                                                        <i class="fa-solid  fa-eye-slash"></i>
                                                                </div>
                                        
                                                                <a class="form__btn"  href="#account">Create account</a>
                                                                
                                                        </form>
                                                        
                                                </div>
                                        </div>
                                        <div class="slider__item">
                                                <div class="gender">
                                                        <h2 class="gender__title">Gender</h2>
                                                        <div id="male" class="gender__male gender-type"><p>Male</p></div>
                                                        <div id="female" class="gender__female gender-type"><p>Female</p></div>
                                                </div>
                                        </div>
                                        <div class="slider__item">
                                                <div class="height">
                                                        <h2 class="height__title">Height</h2>
                                                        <div class="cm-or-inch">
                                                                <button type="button" id="cm" class="cm active">cm</button>
                                                                <button type="button" id="in" class="in">in</button>
                                                        </div>
                                                        <div class="selector">
                                                                <div class="selectField">
                                                                        <p id="selectText">Choose height</p>
                                                                        <img src="/up-arrow.svg" alt="arrow" class="icon-circle-down"></img>
                                                                </div>
                                        
                                                                <ul class="height-list hidden"></ul>
                                                        </div>
                                                </div>
                                        </div>
                                        <div class="slider__item">
                                                <div class="weight">
                                                        <h2 class="weight__title">Weight</h2>
                                                        <div class="kg-or-lb">
                                                                <button type="button" id="kg" class="kg active">kg</button>
                                                                <button type="button" id="lb" class="lb">lb</button>
                                                        </div>
                                                        <div class="selector">
                                                                <div class="selectField">
                                                                        <p id="selectText">Choose weight</p>
                                                                        <img src="/up-arrow.svg" alt="arrow" class="icon-circle-down"></img>
                                                                </div>
                                        
                                                                <ul class="weight-list hidden"></ul>
                                                        </div>
                                                </div>
                                        </div>
                                        <div class="slider__item">
                                                <div class="level">
                                                        <h2 class="level__title">Fitness level</h2>
                                                        <div class="level-option newbie">
                                                                <p class="level-option__title">Newbie</p>
                                                                <p class="level-option__explanation">I've never trained before</p>
                                                        </div>
                                                        <div class="level-option beginner">
                                                                <p class="level-option__title">Beginner</p>
                                                                <p class="level-option__explanation">Some experience</p>
                                                        </div>
                                                        <div class="level-option intermediate">
                                                                <p class="level-option__title">Intermediate</p>
                                                                <p class="level-option__explanation">Moderate experience with consistent training</p>
                                                        </div>
                                                        <div class="level-option advanced">
                                                                <p class="level-option__title">Advanced</p>
                                                                <p class="level-option__explanation">Very experienced with consistent training</p>
                                                        </div>
                                                </div>
                                        </div>
                                        <div class="slider__item">
                                                <div class="goals">
                                                        <h2 class="goals__title">Goals<span class="goals__title-explanation">Choose as many as you like</span></h2>
                                                        <div id="goal-1" class="goals__option strength">
                                                                <p class="goals__option__title">Build strength</p>
                                                                <p class="goals__option__explanation">Get stronger and perform exercises with greater ease</p>
                                                        </div>
                                                        <div id="goal-2" class="goals__option muscle">
                                                                <p class="goals__option__title">Build muscle</p>
                                                                <p class="goals__option__explanation">Increase volume and difficulty to ensure muscle growth</p>
                                                        </div>
                                                        <div id="goal-3" class="goals__option fat-loss">
                                                                <p class="goals__option__title">Lose fat</p>
                                                                <p class="goals__option__explanation">Optimized for high intensity fat burning workouts</p>
                                                        </div>
                                                        <div id="goal-4" class="goals__option techniques">
                                                                <p class="goals__option__title">Learn techniques</p>
                                                                <p class="goals__option__explanation">Master the basic skills like handstands to the more advanced skills like the planche</p>
                                                        </div>
                                                </div>
                                        </div>
                                        <div class="slider__item">
                                                <div class="perfomance">
                                                        <h2 class="perfomance__title">Perfomance</h2>
                                                        <div class="perfomance__statistics">
                                                                <div class="perfomance__result pullups">
                                                                        <label for="pullups">Max pullups</label>
                                                                        <input tabindex="0" type="number" id="pullups" placeholder="0">
                                                                </div>
                                                                <div class="perfomance__result pushups">
                                                                        <label for="pushups">Max pushups</label>
                                                                        <input tabindex="1" type="number" id="pushups" placeholder="0">
                                                                </div>
                                                                <div class="perfomance__result squats">
                                                                        <label for="squats">Max squats</label>
                                                                        <input tabindex="2" type="number" id="squats" placeholder="0">
                                                                </div>
                                                                <div class="perfomance__result dips">
                                                                        <label for="dips">Max dips</label>
                                                                        <input tabindex="3" type="number" id="dips" placeholder="0">
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                        
                                        
                                        <div class="slider__item">kek</div>
                                </div>
                                <div class="buttons">
                                        
                                </div>
                        </main>`,
                                account: `
                                <main class="main main_account">
                                <div class="account-container">
                                <div class="account">
                                        <div class="account__img">
                                                <img src="resume.png" alt="logo">
                                        </div>
                                        <div class="account__info">
                                                <h1 class="account__title">
                                                        Profile settings
                                                </h1>
        
                                                <div class="account__field account__username">
                                                        <h4>Username:</h4>
                                                        <p></p>
                                                </div>
                                                <div class="account__field account__fullname">
                                                        <h4>Fullname:</h4>
                                                        <p></p>
                                                </div>
                                                <div class="account__field account__gender">
                                                        <h4>Gender:</h4>
                                                        <p></p>
                                                </div>
                                                <div class="account__field account__height">
                                                        <h4>Height:</h4>
                                                        <p></p>
                                                </div>
                                                <div class="account__field account__weight">
                                                        <h4>Weight:</h4>
                                                        <p></p>
                                                </div>
                                                <div class="account__field account__level">
                                                        <h4>Level:</h4>
                                                        <p></p>
                                                </div>
                                                <div class="account__field account__goals">
                                                        <h4>Goals:</h4>
                                                        <p></p>
                                                        <p></p>
                                                        <p></p>
                                                </div>
                                                <div class="account__field account__perfomance">
                                                        <h4>Perfomance:</h4>
                                                        <p>Pullups : <span></span></p>
                                                        <p>Pushups : <span></span></p>
                                                        <p>Dips : <span></span></p>
                                                        <p>Squats : <span></span></p>
                                                </div>
                                                <div class="account__buttons">
                                                        <button class="account__btn edit">Edit</button>
                                                        <button class="account__btn save hidden">Save</button>
                                                </div>
                                        </div>
                                                </div>
                                        </div>
                                </main>`,
                                contacts: "<h1>Контакты</h1><p>Ну а тут классически будет страница <strong>Контакты</strong></p>",
                        };
                        btnCreate.addEventListener('click', saveToBase);
                        function updateState(){
                                let content = links[location.hash.slice(1)];
                                document.body.innerHTML = content ? content : '<p>Page not found</p>';
                        }
                        window.addEventListener('hashchange', updateState);
                        window.addEventListener('load', (e) => {
                                location.hash.slice(1) ? updateState() : location.hash = '#signup'
                        })*/
                        // function createAccount() {
                        //         buildAccountPage(userData);
                             
        
                        // }
                        
                        }
                        buildRegForm();         
                        

                }
                buildCreateAccount();

                
                      
                
