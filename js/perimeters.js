


var thisScore = 0;
var isRecheck = 0;

// Hint ~~ converts to closest Integer

// a rectangle with aportion cut out
// the CutOUt will be in one of the four corners
// (top Left) TL, TR, BR, BL (Bottom Left)

var cutOutRectangle = {
  // Labels
  'longSide': 0,
  'longHeight': 0,
  'shortSide': 0,
  'shortHeight': 0,
  'indentSide': 0,
  'indentHeight': 0,
  // actual Pixels
  'longSidePx': 0,
  'longHeightPx': 0,
  'shortSidePx': 0,
  'shortHeightPx': 0,
  'indentLPx': 0,
  'indentHPx': 0,
  // Questions
  'shadedArea': 0,
  'perimeter': 0,
  'cutoutPosition': 'TL',
  'incorrect': []
};

function calculateShape()
{
  positions = ['TL', 'TR', 'BR', 'BL' ];
  cutOutRectangle.cutoutPosition =  positions.randomitem();

  possLengths= rangeBig(300,550,10);
  possHeights = rangeBig(250,480,10);
  // Pixel Sizes

  maxLength = possLengths.randomitem();
  maxHeight = possHeights.randomitem();
  indentL = (maxLength / randItem([2,3,4,5,6,7]) );
  indentH = (maxHeight / randItem([2,3,4,5,6,7]) );
  shortLength = parseInt(maxLength - indentL);
  shortHeight = parseInt(maxHeight - indentH);


  // Display Labels.
  var numberSimplifier = randItem([40,45,50]);
  maxLengthLabel = Math.round(maxLength/numberSimplifier);
  maxHeightLabel = Math.round(maxHeight/numberSimplifier);
  shortLengthLabel =  Math.round(shortLength/numberSimplifier);
  shortHeightLabel =  Math.round(shortHeight/numberSimplifier);

  cutOutRectangle.indentSide = (maxLengthLabel - shortLengthLabel); // recorded in display scale
  cutOutRectangle.indentHeight = (maxHeightLabel - shortHeightLabel);

  cutOutRectangle.longSide =  maxLengthLabel;
  cutOutRectangle.longHeight =  maxHeightLabel;
  cutOutRectangle.shortSide =  shortLengthLabel;
  cutOutRectangle.shortHeight =  shortHeightLabel;

  cutOutRectangle.longSidePx = maxLength;
  cutOutRectangle.longHeightPx = maxHeight;
  cutOutRectangle.shortSidePx = shortLength;
  cutOutRectangle.shortHeightPx = shortHeight;
  cutOutRectangle.indentLPx = indentL;
  cutOutRectangle.indentHPx = indentH;

  cutOutRectangle.perimeter = (2 * maxLengthLabel) + (2 * maxHeightLabel);
  // Area outer
  cutOutRectangle.areaOuter = cutOutRectangle.longSide * cutOutRectangle.longHeight;
  // area cutout
  cutOutRectangle.areaIndent = cutOutRectangle.indentSide * cutOutRectangle.indentHeight;
  cutOutRectangle.shadedArea = cutOutRectangle.areaOuter - cutOutRectangle.areaIndent;

  // console.log(cutOutRectangle);
}


function drawShape(canvasID){

  calculateShape();

  // start upper left corner
  var canvas = document.getElementById(canvasID);
  if (canvas.getContext) {
    var context = canvas.getContext('2d');

    // clear it in case it had a previous drawing.
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();


    // Across
    context.moveTo(50,50);

    // Fill Large Outer Rectangle
    context.fillStyle = '#7c7c7c';
    context.fillRect(50,50, cutOutRectangle.longSidePx, cutOutRectangle.longHeightPx);

    if(cutOutRectangle.cutoutPosition=='TL') {
      context.clearRect(50,50, cutOutRectangle.indentLPx, cutOutRectangle.indentHPx);
      context.fillStyle = 'black';
      // Move down and draw labels
      context.fillText(  'A' , parseInt(45+(cutOutRectangle.indentLPx/2)), parseInt(45+cutOutRectangle.indentHPx));
      context.fillText(  'B' , parseInt(40+(cutOutRectangle.indentLPx)), parseInt(50+cutOutRectangle.indentHPx/2));

      context.fillText(  cutOutRectangle.shortSide + ' cm' , parseInt(40 + cutOutRectangle.indentLPx + (  cutOutRectangle.shortSidePx / 2) ), 45);
      context.fillText( cutOutRectangle.shortHeight +  ' cm',15 , 40 +  cutOutRectangle.indentHPx + (cutOutRectangle.shortHeightPx/2) );

      context.fillStyle = 'white';
      context.fillText( cutOutRectangle.longSide +  ' cm',50 + (cutOutRectangle.longSidePx/2), 40 + (cutOutRectangle.longHeightPx) );
      context.fillText( cutOutRectangle.longHeight +  ' cm',15 + cutOutRectangle.longSidePx, 45 + (cutOutRectangle.longHeightPx/2) );



    } else if (cutOutRectangle.cutoutPosition=='TR') {
      context.clearRect(parseInt(51 + cutOutRectangle.shortSidePx),50  , cutOutRectangle.indentLPx, cutOutRectangle.indentHPx);
      context.fillStyle = 'black';

      context.fillText(  'A' , parseInt(50 +  cutOutRectangle.shortSidePx + (cutOutRectangle.indentLPx/2)), parseInt(45 + cutOutRectangle.indentHPx));
      context.fillText(  'B' , parseInt(54 + cutOutRectangle.shortSidePx), parseInt(55+(cutOutRectangle.indentHPx/2)) );


      context.fillText(  cutOutRectangle.shortSide + ' cm' , parseInt(40 + (  cutOutRectangle.shortSidePx / 2) ), 45);
      context.fillText( cutOutRectangle.longHeight +  ' cm',20 , 50 + (cutOutRectangle.longHeightPx/2) );

      context.fillStyle = 'white';
      context.fillText( cutOutRectangle.longSide +  ' cm',50 + (cutOutRectangle.longSidePx/2), 40 + (cutOutRectangle.longHeightPx) );
      context.fillText( cutOutRectangle.shortHeight +  ' cm',(25 + cutOutRectangle.longSidePx)  , 40 +  cutOutRectangle.indentHPx + (cutOutRectangle.shortHeightPx/2) );


    } else if (cutOutRectangle.cutoutPosition=='BR') {

      context.clearRect((51 + cutOutRectangle.shortSidePx),(51 + cutOutRectangle.shortHeightPx), cutOutRectangle.indentLPx, cutOutRectangle.indentHPx);
      context.fillStyle = 'black';
      // Move down and draw labels
      context.fillText(  'A' , parseInt(50 + cutOutRectangle.shortSidePx + (cutOutRectangle.indentLPx/2)), parseInt(65+cutOutRectangle.shortHeightPx));
      context.fillText(  'B' , parseInt(53+(cutOutRectangle.shortSidePx)), parseInt(50+ cutOutRectangle.shortHeightPx +(cutOutRectangle.indentHPx/2)) );



      context.fillText( cutOutRectangle.longHeight +  ' cm',15, 45 + (cutOutRectangle.longHeightPx/2) );
      context.fillText( cutOutRectangle.longSide +  ' cm',50 + (cutOutRectangle.longSidePx/2), 40  );
      context.fillStyle = 'white';
      context.fillText(  cutOutRectangle.shortHeight + ' cm' , parseInt(20 + cutOutRectangle.longSidePx) , 40 + (cutOutRectangle.shortHeightPx/2) );
      context.fillText( cutOutRectangle.shortSide +  ' cm',45 + (cutOutRectangle.shortSidePx/2) , 40 + cutOutRectangle.longHeightPx  );

    } else if (cutOutRectangle.cutoutPosition=='BL') {

      context.clearRect((50 ),(51 + cutOutRectangle.shortHeightPx), cutOutRectangle.indentLPx, cutOutRectangle.indentHPx);

      context.fillStyle = 'black';
      // Move down and draw labels
      context.fillText(  'A' , parseInt(50 + (cutOutRectangle.indentLPx/2)), parseInt(60+cutOutRectangle.shortHeightPx));
      context.fillText(  'B' , parseInt(40 + (cutOutRectangle.indentLPx) ), parseInt(50+ cutOutRectangle.shortHeightPx +(cutOutRectangle.indentHPx/2)) );


      context.fillText(  cutOutRectangle.shortHeight + ' cm' , 15, 45 + (cutOutRectangle.shortHeightPx/2));
      context.fillText( cutOutRectangle.longSide +  ' cm',50 + (cutOutRectangle.longSidePx/2), 40  );
      context.fillStyle = 'white';
      context.fillText( cutOutRectangle.longHeight +  ' cm', parseInt(20 + cutOutRectangle.longSidePx) , 40 + (cutOutRectangle.longHeightPx/2) );
      context.fillText( cutOutRectangle.shortSide +  ' cm',45 + cutOutRectangle.indentLPx + (cutOutRectangle.shortSidePx/2) , 40 + cutOutRectangle.longHeightPx  );

    }

    //context.stroke();
  }


}





// ------------------------------------------------


function checkAnswers(){

  checkSizeA();

  checkSizeB();

  checkPerimeter();

  checkShadedArea();


  window.setTimeout(function (){
    isRecheck = true;
  },500);

  logScore('perimeterscore', cutOutRectangle);

  // Allow user to jump to next question now
  var nq = document.getElementById('nextquestion');
  nq.ariaDisabled = false;
  nq.removeAttribute('disabled');
  nq.classList.remove('bg-slate-300','text-slate-500','hover:bg-teal-100');
  nq.classList.add('bg-white','text-teal-800','hover:bg-teal-100');

}

function checkSizeA(){
  var submittedAnswer = document.getElementById('sideA').value ;
  if(submittedAnswer == cutOutRectangle.indentSide) {
    document.getElementById('sideA').classList.remove('bg-pink-400','text-red-800', 'text-green-900');
    document.getElementById('sideA').classList.add('bg-green-300', 'text-green-900');
    if(isRecheck === false) {
      thisScore =  parseInt(thisScore + 1);
    }
  } else if(submittedAnswer != '') {
    document.getElementById('sideA').classList.remove('bg-green-300', 'text-green-900');
    document.getElementById('sideA').classList.add('bg-pink-400','text-red-800');
    cutOutRectangle.incorrect.push('missing length');
  } else {
    document.getElementById('sideA').classList.remove('bg-green-300', 'text-green-900', 'bg-pink-400', 'text-red-800');
  }

}

function checkSizeB(){

  var submittedAnswer = document.getElementById('sideB').value ;
  if(submittedAnswer == cutOutRectangle.indentHeight) {
    document.getElementById('sideB').classList.remove('bg-pink-400','text-red-800', 'text-green-900');
    document.getElementById('sideB').classList.add('bg-green-300', 'text-green-900');
    if(isRecheck === false) {
      thisScore =  parseInt(thisScore + 1);
    }
  } else if(submittedAnswer != '') {
    document.getElementById('sideB').classList.remove('bg-green-300', 'text-green-900');
    document.getElementById('sideB').classList.add('bg-pink-400','text-red-800');
    cutOutRectangle.incorrect.push('missing height');
  } else {
    document.getElementById('sideB').classList.remove('bg-green-300', 'text-green-900', 'bg-pink-400', 'text-red-800');
  }

}

function checkPerimeter(){
  var submittedAnswer = document.getElementById('perim').value ;
  if(submittedAnswer == cutOutRectangle.perimeter) {
    document.getElementById('perim').classList.remove('bg-pink-400','text-red-800', 'text-green-900');
    document.getElementById('perim').classList.add('bg-green-300', 'text-green-900');
    if(isRecheck === false) {
      thisScore =  parseInt(thisScore + 1);
    }
  } else if(submittedAnswer != '') {
    document.getElementById('perim').classList.remove('bg-green-300', 'text-green-900');
    document.getElementById('perim').classList.add('bg-pink-400','text-red-800');
    cutOutRectangle.incorrect.push('perimeter');
    console.log({'Perim Wrong': cutOutRectangle.incorrect});
  } else {
    document.getElementById('perim').classList.remove('bg-green-300', 'text-green-900', 'bg-pink-400', 'text-red-800');
  }

}

function checkShadedArea(){

  var submittedAnswer = document.getElementById('area').value ;
  if(submittedAnswer == cutOutRectangle.shadedArea) {
    document.getElementById('area').classList.remove('bg-pink-400','text-red-800', 'text-green-900');
    document.getElementById('area').classList.add('bg-green-300', 'text-green-900');
    if(isRecheck === false) {
      thisScore =  parseInt(thisScore + 1);
    }
  } else if(submittedAnswer != '') {
    document.getElementById('area').classList.remove('bg-green-300', 'text-green-900');
    document.getElementById('area').classList.add('bg-pink-400','text-red-800');
    cutOutRectangle.incorrect.push('area of irregular shape');
  } else {
    document.getElementById('area').classList.remove('bg-green-300', 'text-green-900', 'bg-pink-400', 'text-red-800');
  }

}


// -----------------------------


function resetForm(){

  // Type
  document.getElementById('sideA').value = '';
  document.getElementById('sideA').classList.remove('bg-green-300','bg-pink-400');

  //Missing Angle
  document.getElementById('sideB').value = '';
  document.getElementById('sideB').classList.remove('bg-green-300','bg-pink-400');

  // Perimeter
  document.getElementById('perim').value = '';
  document.getElementById('perim').classList.remove('bg-green-300','bg-pink-400');

  // Area
  document.getElementById('area').value = '';
  document.getElementById('area').classList.remove('bg-green-300','bg-pink-400');

  isRecheck = false;
  thisScore = 0;

}
