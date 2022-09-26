


var thisScore = 0;
var isRecheck = 0;

// Hint ~~ converts to closest Integer

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


function drawShape(canvasID){

  positions = ['TL', 'TR', 'BR', 'BL' ];
  cutOutRectangle.cutoutPosition = positions.randomitem();
  // for 1 to 6; draw line, turn 90deg, draw line

  possLengths= rangeBig(320,550,10);
  possHeights = rangeBig(250,550,10);
  maxLength = possLengths.randomitem();
  maxHeight = possHeights.randomitem();

  cutOutRectangle.length = maxLength / randItem([2,3,4,5,6,7]); //rand divisor between 2 and 6
  cutOutRectangle.height = maxHeight / randItem([3,4,5,6]) //rand divisor between 2 and 6;
  console.log(cutOutRectangle);

  // start upper left corner
  var canvas = document.getElementById(canvasID);
  if (canvas.getContext) {
    var context = canvas.getContext('2d');

    // clear it incas eit had a previous drawing.
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.moveTo(50,50);
    context.lineTo(maxLength,50)
    context.stroke();
  }

  addLabelsToShape();
}

function addLabelsToShape(){}



//  Helpers
// ------------------------------------------------



// ------------------------------------------------


function checkAnswers(){

  checkSizeA();

  checkSizeB();

  checkPerimeter();

  checkShadedArea();

  logScore('perimeterscore')

}

function checkSizeA(){}

function checkSizeB(){}

function checkPerimeter(){}

function checkShadedArea(){}


// -----------------------------


function resetForm(){}
