const sessionDateInput = document.getElementById("session-date")
const sessionLogInput = document.getElementById("session-log-input")
const workoutFinishedBtn = document.getElementById("workout-finished-btn")

const form = document.getElementById("session-form")
const prForm = document.getElementById("pr-form")
const getPastPrsBtn = document.getElementById("past-pr-btn")
const hidePastPrsBtn = document.getElementById("hide-pr-btn")


const setDecBtn = document.getElementById("counter-button__decrease")
const setIncBtn = document.getElementById("counter-button__increase")
const setResetBtn = document.getElementById("counter-button__reset")
const setCountNum = document.getElementById("count")


const workoutsContainer = document.getElementById("past-sessions-display")
const prsContainer = document.getElementById("past-pr-display")


const getPastSessionsBtn = document.getElementById("past-sessions-btn")
const hidePastSessionsBtn = document.getElementById("hide-sessions-btn")



const baseURL = `http://localhost:4500/api/tl3000`

const workoutsCallback = ({data: workouts}) => displayWorkouts(workouts)
const prsCallback = ({data: prs}) => displayPrs(prs)


const deleteWorkout = id => axios.delete(`${baseURL}/${id}`).then(workoutsCallback)
const updateWorkout = (id, type) => axios.put(`${baseURL}/${id}`, type).then(workoutsCallback)

const deletePr = id => axios.delete(`${baseURL}/pr/${id}`).then(prsCallback)
const updatePr = (id, type) => axios.put(`${baseURL}/pr/${id}`, {type}).then(prsCallback)

const postWorkout = body => axios.post(baseURL, body)
  .then(function (res) {
    const data = res.data;
    alert("Workout Saved!")
  });

const postPr = body => axios.post(`${baseURL}/pr`, body)
  .then(function (res) {
    const data = res.data;
    alert("New PR Recorded!")
  })

function submitPrHandler(event) {
  event.preventDefault()

  let exercise = document.getElementById("pr-ex-input")
  let prNumber = document.getElementById("pr-load-input")
  let unit = document.getElementById("pr-unit-input")

  let prBodyObj = {
    exercise: exercise.value,
    prNumber: prNumber.value,
    unit: unit.value,
  }

  postPr(prBodyObj)

  exercise.value = ''
  prNumber.value = ''
  unit.value = ''
}

prForm.addEventListener('submit', submitPrHandler)

getPastPrsBtn.onclick = function () {
  axios.get(`${baseURL}/pr`)
    .then(prsCallback)
}

hidePastPrsBtn.onclick = function () {
  prsContainer.innerHTML = ''
}

function createPrCard(pr) {
  const prCard = document.createElement('div')
  prCard.classList.add('pr-card')

  prCard.innerHTML = `<p></p>
  <div class="pr-btns-container">
      <p class="pr-exercise">${pr.exercise}</p>
      <p class="pr-number-unit">${pr.prNumber} ${pr.unit}</p>
      <button class="past-pr-btn" id="minus" onclick="updatePr(${pr.id}, 'minus')">-</button>
      <button class="past-pr-btn" id="plus" onclick="updatePr(${pr.id}, 'plus')">+</button>
      <button class="past-pr-btn" id="delete-pr" onclick="deletePr(${pr.id})">delete</button>
  </div>
  `;

  prsContainer.appendChild(prCard)
}

function displayPrs(arr) {
  prsContainer.innerHTML = ``
  for (let i = 0; i < arr.length; i++) {
    createPrCard(arr[i])
  }
}


function submitHandler(event) {
  event.preventDefault()

  let date = document.getElementById("session-date")
  let text = document.getElementById("session-log-input")

  let bodyObj = {
    date: date.value,
    text: text.value,
  }

  postWorkout(bodyObj)

  date.value = ''
  text.value = ''
}


function createWorkoutCard(workout) {
  const workoutCard = document.createElement('div')
  workoutCard.classList.add('workout-card')

  workoutCard.innerHTML = `<p></p>
  <p class="past-session-date">${workout.date}</p>
  <div class="btns-container">
      <textarea class="textarea">${workout.text}</textarea>
      <button class="past-btn" id="delete" onclick="deleteWorkout(${workout.id})">delete</button>
  </div>
  `;

  workoutsContainer.appendChild(workoutCard)
}

function displayWorkouts(arr) {
  workoutsContainer.innerHTML = ``
  for (let i = 0; i < arr.length; i++) {
    createWorkoutCard(arr[i])
  }
}

form.addEventListener('submit', submitHandler)


getPastSessionsBtn.onclick = function () {
  axios.get(baseURL)
    .then(workoutsCallback)
}

hidePastSessionsBtn.onclick = function () {
  workoutsContainer.innerHTML = ''
}


let count = 0;
setDecBtn.addEventListener('click', () => {
  count --;
  if (count < 0) {
    count = 0
  }
  setCountNum.innerHTML = count;
})

setIncBtn.addEventListener('click', () => {
  count ++;
  setCountNum.innerHTML = count;
})

setResetBtn.addEventListener('click', () => {
  count = 0
  setCountNum.innerHTML = count
})



class Timer {
    constructor(root) {
      root.innerHTML = Timer.getHTML();
  
      this.el = {
        minutes: root.querySelector(".timer__part--minutes"),
        seconds: root.querySelector(".timer__part--seconds"),
        control: root.querySelector(".timer__btn--control"),
        reset: root.querySelector(".timer__btn--reset")
      };
  
      this.interval = null;
      this.remainingSeconds = 0;
  
      this.el.control.addEventListener("click", () => {
        if (this.interval === null) {
          this.start();
        } else {
          this.stop();
        }
      });
  
      this.el.reset.addEventListener("click", () => {
        const inputMinutes = prompt("Enter number of minutes:");
  
        if (inputMinutes < 60) {
          this.stop();
          this.remainingSeconds = inputMinutes * 60;
          this.updateInterfaceTime();
        }
      });
    }
  
    updateInterfaceTime() {
      const minutes = Math.floor(this.remainingSeconds / 60);
      const seconds = this.remainingSeconds % 60;
  
      this.el.minutes.textContent = minutes.toString().padStart(2, "0");
      this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }
  
    updateInterfaceControls() {
      if (this.interval === null) {
        this.el.control.innerHTML = `<span class="material-icons">START</span>`;
        this.el.control.classList.add("timer__btn--start");
        this.el.control.classList.remove("timer__btn--stop");
      } else {
        this.el.control.innerHTML = `<span class="material-icons">PAUSE</span>`;
        this.el.control.classList.add("timer__btn--stop");
        this.el.control.classList.remove("timer__btn--start");
      }
    }
  
    start() {
      if (this.remainingSeconds === 0) return;
  
      this.interval = setInterval(() => {
        this.remainingSeconds--;
        this.updateInterfaceTime();
  
        if (this.remainingSeconds === 0) {
          this.stop();
        }
      }, 1000);
  
      this.updateInterfaceControls();
    }
  
    stop() {
      clearInterval(this.interval);
  
      this.interval = null;
  
      this.updateInterfaceControls();
    }
  
    static getHTML() {
      return `
              <span class="timer__part timer__part--minutes">00</span>
              <span class="timer__part">:</span>
              <span class="timer__part timer__part--seconds">00</span>
              <button type="button" class="timer__btn timer__btn--control timer__btn--start">
                  <span class="material-icons">START</span>
              </button>
              <button type="button" class="timer__btn timer__btn--reset">
                  <span class="material-icons">RESET</span>
              </button>
          `;
    }
  }
  
  new Timer(
      document.querySelector(".timer")
  );