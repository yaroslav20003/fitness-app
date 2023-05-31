function buildProgramFatBurn() {
        let prev = null;

        let chooseLevel = document.querySelector('.workout-program__choose-level');
        let btnBeginner = document.querySelector('#beginner');
        let btnIntermediate = document.querySelector('#intermediate');
        let btnAdvanced = document.querySelector('#advanced');

        let listOfExercises = document.querySelector('.list-of-exercises');
        listOfExercises.innerHTML = `<h2>Choose your level</h2>`;
        //let beginnerBtn = chooseLevel.querySelector('#beginner');
        let btnBegin = document.querySelector('.btn-begin');
        let btnFinish = document.querySelector('.btn-finish');
        let stopWatch = document.querySelector('.stop-watch');
        
        // let btnStop = document.querySelector('.btn-stop');
        // let displayTime = document.getElementById('display-time');
        // btnBegin.addEventListener('click', function(){
        //         listOfExercises.innerHTML = `<div>${beginnerBtn.id}</div>`;
        // })
        // highlight(beginnerBtn);
        
        chooseLevel.addEventListener('click', function(event) {
                let level = null;
                let btnLevel = event.target.closest('button');

                let el = event.target;
                if (!btnLevel) {
                        console.log('kek');
                };
                highlight(btnLevel);

                btnBegin.addEventListener('click', getExercises);
                

                btnFinish.addEventListener('click', function() {
                        btnBeginner.disabled = false;
                        btnIntermediate.disabled = false;
                        btnAdvanced.disabled = false;

                        btnBegin.disabled = false;
                        btnFinish.classList.add('hidden');
                        stopWatch.classList.add('hidden');
                        el.disabled = false;
                        listOfExercises.innerHTML = `<h2>You've finished your training session</h2>`;
                        


                })
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                function getExercises() {
                        
                        buildStopWatch();
                        btnBeginner.disabled = true;
                        btnIntermediate.disabled = true;
                        btnAdvanced.disabled = true;
                        el.disabled = true;
                        btnBegin.disabled = true;
                        btnBegin.classList.add('disabled');
                        stopWatch.classList.remove('hidden');
                        btnFinish.classList.remove('hidden');
                        
                        // btnStop.classList.remove('hidden');
                        // displayTime.classList.remove('hidden');
                        
                        const url = 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/cardio';
                        const options = {
                                method: 'GET',
                                headers: {
                                        'X-RapidAPI-Key': 'c883fbdabamshd5d8d19eee9de34p1d2590jsn0100593b873a',
                                        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                                }
                        };
                        function temporary() {
                                if (el.id === 'beginner'){
                                        let html = `<h2>You've started your training session</h2><div class='option'>
                                                                 <div class='img'>
                                                                         <img src="/cardio.jpg" alt="cardio">        
                                                                 </div>
                                                                 <div class="text">
                                                                         <h4>Exercise</h4>
                                                                         <p>10 reps &#8226; rest 60 seconds</p>
                                                                 </div>
                                                </div>`;
                                                
                                                listOfExercises.innerHTML = html;
                                } else if (el.id === 'intermediate'){
                                        let html = `<h2>You've started your training session</h2><div class='option'>
                                                                 <div class='img'>
                                                                         <img src="/muscle.png" alt="cardio">        
                                                                 </div>
                                                                 <div class="text">
                                                                         <h4>Exercise</h4>
                                                                         <p>15 reps &#8226; rest 45 seconds</p>
                                                                 </div>
                                                </div>`;
                                                listOfExercises.innerHTML = html;
                                } else if (el.id === 'advanced'){
                                        let html = `<h2>You've started your training session</h2><div class='option' >
                                                                 <div class='img'>
                                                                         <img src="/reps.jpg" alt="cardio">        
                                                                 </div>
                                                                 <div class="text">
                                                                         <h4>Exercise</h4>
                                                                         <p>20 reps &#8226; rest 30 seconds</p>
                                                                 </div>
                                                </div>`;
                                                listOfExercises.innerHTML = html;
                                } else if(!el){
                                        let html = `<h2>You haven't chosen your level:(</h2>`;
                                        listOfExercises.innerHTML = html;
                                }
                                
                        }
                        temporary();
                        // async function fetchAsyncData() {
                        // try {
                        //         const response = await fetch(url, options);
                        //         const data = await response.json();
                        //         function showExercises(data) {
                                        
                        //                 if (data && btnLevel.id === 'beginner'){
                        //                         let html = `<h2>You've started your training session</h2>`;
                        //                         for (let i = 0; i < data.length - 18; i++) {
                                                        
                        //                                 html += `
                                                        
                                                        
                        //                                 <div class='option' id="${data[i].name}">
                        //                                         <div class='img'>
                        //                                                 <img src="${data[i].gifUrl}" alt="cardio">        
                        //                                         </div>
                        //                                         <div class="text">
                        //                                                 <h4>${data[i].name}</h4>
                        //                                                 <p>10 reps &#8226; rest 60 seconds</p>
                        //                                         </div>
                        //                                 </div>
                        //                                 `;
                                                        
                        //                         } 
                        //                         listOfExercises.innerHTML = html;
                        //                         buildStopWatch();       
                        //                 } else if (data && btnLevel.id === 'intermediate'){
                        //                         let html = `<h2>You've started your training session</h2>`;
                        //                         for (let i = data.length - 18; i < data.length - 8; i++) {
                                                        
                        //                                 html += `
                                                        
                                                        
                        //                                 <div class='option' id="${data[i].name}">
                        //                                         <div class='img'>
                        //                                                 <img src="${data[i].gifUrl}" alt="cardio">        
                        //                                         </div>
                        //                                         <div class="text">
                        //                                                 <h4>${data[i].name}</h4>
                        //                                                 <p>15 reps &#8226; rest 45 seconds</p>
                        //                                         </div>
                        //                                 </div>
                        //                                 `;
                                                        
                                                        
                        //                         }
                        //                         listOfExercises.innerHTML = html;
                        //                         buildStopWatch();
                        //                 } else if(data && btnLevel.id === 'advanced'){
                        //                         let html = `<h2>You've started your training session</h2>`;
                        //                         for (let i = data.length - 8; i < data.length; i++) {
                                                        
                        //                                 html += `
                                                        
                                                        
                        //                                 <div class='option' id="${data[i].name}">
                        //                                         <div class='img'>
                        //                                                 <img src="${data[i].gifUrl}" alt="cardio">        
                        //                                         </div>
                        //                                         <div class="text">
                        //                                                 <h4>${data[i].name}</h4>
                        //                                                 <p>20 reps &#8226; rest 30 seconds</p>
                        //                                         </div>
                        //                                 </div>
                        //                                 `;
                                                        
                                                        
                        //                         }
                        //                         listOfExercises.innerHTML = html;
                        //                         buildStopWatch();
                        //                 }
                                        
                                        
                                        
                        //         }
                        //         showExercises(data);
                        // } catch (error) {
                        //         console.error(error);
                        // }
                        // }
                        // //fetchAsyncData();
                        
        }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
               



        })
        
        function highlight(el) {
                if (prev) {//prev
                        prev.classList.remove('active');
                }
                prev = el;
                prev.classList.add('active');
                // genderFlag = el.id;
                // console.log(el.id);
                
        }
        function buildStopWatch(){
                
                
                        let [seconds, minutes, hours] = [0,0,0];
                        let intervalId = null;
                        let display = document.querySelector('#display-time');
                        let start = document.querySelector('#start');
                        let stop = document.querySelector('#stop');
                        let reset = document.querySelector('#reset');

                        start.addEventListener('click', watchStart);
                        stop.addEventListener('click', watchStop);
                        reset.addEventListener('click', watchReset);

                        

                        function stopWatch(displayTime){
                                seconds++;
                                if(seconds === 60){
                                        seconds = 0;
                                        minutes++;
                                        if(minutes === 60) {
                                                minutes = 0;
                                                hours++;
                                        }
                                }
                                let h = hours < 10 ? '0' + hours : hours;
                                let m = minutes < 10 ? '0' + minutes : minutes;
                                let s = seconds < 10 ? '0' + seconds : seconds;
                                display.textContent = `${h}:${m}:${s}`;
                        }

                        
                        function watchStart() {
                                if (intervalId !== null){
                                        clearInterval(intervalId);
                                }
                                intervalId = setInterval(stopWatch, 1000);
                        }
                        function watchStop(){
                                clearInterval(intervalId);
                        }
                        function watchReset(){
                                clearInterval(intervalId);
                                [seconds, minutes, hours] = [0,0,0];
                                display.textContent = '00:00:00';
                        }

                  
                
        }
        
}
buildProgramFatBurn();