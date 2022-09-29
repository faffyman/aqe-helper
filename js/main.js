function roundTo10(N)
{
  return Math.ceil(N / 10) * 10
}


function randomIntFromInterval(min, max) { // min and max included
  return  Math.floor(Math.random() * (max - min + 1) + min);
}


// Convert Radians to Degrees
function radians_to_degrees(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}


function randItem(list) {
  // "~~" for a closest "int"
  return list[~~(list.length * Math.random())];
}

function randFromList(items) {
  // "|" for a kinda "int div"
  return items[items.length * Math.random() | 0];
}

Array.prototype.randomitem = function () {
  return this[Math.floor((Math.random()*this.length))];
}


// generate a list of numbers to nearest 10.
function rangeBig(start, stop, step) {
  if (typeof stop == 'undefined') {
    // one param defined
    stop = start;
    start = 0;
  }

  if (typeof step == 'undefined') {
    step = 1;
  }

  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return [];
  }

  var result = [];
  for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }

  return result;
};




function logScore(activityID, question) {

  myTotalScore = localStorage.getItem('myscore');
  numQuestions = localStorage.getItem('numquestions');
  thisActivityScore = localStorage.getItem(activityID);
  incorrects = localStorage.getItem('incorrects');




  if(isNaN( thisActivityScore) || null=== thisActivityScore || undefined=== thisActivityScore) {
    thisActivityScore = 0;
  }

  if(isNaN( myTotalScore)  || null=== myTotalScore || undefined=== myTotalScore) {
    myTotalScore = 0;
  }

  if(isNaN( numQuestions) || null === numQuestions || undefined=== numQuestions || '' === numQuestions) {
    numQuestions = 0;
  }


  if(null === incorrects || undefined=== incorrects || '' === incorrects) {
    incorrects = [];
  } else {
    incorrects = incorrects.split(',');
  }

  myTotalScore = parseInt(myTotalScore) + parseInt(thisScore);
  thisActivityScore = parseInt(thisActivityScore) + parseInt(thisScore);

  if(undefined !== question) {
    numQuestions = parseInt(numQuestions) + parseInt(1);
    // if(undefined !== question.incorrect && question.incorrect.length >= 1) {
    //   incorrects.push(question.incorrect);
    // }
  }

  localStorage.setItem(activityID, thisActivityScore);
  localStorage.setItem('myscore', myTotalScore);
  localStorage.setItem('numquestions', numQuestions);

  //localStorage.setItem('incorrects', incorrects ?? []);


  // show or update visual scores
  document.getElementById('totalscore').innerText = myTotalScore ?? 0;
  document.getElementById(activityID).innerText = thisActivityScore ?? 0;
  document.getElementById('numquestions').innerText = numQuestions ?? 0;

}

function enableNextQuestionButton()
{
  var nq = document.getElementById('nextquestion');
  nq.ariaDisabled = false;
  nq.removeAttribute('disabled');
  nq.classList.remove('bg-slate-300','text-slate-500','hover:bg-teal-100');
  nq.classList.add('bg-white','text-teal-800','hover:bg-teal-100');
}


function disableNextQuestionButton()
{
  var nq = document.getElementById('nextquestion');
  nq.ariaDisabled = true;
  nq.setAttribute('disabled','true');
  nq.classList.add('bg-slate-300','text-slate-500','hover:bg-teal-100');
  nq.classList.remove('bg-white','text-teal-800','hover:bg-teal-100');
}



// SERVCIE WORKER
function registerOurServiceWorker() {
  console.log("Installing service worker")
  //First check if browser support service worker
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").then(
      registration => {
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        )
      },
      err => {
        console.log("ServiceWorker registration failed: ", err)
      }
    )
  }
}

registerOurServiceWorker()
