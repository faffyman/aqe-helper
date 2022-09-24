


var thisScore = 0;
var isRecheck = 0;

// Hin t ~~ converts to closest Integer

// a rectangle with aportion cut out
// the CutOUt will be in one of the four corners
// (top Left) TL, TR, BR, BL (Bottom Left)

var cutOutRectangle = {
  'side1': 0,
  'side2': 0,
  'side3': 0,
  'side4': 0,
  'side5': 0,
  'side6': 0,
  'missingSideA': 0,
  'missingSideB': 0,
  'shadedArea': 0,
  'perimeter': 0,
  'cutoutPosition': 'TL'
};


function drawShape(){

  addLabelsToShape();
}

function addLabelsToShape(){}


// ------------------------------------------------


function checkAnswers(){

  checkSizeA();

  checkSizeB();

  checkPerimeter();

  checkShadedArea();

}

function checkSizeA(){}

function checkSizeB(){}

function checkPerimeter(){}

function checkShadedArea(){}


// -----------------------------

function logScore() {

  myTotalScore = localStorage.getItem('myscore');
  thisActivityScore = localStorage.getItem('perimeterscore');

  myTotalScore = parseInt(myTotalScore) + parseInt(thisScore);
  thisActivityScore = parseInt(thisActivityScore) + parseInt(thisScore);

  localStorage.setItem('perimeterscore', thisActivityScore);
  localStorage.setItem('myscore', myTotalScore);

  if(isNaN( thisActivityScore) ) {
    thisActivityScore = 0;
  }

  // show or update visual scores
  document.getElementById('totalscore').innerText = myTotalScore ?? 0;
  document.getElementById('perimeterscore').innerText = thisActivityScore ?? 0;

}

function resetForm(){}
