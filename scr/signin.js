import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
                import { getAuth, deleteUser, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js'
                import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
                import { getDatabase, remove, set, ref, child, push, update, onValue } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js"

function buildRegForm(){
        
        let signUpForm = document.querySelector('.registration .form');
        let userNameInput = document.querySelector('.registration .form #user-name');
        let fullNameInput = document.querySelector('.registration .form #full-name');
        let emailInput = document.querySelector('.registration .form #email');
        let passwordInput = document.querySelector('.registration .form #password');
        let passwordEye = document.querySelector('.fa-solid');
        let btnCreate = document.querySelector('.registration .form .form__btn');
        let userData = {};
        btnCreate.setAttribute('disabled', 'disabled');
        //btnCreate.setAttribute('href', "");
        btnCreate.classList.add('disabled');
        btnCreate.addEventListener('click', save);


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
                        btnCreate.setAttribute('disabled', 'disabled');
                        btnCreate.classList.add('disabled');
                        errorModal.classList.add('show');
                } else{
                        btnCreate.removeAttribute('disabled');
                        btnCreate.classList.remove('disabled');
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

                localStorage.setItem('userData', JSON.stringify(userData));
                //clearingValues();

                btnCreate.setAttribute('disabled', 'disabled');
                btnCreate.classList.add('disabled');
        };

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

                // let signUpForm = document.querySelector('.registration .form');

                // let fullName = fullNameInput.value;


                // let passwordEye = document.querySelector('.fa-solid');
                //let btnCreate = document.querySelector('.form__btn');
                const links = {
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
                })
                function saveToBase() {
                        
                        let email = emailInput.value;
                        let password = passwordInput.value
                        let username = userNameInput.value;
                        let fullName = fullNameInput.value;
                        

                        set(ref(database, 'users/' + username), {
                                email: email,
                                username: username,
                                fullName: fullName,
                                userData: userData
                        });
                        console.log('saved');
                        //clearingValues();
                        // window.location.href = "http://127.0.0.1:5500/accoun.html";
                        // buildAccountPage();


                }
               
}
buildRegForm();              
        
