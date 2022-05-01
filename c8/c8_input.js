//c8_input.js - User input handling.
//InputHandler object adds keyboard event listeners. Only one InputHandler 
//is created for the page.

function InputHandler(){  
  this.c8Keylist = new Array(16).fill(false);
  //map of keys currently being pressed.
  this.mapCurrentKeys = new Map();

  this.initDefualtKeys();

  //keyboard event listeners.
  window.addEventListener('keyup', this.onRelease.bind(this), false);
  window.addEventListener('keydown', this.onPress.bind(this), false);
};

//CHIP-8 uses a hexidecimal keypad input. Map some qwert keyboard keys to match.
InputHandler.prototype.initDefualtKeys = function(){
  this.mapCurrentKeys.set("1", 0x1);
  this.mapCurrentKeys.set("2", 0x2);
  this.mapCurrentKeys.set("3", 0x3);
  this.mapCurrentKeys.set("4", 0xC);
  this.mapCurrentKeys.set("q", 0x4);
  this.mapCurrentKeys.set("w", 0x5);
  this.mapCurrentKeys.set("e", 0x6);
  this.mapCurrentKeys.set("r", 0xD);
  this.mapCurrentKeys.set("a", 0x7);
  this.mapCurrentKeys.set("s", 0x8);
  this.mapCurrentKeys.set("d", 0x9);
  this.mapCurrentKeys.set("f", 0xE);
  this.mapCurrentKeys.set("z", 0xA);
  this.mapCurrentKeys.set("x", 0x0);
  this.mapCurrentKeys.set("c", 0xB);
  this.mapCurrentKeys.set("v", 0xF);
};

//Is the passed key currently being pressed.
//key - DOMString designation or name alias of the key
//returns boolean - true if the key is currently down, false if it is not.
InputHandler.prototype.isDown = function(c8KeyValue){
  //If the key is found in the mapCurrentKeys map then it is being pressed.
  return this.c8Keylist[c8KeyValue];
};

//Check if any CHIP-8 key is being pressed.
//Returns the key value if a key is being pressed. If no key is pressed, return -1.
InputHandler.prototype.isAnyKeyDown = function(){
  //From 0x0 to 0xF
  for(var i = 0; i < 16; i++){
    if(this.c8Keylist[i] == true){
      return i;
    }
  }
  //If the key is found in the mapCurrentKeys map then it is being pressed.
  return -1;
};

//Function passed to the EventListener. Handles keyboard keydown events.
//event - KeyboardEvent
InputHandler.prototype.onPress = function(event){
  //Add the key to the mapCurrentKeys map. If it's already in the map it will be
  //updated, if it's not then it will be added. If the key is in the
  //mapCurrentKeys map then it is being pressed.
  var tempCurrentKeyValue = this.mapCurrentKeys.get(event.key)
  if(tempCurrentKeyValue != undefined){
    this.c8Keylist[tempCurrentKeyValue] = true;
  }
};

//Function passed to the EventListener. Handles keyboard keyup events.
//event - KeyboardEvent
InputHandler.prototype.onRelease = function(event){
  //keyup is only triggered once on release. Just have to delete the value from
  //the mapCurrentKeys map to recognize that it is no longer being pressed.
  var tempCurrentKeyValue = this.mapCurrentKeys.get(event.key)
  if(tempCurrentKeyValue != undefined){
    this.c8Keylist[tempCurrentKeyValue] = false;
  }
};
