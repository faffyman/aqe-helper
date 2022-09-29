// placeholder


var measureTypes = {
  "distance": [
    {
      "largeUnit":"Km",
      "smallUnit": "m",
      "maxSmall": 1000
    },
    {
      "largeUnit":"m",
      "smallUnit": "cm",
      "maxSmall": 100
    },
  ],

  "weight": [
    {
      "largeUnit":"Kg",
      "smallUnit": "g",
      "maxSmall": 1000
    }
  ],

  "height": [
    {
      "largeUnit":"m",
      "smallUnit": "cm",
      "maxSmall": 100
    }
  ],

   "volume":  [
     {
       "largeUnit":"L",
       "smallUnit": "ml",
       "maxSmall": 1000
     }
   ],
  "cost":  [
    {
      "largeUnit":"$",
      "smallUnit": "c",
      "maxSmall": 100,
    },
    {
      "largeUnit":"£",
      "smallUnit": "p",
      "maxSmall": 100
    },
    {
      "largeUnit":"€",
      "smallUnit": "c",
      "maxSmall": 100
    },
  ]
};


var Question = {
  'largeAmount' :0,
  'smallAmount': 0,
  'largeUnits': 'Kg',
  'smallUnits': 'g',
  'base': 1000
}


let qType = randItem(["volume","weight","distance","height"]);
var qUnits = randItem(measureTypes[qType]);
console.log( qUnits );



function generateAQuestion()
{

}
