
var x1,x2,x3,y1,y2,y3; // coordinates
var L1,L2,L3; //line lengths
var height; // triangle height
var A,B,C; // angles

var triangle = {};


var isRecheck = false; // initial state for new questions
var thisScore = 0;


// Angle A is the angel opposite L1 or angle between L2 and L3
// Angle B is the angel opposite L2 or angle between L1 and L3
// Angle C is the angel opposite L3 or angle between L1 and L2

/**
 * Generate 3 coordinates on a triangle
 * Coord 1 is bottom left
 * coord 2 is bottom right
 * coord 3 is upper point
 *
 * min coord is 10,10 -> 10,590
 * max size is 590,10, => 590,590
 *
 */
function generateCoords()
{

  //pinck a type
  types = ['equi',"isosceles","rightangleright","rightangleleft","scalene"];
  type  = types[randomIntFromInterval(0, 4)];

  x1 =      roundTo10(randomIntFromInterval(10, 100));

  y1 = y2 = roundTo10(randomIntFromInterval(450, 530) );

  x2 = roundTo10(randomIntFromInterval(450, 500) );

  // Top point depends on triangel type
  if(type=="equi" || type=="isosceles") {
    x3 = ((x2-x1)/2) + x1;
    x3 = parseInt(x3);
  }

  if(type=="rightangleright") {
    x3 = x2;
  }

  if(type=="rightangleleft") {
    x3 = x1;
  }

  if(type=="scalene") {
    x3 = roundTo10( randomIntFromInterval(x1+20,x2+20) );
  }

  y3 = roundTo10( randomIntFromInterval(10, 250) );

  // for equilateral y3 has to have a position such that all side are same length
  // Time for more Pythagoras Theorem
  if(type=="equi") {
    var hypotenuse = (x2-x1)
    var ysub_2  = Math.pow(hypotenuse,2) - Math.pow((hypotenuse/2),2) ;
    var ysub = Math.sqrt(ysub_2);
    y3 = y1 - ysub;
  }

  var coords  = Array();
  coords["a"] = Array(x1,y1);
  coords["b"] = Array(x2,y2);
  coords["c"] = Array(x3,y3);


  //record values to global vars
  height = (y3-y1);  //triagne height
  L1 = (x2-x1); // triangle base - enough info for an Area now
  L2 = calculateLineDistance(coords["c"],coords["b"]);
  L3 = calculateLineDistance(coords["a"],coords["c"]);

  return coords;

}




function calculateLineDistance(point1, point2) {
  // (distance between x coordinates)^2 + (distance between y coordinates)^2 = (length of line)^2
  var xDistance = Math.abs(point2[0] - point1[0]);
  var yDistance = Math.abs(point2[1] - point1[1]);

  var LengthSquared = ( xDistance * xDistance ) + ( yDistance * yDistance );

  var length = Math.sqrt(LengthSquared);
  return parseInt(length);

}


function calculateAngles() {

  var L1p = Math.pow(L1,2);
  var L2p = Math.pow(L2,2);
  var L3p = Math.pow(L3,2);


  var Ar = Math.acos(( (L2p + L3p) - L1p ) / (2 * L2 * L3) );
  A = radians_to_degrees(Ar);


  var Br = Math.acos(( (L1p + L3p) - L2p) / (2 * L1 * L3) );
  B = radians_to_degrees(Br);


  var Cr = Math.acos(( (L1p + L2p) - L3p) / (2 * L1 * L2) );
  C = radians_to_degrees(Cr);


  A = A.toFixed(0);
  B = B.toFixed(0);
  C = C.toFixed(0);

//  var checksum = parseInt(A) + parseInt(B) + parseInt(C);
}




/**
 * Draw our triangle
 * @param canvasID
 * @param points
 */
function drawTriangle(canvasID, points)
{
  var canvas = document.getElementById(canvasID);
  if (canvas.getContext)
  {
    var context = canvas.getContext('2d');

    // clear it incas eit had a previous drawing.
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.moveTo(points["a"][0],points["a"][1]);

    context.lineTo(points["b"][0],points["b"][1]);
    context.lineTo(points["c"][0],points["c"][1]);
    context.lineTo(points["a"][0],points["a"][1]);
    context.stroke();

    // Add Line Lengths (for Perimeter Questions)
    //context.moveTo((x2-x1)/2, y1+5);
    context.font = "12pt Arial";

    L1Label ="Line a " + parseInt(L1/10) +" cm";
    L2Label ="Line b " + parseInt(L2/10) +" cm";
    L3Label ="Line c " + parseInt(L3/10) +" cm";
    context.fillText(L1Label, (x2-x1)/2, y1+15);
    context.fillText(L2Label, ((x2-x3)/2)+x3+5, (((y2-y3)/2) + y3));
    context.fillText(L3Label, ((x3-x1)/2)+x1+5, y1-((y1-y3)/2)  );


    x3coord = x3-6;
    var xmodifierb = 40;
    var xmodifierc = 60;
    if(type == 'rightangleleft') {
     x3coord = x3+10;
      xmodifierb = 20;
     // draw the right-angle marker
      context.beginPath();
      context.moveTo(x1+10,y1);
      context.lineTo(x1+10,y1-10);
      context.lineTo(x1,y1-10);
      context.stroke();

    }

    if(type == 'rightangleright') {
      x3coord = x3-10;
      xmodifierc = 40;

      // draw the right-angle marker
      context.beginPath();
      context.moveTo(x2-10,y2);
      context.lineTo(x2-10,y2-10);
      context.lineTo(x2,y2-10);
      context.stroke();

    }

    if(type=="equi" || type=="isosceles" || type=="scalene") {
      // Draw a height indicator dotted line
      var hstart = x2-((x2-x1)/2);
      context.beginPath();
      context.fillStyle = `rgb(240,180,180,0.5)`;
      context.strokeStyle = `rgb(240,180,180,0.7)`;
      //context.moveTo(hstart,y2);
      //context.lineTo(hstart,y3);

      context.moveTo(x3,y3);
      context.lineTo(x3,y1);

      context.setLineDash([10, 10,10,10]);
      context.stroke();
      context.setLineDash([]);

      // ADD a height label
      context.fillStyle = 'red'
      theight =  parseInt((y1-y3)/10);
      context.fillText("h=" +theight +"cm", x3+2, y3 + ((y1-y3)/2) -30);

    }


    // Add 2 Angles
    context.fillStyle = 'black';
      context.fillText(C +"º", (x2-xmodifierc), y2-5  );
    context.fillText(B + "º", x1+xmodifierb, y1-5   );


    context.fillText("X", x3coord, y3 + 40);

    //

    // build an Object for comparison
    populateTriangle();

  }
}

/**
 * Record all properties to a triangle Object
 */
 function populateTriangle() {
   triangle.angleA = parseInt(A);
   triangle.angleB = parseInt(B);
   triangle.angleC = parseInt(C);
   triangle.missingAngle = 180 - triangle.angleB - triangle.angleC;
   triangle.type = type;
   triangle.base = parseInt(L1/10);
   triangle.height = parseInt((y1-y3)/10);
   triangle.area = (triangle.base * triangle.height) / 2;
   triangle.perimeter = parseInt(L1/10) + parseInt(L2/10) + parseInt(L3/10);

   console.log("Triangle", triangle);
 }


function checkAnswers() {
  // check Types
  checkSubmittedType();

  // Check Missing Angle
  checkMissingAngle();

  // Check Perimeter
  checkPerimeter();

  // Check Area
  checkArea();

  window.setTimeout(function (){
    isRecheck = true;
  },500);
  console.log({'score':thisScore})
  logScore();

  // Allow user to jump to next question now
  var nq = document.getElementById('nextquestion');
  nq.ariaDisabled = false;
  nq.removeAttribute('disabled');
  nq.classList.remove('bg-slate-300','text-slate-500','hover:bg-teal-100');
  nq.classList.add('bg-white','text-teal-800','hover:bg-teal-100');


}

function checkSubmittedType() {
  submittedType = document.getElementById('ttype').value;

  if(submittedType == triangle.type || (submittedType=='rightangle' && (triangle.type=='rightangleleft' || triangle.type=='rightangleright') ) ) {
    document.getElementById('ttype').classList.remove('bg-pink-400','text-red-800', 'text-green-900');
    document.getElementById('ttype').classList.add('bg-green-300', 'text-green-900');
    if(isRecheck == false) {
      thisScore = parseInt(thisScore + 1);
    }

  } else if(submittedType != '' ) {
    document.getElementById('ttype').classList.remove('bg-green-300', 'text-green-900');
    document.getElementById('ttype').classList.add('bg-pink-400','text-red-800');
  } else {
    document.getElementById('ttype').classList.remove('bg-green-300', 'text-green-900','bg-pink-400','text-red-800');
  }


}

function checkMissingAngle() {
  submittedAngle = document.getElementById('angleq').value ;
  if(submittedAngle == triangle.missingAngle) {
    document.getElementById('angleq').classList.remove('bg-pink-400','text-red-800', 'text-green-900');
    document.getElementById('angleq').classList.add('bg-green-300', 'text-green-900');
    if(isRecheck == false) {
      thisScore =  parseInt(thisScore + 1);
    }
  } else if(submittedAngle != '') {
    document.getElementById('angleq').classList.remove('bg-green-300', 'text-green-900');
    document.getElementById('angleq').classList.add('bg-pink-400','text-red-800');
  } else {
    document.getElementById('angleq').classList.remove('bg-green-300', 'text-green-900','bg-pink-400','text-red-800');
  }

}

function checkPerimeter() {
  submittedAnswer = document.getElementById('tperim').value ;
  if(submittedAnswer == triangle.perimeter) {
    document.getElementById('tperim').classList.remove('bg-pink-400','text-red-800', 'text-green-900');
    document.getElementById('tperim').classList.add('bg-green-300', 'text-green-900');
    if(isRecheck == false) {
      thisScore =  parseInt(thisScore + 1);
    }
  } else if(submittedAnswer != '') {
    document.getElementById('tperim').classList.remove('bg-green-300', 'text-green-900');
    document.getElementById('tperim').classList.add('bg-pink-400','text-red-800');
  } else {
    document.getElementById('tperim').classList.remove('bg-green-300', 'text-green-900','bg-pink-400','text-red-800');
  }
}


function checkArea() {
  submittedAnswer = document.getElementById('tarea').value ;
  if(submittedAnswer == triangle.area) {
    document.getElementById('tarea').classList.remove('bg-pink-400','text-red-800', 'text-green-900');
    document.getElementById('tarea').classList.add('bg-green-300', 'text-green-900');
    if(isRecheck == false) {
      thisScore =  parseInt(thisScore + 1);
    }
  } else if(submittedAnswer != '') {
    document.getElementById('tarea').classList.remove('bg-green-300', 'text-green-900');
    document.getElementById('tarea').classList.add('bg-pink-400','text-red-800');
  } else {
    document.getElementById('tarea').classList.remove('bg-green-300', 'text-green-900','bg-pink-400','text-red-800');
  }
}


function resetForm() {
   // Type
  document.getElementById('ttype').selectedIndex = 0;
  document.getElementById('ttype').classList.remove('bg-green-300','bg-pink-400');

  //Missing Angle
  document.getElementById('angleq').value = '';
  document.getElementById('angleq').classList.remove('bg-green-300','bg-pink-400');

  // Perimeter
  document.getElementById('tperim').value = '';
  document.getElementById('tperim').classList.remove('bg-green-300','bg-pink-400');

  // Area
  document.getElementById('tarea').value = '';
  document.getElementById('tarea').classList.remove('bg-green-300','bg-pink-400');

  isRecheck = false;
  thisScore = 0;
}


function logScore() {

   myTotalScore = localStorage.getItem('myscore');
   myTrianglesScore = localStorage.getItem('mytrianglesscore');

   myTotalScore = parseInt(myTotalScore) + parseInt(thisScore);
   myTrianglesScore = parseInt(myTrianglesScore) + parseInt(thisScore);

   localStorage.setItem('mytrianglesscore', myTrianglesScore);
   localStorage.setItem('myscore', myTotalScore);

   // show or update visual scores
   document.getElementById('totalscore').innerText = myTotalScore ?? 0;
   document.getElementById('trianglesscore').innerText = myTrianglesScore ?? 0;



}
