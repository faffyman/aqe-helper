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

// All of teh above randomizerw ill pick a random item from a list

mylist = ['cat','fish','bear','owl','mouse','dog','elefant','goose','rabbit'];

r1 = randItem(mylist);
r2 = randFromList(mylist);

r3 =mylist.randomitem();

console.log({'randItem':r1,'randFromList':r2,'prototype':r3, 'list':mylist})


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


possNums = rangeBig(10,500,10);

console.log('randomNum', possNums.randomitem());
console.log('randomNum', possNums.randomitem());
console.log('randomNum', possNums.randomitem());
console.log('randomNum', possNums.randomitem());
console.log('randomNum', possNums.randomitem());
console.log('randomNum', possNums.randomitem());
