//c8_main.js - Main file

//Notes:
//https://en.wikipedia.org/wiki/CHIP-8
//https://github.com/dmatlack/chip8/tree/master/roms
//http://mattmik.com/files/chip8/mastering/chip8.html

//For Debugging
//Dump the memory to a table at the bottom of the page.
function outputMemory(){
  //Number of columns wide for the output table.
  var outputCols = 64;
  var table = document.getElementById("memdump");

  //Clear the current table spot just in case there is currenty a table there.
  table.innerHTML = "";

  for(var j = 0; j < (C8_MEMORY_SIZE / outputCols); j ++){
    //New row in table.
    var curRow = table.insertRow(j);
    for(var i = 0; i < outputCols; i++){
      //New cell in current row.
      var curCell = curRow.insertCell(i);
      //Convert XY position to linear array position
      var curMem = i+(j*outputCols);
      //Jam in the memory address and contents at that address in the current cell.
      curCell.innerHTML = "<p style=\"font-size:10px;margin-top:0em;margin-bottom:0em\">" + curMem.toString(16).padStart(3, "0").toUpperCase() + "</p><p style=\"font-size:18px;margin-top:0em;margin-bottom:0em\">" + c8Memory_U8View[curMem].toString(16).padStart(2, "0").toUpperCase() + "</p>";
    }
  }
}

//Load a ROM that is stored as JS array of 16 bit numbers into a new buffer
//AKA the ROMs stored in c8_data.js
//return the buffer
function loadProgramFrom16Array(array){
  var bufferByteLength = array.length * 2;
  var newBuffer = new ArrayBuffer(bufferByteLength);
  var newBuffer_View = new DataView(newBuffer);
  
  for(var i = 0; i < array.length; i++){
    newBuffer_View.setUint16(i*2, array[i], false);
  }

  return newBuffer;
}

//Load the defualt font into CHIP-8 memory
function loadFontIntoMemory(font){
  //For each letter in the font
  for(var i = 0; i < font.length; i++){
    //Each character is a sprite that is 8 bits wide by 5 bits high.
    loadSpriteArrayIntoMemory(c8FontStartAddress + (i * 5), font[i], 5)
  }
}

//Load a sprite that is in a byte array form into CHIP-8 memory
//Sprites are always 8 bits wide
function loadSpriteArrayIntoMemory(memoryLocation, spriteArray, height){
  var currentMemoryLocation = 0;

  //For each row in the sprite
  for(var i = 0; i < height; i++){
    currentMemoryLocation = memoryLocation + i;
    c8Memory_View.setUint8(currentMemoryLocation, spriteArray[i]);
  }
}

//Clear the canvas.
function clearDisplayCanvas(){
  //Clear the canvas by drawing a filled rectangle over the whole thing
  contextDisplay.fillStyle = "rgb(" + backgroundColor.r + ", " + backgroundColor.g + ", " + backgroundColor.b + ")";
	contextDisplay.fillRect(0, 0, canvasDisplay.width, canvasDisplay.height);
};

//Clear the display memory buffer by filling it with 0 values.
function clearDisplayBuffer(){
  c8DisplayBuffer.fill(0);
}

//Clear the display memory and the canvas.
function clearDisplay(){
  clearDisplayBuffer();
  clearDisplayCanvas();
}

//Draw a pixel on the canvas. Grayscale transition for position is handled
//by setting the alpha value of the pixel.
function setDisplayPixel(x, y, persistance=1){
  //Calculate the actual canvas pixel location by accounting for pixel scale
  var realX = x * c8DisplayPixelWidth;
  var realY = y * c8DisplayPixelHeight;
  //TODO: It would probably be best to generate a look up table of color values
  contextDisplay.fillStyle = "rgba(" + forgroundColor.r + ", " + forgroundColor.g + ", " + forgroundColor.b + ", " + persistance + ")";
  contextDisplay.fillRect(realX, realY, c8DisplayPixelWidth, c8DisplayPixelHeight);
}

//Take the data in the display buffer and draw it on the canvas. Update pixel
//persistance data in the process.
function drawDisplayBuffer(){
  var currentBufferIndex;
  var curBufferValue;
  var curPixelValue;
  //For each row of the CHIP-8 display.
  for(var row = 0; row < c8DisplayHeight; row++){
    //For each column in the current row.
    for(var col = 0; col < c8DisplayWidth; col++){
      //Calculator the linear array position from the XY position of the pixel.
      currentBufferIndex = (row * c8DisplayWidth) + col;
      //Current pixel value.
      curBufferValue = c8DisplayBuffer[currentBufferIndex];
      //Decay the persistance value of the current pixel.
      c8DisplayPersistance[currentBufferIndex] -= displayDecayRate;
      //Make sure the persistance value doesn't fall below 0
      if(c8DisplayPersistance[currentBufferIndex] < 0.0){
        c8DisplayPersistance[currentBufferIndex] = 0.0;
      }
      //If the pixel is set then there is no decay.
      if(curBufferValue == 1){
        c8DisplayPersistance[currentBufferIndex] = curBufferValue;
      }
      //Draw the pixel using the current persistance decay value.
      curPixelValue = c8DisplayPersistance[currentBufferIndex];
      if(curPixelValue > 0.0){
        setDisplayPixel(col, row, curPixelValue);
      }
    }
  }
}

//Set all registers to a zero value.
function clearAllRegisters(){
  //For each register in the register array
  for(var i = 0; i < c8RegisterArray.length; i++){
    c8RegisterArray[i] = 0;
  }
}

//Fill the entire CHIP-8 memory with zero values.
function clearMemory(){
  //For each byte in the CHIP-8 memory buffer.
  for(var i = 0; i < c8Memory_View.byteLength; i++){
    c8Memory_View.setUint8(i, 0);
  }
}

//Copy an ArrayBuffer into CHIP-8 program memory.
function copyArrayBufferToProgramMemory(buffer){
  var currentMemoryLocation = 0;
  var buffer_view = new DataView(buffer);

  //For each byte in the buffer.
  for(var i = 0; i < buffer.byteLength; i++){
    currentMemoryLocation = c8ProgramStartAddress + i;
    c8Memory_View.setUint8(currentMemoryLocation, buffer_view.getUint8(i));
  }
}

//Reload the currently loaded ROMs buffer into CHIP-8 memory
function reloadCurrentROMIntoMemory(){
  copyArrayBufferToProgramMemory(currentROMBuffer);
}

//Restart the currently selected ROM
function resetEmulator(){
  clearDisplay();
  clearAllRegisters();
  clearMemory();
  ioBlocking = false;
  c8RegisterArray[PC] = 0x200;
  c8StackCurrentFreeAddress = c8StackStartAddress;
  loadFontIntoMemory(font);
  reloadCurrentROMIntoMemory();
  outputAllRegisters(outputRegisterBase);
}

//Run on page load. Initialize the emulator and page into a defualt known state.
function init(){
  //InputHandler handles key events
  inputHandler = new InputHandler();
  //The browser (at least firefox) doesn't reset this on page refresh. Set this
  //back to the defualt on startup.
  selectBuiltInRoms.value = "chip8_rom"; 
  document.getElementById('ROMDiscriptionCollapsible').click();
  dbgMsg.textContent = "";
  //Add a listener for window resizes and run the function windowResize() if
  //the size of the window changes.
  window.addEventListener('resize', windowResize);
  //Run the window resizing function on startup to make sure the canvas is 
  //displaying correctly.
  windowResize();
  //Load the "boot ROM" into memory
  currentROMBuffer = loadProgramFrom16Array(startup_rom);
  //My "boot rom" is index 0 in the compatability list.
  setEmulatorToCompatabilitySettings(5);

  resetEmulator();

  //Set the settings HTML elements to their JavaScript variable counterpart
  //values.
  updateAllHTMLOptionElements();

  //Set the Emulator Internals table to some defualt values
  outputAllRegisters(outputRegisterBase);

  running = true;
}

//Update a timer register by subtracting the time since the last animation 
//frame in "target" increments. The CHIP-8 timer registers are decremented at a
//60Hz interval. So in that case would be decrement every time 16.67ms has past.
//returns the remaining time if it could not be evenly divided in "target" increments
function timerFrame(timer, remainder, target){
  var tempDTVal = c8RegisterArray[timer];

  if(tempDTVal >= 0){
    //Integer division to figure out how many times dT goes into the target delay
    var tempTotalTime = deltaTime + remainder;
    var tempDiv = tempTotalTime / target;
    var newRemainder = 0;
    tempDiv = Math.trunc(tempDiv);

    //if greater than 1 target increment
    if(tempDiv >= 1){
      tempDTVal = tempDTVal - tempDiv;
      if(tempDTVal < 0){
        tempDTVal = 0;
        newRemainder = 0;
      } else {
        newRemainder = tempTotalTime - (tempDiv * target);
      }
      c8RegisterArray[timer] = tempDTVal;
      return newRemainder;
    } else {
      return tempTotalTime;
    }
  }
}

//Take the instruction and determine what fuction to run.
function decodeOperation(opcode){
  var tempNibble0 = opcode & 0x000F; //Lower 4 bits
  var tempNibble3 = opcode & 0xF000; //Upper 4 bits
  var tempByte0 = opcode & 0x00FF; //Lower byte

  //CHIP-8 doesn't have very many instructions. Use a large switch tree to
  //determine what the instructions function is.
  switch(tempNibble3){
    case 0x0000:
      switch(tempByte0){
        case 0xE0: clearDisplay(); break;
        case 0xEE: instructionReturnSubroutine(opcode); break;
        default: instructionCallExternal(opcode);
      }
    break;
    case 0x1000: instructionJump(opcode); break;
    case 0x2000: instructionCallSubroutine(opcode); break;
    case 0x3000: instructionIfConstant(opcode); break;
    case 0x4000: instructionIfNotConstant(opcode); break;
    case 0x5000: instructionIfRegister(opcode); break;
    case 0x6000: instructionLoad(opcode); break;
    case 0x7000: instructionAddConstant(opcode); break;
    case 0x8000:
      switch(tempNibble0){
        case 0x0: instructionCopy(opcode); break;
        case 0x1: instructionOr(opcode); break;
        case 0x2: instructionAnd(opcode); break;
        case 0x3: instructionXor(opcode); break;
        case 0x4: instructionAddRegisters(opcode); break;
        case 0x5: instructionSubtractRegisters1(opcode); break;
        case 0x6: instructionRightShift(opcode); break;
        case 0x7: instructionSubtractRegisters2(opcode); break;
        case 0xE: instructionLeftShift(opcode); break;
      }
    break;
    case 0x9000: instructionIfNotegister(opcode); break;
    case 0xA000: instructionSetI(opcode); break;
    case 0xB000: instructionJumpOffset(opcode); break;
    case 0xC000: instructionRand(opcode); break;
    case 0xD000: instructionDraw(opcode); break;
    case 0xE000:
      switch(tempByte0){
        case 0x9E: instructionIfKeyPressed(opcode); break;
        case 0xA1: instructionIfKeyNotPressed(opcode); break;
      }
    break;
    case 0xF000:
      switch(tempByte0){
        case 0x07: instructionGetDelayTimer(opcode); break;
        case 0x0A: instructionWaitForKeyPress(opcode); break;
        case 0x15: instructionSetDelayTimer(opcode); break;
        case 0x18: instructionSetSoundTimer(opcode); break;
        case 0x1E: instructionSetDisplacedI(opcode); break;
        case 0x29: instructionFontAddress(opcode); break;
        case 0x33: instructionBCD(opcode); break;
        case 0x55: instructionSaveRegisters(opcode); break;
        case 0x65: instructionLoadRegisters(opcode); break;
      }
    break;
    default:
      console.log("Unknown Instruction: " + c8RegisterArray[PC] + " / " + opcode);
  }
}

//Run the emulator one cycle. Run the instruction at the current PC address.
function runPC(){
  //Get the instruction at address PC from CHIP-8 memory.
  var currentPC = c8RegisterArray[PC];
  var currentInstruction = c8Memory_View.getUint16(currentPC, false);

  //Run the instruction
  decodeOperation(currentInstruction);
  //If the debugging collapsable is open then update the register table.
  if(isDisplayingDebugOutput == true){
    outputAllRegisters(outputRegisterBase);
  }
  //If the instruction didn't modify PC then increment PC to the next instruction.
  if(skipPCIncrement == false){
    c8RegisterArray[PC] += 2
  } else {
    skipPCIncrement = false;
  }
}

//Main runner function. Called every animation frame.
function mainLoop(){
  mainFrameCount++;
  //Date.now() returns number of milliseconds since UNIX epoch
  currentTime = Date.now();
  //Number of milliseconds since last frame. Divide by 1000 to convert deltaTime
  //to seconds.
  deltaTime = currentTime - lastTime;
  lastTime = currentTime;
  totalTime += deltaTime;


  if(isDisplayingDebugOutput == true){
    dbgMsg.textContent = "";
    dbgMsg.textContent += "dt: " + deltaTime.toString() + "ms";
    dbgMsg.textContent += "  ";
    dbgMsg.textContent += "fps: " + (1/(deltaTime/1000)).toFixed(0);
    //dbgMsg.textContent += "  ";
    //dbgMsg.textContent += "mf: " + mainFrameCount;
    //dbgMsg.textContent += "  ";
    //dbgMsg.textContent += "df: " + framecountDebug;
    //dbgMsg.textContent += "  ";
    //dbgMsg.textContent += "tt: " + totalTime;
    //dbgMsg.textContent += "  ";
    //dbgMsg.textContent += "fi: " + numberOfInstructionThisFrame;
  }

  //Update the timer registers.
  //16.67ms * 60 ~= 1 second -> ~60Hz
  remainderDT = timerFrame(DT,remainderDT, 16.67);
  remainderST = timerFrame(ST,remainderST, 16.67);
  

  //Play that high definition audio if the sound timer register has a value.
  if(c8RegisterArray[ST] > 0){
    playTone();
  } else {
    stopTone();
  }

  //Allow for pausing if running is false, else run as normal
  if(running == true){
    //Run the CHIP-8 emulator for numberOfInstructionThisFrame cycles on this
    //frame.
    for(var i = 0; i < numberOfInstructionThisFrame; i++){
      //If ioBlocking then we are waiting for user input else then run as normal.
      if(ioBlocking == false){
        runPC();
      } else {
        //Wait for user input
        var tempIOTest = inputHandler.isAnyKeyDown();
        if(tempIOTest != -1){
          inputHandler.c8Keylist[tempIOTest] = false;
          c8RegisterArray[ioBlockDestinationRegister] = tempIOTest;
          ioBlocking = false;
        }
      }
    }
  }

  //To handle persistance the canvas is redrawn every frame rather then just
  //when the CHIP-8 display function is called.
  //Clear the display on each draw frame
  clearDisplayCanvas();
  //Redraw the display for this frame
  drawDisplayBuffer();

  //Rerun this function on the next animation frame.
  requestAnimationFrame(mainLoop);
}


//Get things ready
init();

//need to start the loop.
mainLoop();
