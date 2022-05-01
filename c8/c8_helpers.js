//c8_helpers.js - General purpose functions

//Generate random float value from min to max. Includes min, excludes max.
//min - minimum value
//max - maximum value
//returns float value between min and max. Includes min, excludes max.
function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

//Generate random integer value from min to max. Includes min, includes max.
function randomInt(min, max) {
  return Math.floor(randomFloat(min, max + 1));
}

//JavaScript doesn't do % modulo like other programming languages.
//https://web.archive.org/web/20090717035140if_/javascript.about.com/od/problemsolving/a/modulobug.htm
function programmerModulo(val, mod){
  return ((val % mod)+ mod) % mod;
}

//Retruns the selected 4 bits from a 16 bit value.
function getNibbleFromOpcode(opcode, index){
  var tempMask = 0x000F;
  //Number of right shift operations to move the nibble into the LSB spot
  var tempShift = 0;
  var tempNibble = 0;

  switch(index){
    case 1:
      tempMask = 0x00F0;
      tempShift = 4;
      break;
    case 2:
      tempMask = 0x0F00;
      tempShift = 8;
      break;
    case 3:
      tempMask = 0xF000;
      tempShift = 12;
      break;
    default:
  }
  //Make all other bits 0 except for the nibble we want.
  tempNibble = opcode & tempMask;
  //Shift the nibble into the LSB position
  tempNibble = tempNibble >>> tempShift; //zero fill shift

  return tempNibble;
}

//Compute an sdbm hash of a given ArrayBuffer.
function sdbmHash(buffer){
  var hash = 0;
  var buffer_view = new DataView(buffer);
  //For each byte in the buffer
  for(var i = 0; i < buffer.byteLength; i++){
    //http://www.cse.yorku.ca/~oz/hash.html
    hash = buffer_view.getUint8(i) + (hash << 6) + (hash << 16) - hash;
  }
  return hash;
}
