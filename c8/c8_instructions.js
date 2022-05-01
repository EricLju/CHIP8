//c8_instructions.js - CHIP-8 emulator instructions.  

//0NNN - Calls RCA 1802 program at address NNN. Not necessary for most ROMs. 
function instructionCallExternal(opcode){
  //Not implemented.
  console.log(c8RegisterArray[PC].toString(16) + ": Calls to external programs are not supported.");
}

//used for instructionReturnSubroutine(). Pops a return address off the stack.
function stackPop(){
  var curTopOfStack = c8StackCurrentFreeAddress - 2;

  //Check stack bounds.
  if(curTopOfStack < c8StackStartAddress){
    curTopOfStack = c8StackStartAddress;
    console.log("Warning: Tried to pop data from empty stack.");
  }
  
  c8StackCurrentFreeAddress = curTopOfStack;
  //Get the value from CHIP-8 memory at the top of the stack area.
  return c8Memory_View.getUint16(curTopOfStack, false);
}

//00EE - Returns from a subroutine. 
function instructionReturnSubroutine(opcode){
  var returnPC;
  
  //Handling PC on our own. Skip normal flow.
  skipPCIncrement = true;
  returnPC = stackPop();
  //console.log("return " + returnPC.toString(16));
  c8RegisterArray[PC] = returnPC;
}

//1NNN - Jumps to address NNN. 
function instructionJump(opcode){
  var tempAddress = opcode & 0x0FFF;
  //console.log("jump");
  skipPCIncrement = true;
  c8RegisterArray[PC] = tempAddress;
}

//used for instructionCallSubroutine(). Pushes a return address off the stack.
function stackPush(val){

  //Check stack bounds
  if(c8StackCurrentFreeAddress > c8StackMaxAddress){
    console.log("Warning: Stack larger than allocated memory space.");
  }

  //Put the given value in CHIP-8 Memory and increment the stack pointer.
  c8Memory_View.setUint16(c8StackCurrentFreeAddress, val, false);
  c8StackCurrentFreeAddress += 2;
}

//2NNN - Calls subroutine at NNN. 
function instructionCallSubroutine(opcode){
  var tempAddress;
  var returnPC;
  
  //Address of subroutine is the last 3 nibbles of the opcode.
  tempAddress = opcode & 0x0FFF;
  //We want to return to the instruction right after this one.
  returnPC = c8RegisterArray[PC] + 2;
  //Push the return address on to the stack to save for the return call.
  stackPush(returnPC);
  //Handling PC on our own. Skip normal flow.
  skipPCIncrement = true;
  //console.log(c8RegisterArray[PC].toString(16) + " call: " + tempAddress.toString(16) + " return: " + returnPC.toString(16));
  //Set PC to the subroutine address.
  c8RegisterArray[PC] = tempAddress;
}

//3XNN - if(Vx==NN) - Skips the next instruction if VX equals NN.
function instructionIfConstant(opcode){
  var tempRegisterX = getNibbleFromOpcode(opcode, 2);
  var tempRegisterXData = c8RegisterArray[tempRegisterX];
  var tempConstant = opcode & 0x00FF;
  //console.log("If const: " + tempRegisterXData + " C: " + tempConstant);
  //Check condition
  if(tempRegisterXData == tempConstant){
    //skip setting PC based on normal flow. Skip the next instruction.
    skipPCIncrement = true;
    c8RegisterArray[PC] += 4;
  }
  //If condition is not met then execution continues as normal
}

//4XNN - if(Vx!=NN) - Skips the next instruction if VX doesn't equal NN.
function instructionIfNotConstant(opcode){
  var tempRegisterX = getNibbleFromOpcode(opcode, 2);
  var tempRegisterXData = c8RegisterArray[tempRegisterX];
  var tempConstant = opcode & 0x00FF;
  //console.log(c8RegisterArray[PC].toString(16) + " If Not Const: " + tempRegisterXData + " C: " + tempConstant);
  //Check condition
  if(tempRegisterXData != tempConstant){
    //Skip setting PC based on normal flow.
    skipPCIncrement = true;
    //Skip the next instruction.
    c8RegisterArray[PC] += 4;
  }
  //If condition is not met then execution continues as normal
}

//5XY0 - if(Vx==Vy) - Skips the next instruction if VX equals VY. (Usually the next instruction is a jump to skip a code block) 
function instructionIfRegister(opcode){
  var tempRegisterX = getNibbleFromOpcode(opcode, 2);
  var tempRegisterXData = c8RegisterArray[tempRegisterX];
  var tempRegisterY = getNibbleFromOpcode(opcode, 1);
  var tempRegisterYData = c8RegisterArray[tempRegisterY];
  //console.log("IfREG: Vx" + tempRegisterXData + " Vy: " + tempRegisterYData);
  //Check condition
  if(tempRegisterXData == tempRegisterYData){
    //Skip setting PC based on normal flow. 
    skipPCIncrement = true;
    //Skip the next instruction.
    c8RegisterArray[PC] += 4;
  }
}

//6XNN - Vx = NN - Sets VX to NN. 
function instructionLoad(opcode){ 
  var tempRegister = getNibbleFromOpcode(opcode, 2);
  var tempData = opcode & 0x00FF;
  //console.log("load reg: V" + tempRegister.toString(16) + " = " + tempData);
  c8RegisterArray[tempRegister] = tempData;
}

//8XY0 - Vx=Vy - Sets VX to the value of VY. 
function instructionCopy(opcode){ 
  var tempRegisterX = getNibbleFromOpcode(opcode, 2);
  var tempRegisterY = getNibbleFromOpcode(opcode, 1);
  //console.log("copy reg: " + tempRegisterX.toString(16) + " = " + tempRegisterY.toString(16));
  c8RegisterArray[tempRegisterX] = c8RegisterArray[tempRegisterY];
}

//7XNN - Vx += NN - Adds NN to VX. (Carry flag is not changed) 
function instructionAddConstant(opcode){
  var tempData = 0;
  var tempRegisterX = 0;
  var tempResult = 0;

  tempData = opcode & 0x00FF;
  tempRegisterX = getNibbleFromOpcode(opcode, 2);
  tempResult = c8RegisterArray[tempRegisterX] + tempData;
  tempResult = tempResult & 0xFF;
  //console.log(opcode.toString(16) + " add const: " + c8RegisterArray[tempRegisterX] + " + " + tempData + " = " + tempResult);
  c8RegisterArray[tempRegisterX] = tempResult;
  
}

//8XY1 - Vx=Vx|Vy - Sets VX to VX or VY. (Bitwise OR operation) 
function instructionOr(opcode){
  var tempRegisterX = getNibbleFromOpcode(opcode, 2);
  var tempRegisterY = getNibbleFromOpcode(opcode, 1);
  //console.log("OR");
  c8RegisterArray[tempRegisterX] = c8RegisterArray[tempRegisterX] | c8RegisterArray[tempRegisterY];
  
  if(compatabilityLogicClearsVF == true){
    c8RegisterArray[VF] = 0;
  }
}

//8XY2 - Vx= Vx & Vy - Sets VX to VX and VY. (Bitwise AND operation) 
function instructionAnd(opcode){
  var tempRegisterX = getNibbleFromOpcode(opcode, 2);
  var tempRegisterY = getNibbleFromOpcode(opcode, 1);
  var tempResult;
  tempResult = c8RegisterArray[tempRegisterX] & c8RegisterArray[tempRegisterY];

  //console.log("AND: " + c8RegisterArray[tempRegisterX] + " & " + c8RegisterArray[tempRegisterY] + " = " + tempResult);
  c8RegisterArray[tempRegisterX] = tempResult
  
  if(compatabilityLogicClearsVF == true){
    c8RegisterArray[VF] = 0;
  }
}

//8XY3 - Vx=Vx^Vy - Sets VX to VX xor VY. 
function instructionXor(opcode){
  var tempRegisterX = getNibbleFromOpcode(opcode, 2);
  var tempRegisterY = getNibbleFromOpcode(opcode, 1);
  //console.log("XOR");
  c8RegisterArray[tempRegisterX] = c8RegisterArray[tempRegisterX] ^ c8RegisterArray[tempRegisterY];
  
  if(compatabilityLogicClearsVF == true){
    c8RegisterArray[VF] = 0;
  }
}

//8XY4 - Vx = Vx + Vy - Adds VY to VX. VF is set to 1 when there's a carry, and to 0 when there isn't. 
function instructionAddRegisters(opcode){
  var tempData = 0;
  var tempRegisterX = getNibbleFromOpcode(opcode, 2);
  var tempRegisterY = getNibbleFromOpcode(opcode, 1);
  //console.log("Add Vx + Vy with carry");
  tempData = c8RegisterArray[tempRegisterX] + c8RegisterArray[tempRegisterY];

  //Mask off any bits greater than 0xFF;
  c8RegisterArray[tempRegisterX] = tempData & 0xFF;

  if(tempData > 0xFF){
    //tempData = programmerModulo(tempData, 256);
    c8RegisterArray[VF] = 0x01;
  } else {
    c8RegisterArray[VF] = 0x00;
  }
}

//8XY5 - Vx = Vx - Vy -> VY is subtracted from VX. VF is set to 0 when there's a borrow, and 1 when there isn't. 
function instructionSubtractRegisters1(opcode){
  var tempRegisterX = getNibbleFromOpcode(opcode, 2);
  var tempRegisterY = getNibbleFromOpcode(opcode, 1);
  var tempRegisterXData = c8RegisterArray[tempRegisterX];
  var tempRegisterYData = c8RegisterArray[tempRegisterY];
  
  var tempData = tempRegisterXData - tempRegisterYData;

  //Mask off any bits greater than 0xFF;
  tempData = tempData & 0xFF

  c8RegisterArray[tempRegisterX] = tempData;

  //if Vx is greater that Vy then there is no borrow
  if(tempRegisterXData >= tempRegisterYData){
    c8RegisterArray[VF] = 0x01;
  } else {
    c8RegisterArray[VF] = 0x00;
  }
  //console.log("subract 1 Vx - Vy: " + tempRegisterXData + " - " + tempRegisterYData + " = " + test + " => " + c8RegisterArray[tempRegisterX]);
}

//8XY7 - Vx=Vy-Vx - Sets VX to VY minus VX. VF is set to 0 when there's a borrow, and 1 when there isn't. 
function instructionSubtractRegisters2(opcode){
  var tempRegisterX = getNibbleFromOpcode(opcode, 2);
  var tempRegisterY = getNibbleFromOpcode(opcode, 1);
  var tempRegisterXData = c8RegisterArray[tempRegisterX];
  var tempRegisterYData = c8RegisterArray[tempRegisterY];

  var tempData = tempRegisterYData - tempRegisterXData;

  //Mask off any bits greater than 0xFF;
  tempData = tempData & 0xFF;

  c8RegisterArray[tempRegisterX] = tempData;

  //if Vy is greater that Vx then there is no borrow
  if(tempRegisterYData >= tempRegisterXData){
    c8RegisterArray[VF] = 0x01;
  } else {
    c8RegisterArray[VF] = 0x00;
  }
  //console.log("subract 2 Vy-Vx: " + tempRegisterYData + " - " + tempRegisterXData + " = " + c8RegisterArray[tempRegisterX]);
}

//8XY6 - Vx>>=1 - Stores the least significant bit of VX in VF and then shifts VX to the right by 1.
//Wiki: CHIP-8's opcodes 8XY6 and 8XYE (the bit shift instructions), which were in fact undocumented opcodes in the original interpreter, shifted the value in the register VY and stored the result in VX. The CHIP-48 and SCHIP implementations instead ignored VY, and simply shifted VX.
function instructionRightShift(opcode){
  var tempRegisterX = getNibbleFromOpcode(opcode, 2);
  var tempRegisterY = getNibbleFromOpcode(opcode, 1);
  var tempData;
  //console.log("right shift");
  if(compatabilityBitShift == true){
    tempData = c8RegisterArray[tempRegisterX];
  } else {
    tempData = c8RegisterArray[tempRegisterY];
  }
  
  var tempLSB = tempData & 0x01;

  tempData = tempData >>> 1; //zero fill right shift

  c8RegisterArray[tempRegisterX] = tempData;
  c8RegisterArray[VF] = tempLSB;
}

//8XYE - Vx<<=1 - Stores the most significant bit of VX in VF and then shifts VX to the left by 1.
//Wiki: CHIP-8's opcodes 8XY6 and 8XYE (the bit shift instructions), which were in fact undocumented opcodes in the original interpreter, shifted the value in the register VY and stored the result in VX. The CHIP-48 and SCHIP implementations instead ignored VY, and simply shifted VX.
function instructionLeftShift(opcode){
  var tempRegisterX = getNibbleFromOpcode(opcode, 2);
  var tempRegisterY = getNibbleFromOpcode(opcode, 1);
  var tempData;
  //console.log("left shift");
  if(compatabilityBitShift == true){
    tempData = c8RegisterArray[tempRegisterX];
  } else {
    tempData = c8RegisterArray[tempRegisterY];
  }
  var tempMSB = tempData >>> 7;

  tempData = tempData << 1; //left shift
  //clamp variable size to one byte
  tempData = tempData & 0xFF;

  c8RegisterArray[tempRegisterX] = tempData;
  c8RegisterArray[VF] = tempMSB;
}

//9XY0 - if(Vx!=Vy) - Skips the next instruction if VX doesn't equal VY. (Usually the next instruction is a jump to skip a code block) 
function instructionIfNotegister(opcode){
  var tempRegisterX = getNibbleFromOpcode(opcode, 2);
  var tempRegisterXData = c8RegisterArray[tempRegisterX];
  var tempRegisterY = getNibbleFromOpcode(opcode, 1);
  var tempRegisterYData = c8RegisterArray[tempRegisterY];
  //console.log("If not registers");
  //Check condition
  if(tempRegisterXData != tempRegisterYData){
    //Skip setting PC based on normal flow. 
    skipPCIncrement = true;
    //Skip the next instruction.
    c8RegisterArray[PC] += 4;
  }
}

//ANNN - I = NNN - Sets I to the address NNN. 
function instructionSetI(opcode){
  var tempData = 0;
  //console.log("Set I");
  tempData = opcode & 0x0FFF;
  c8RegisterArray[I] = tempData;
}

//BNNN- PC=V0+NNN - Jumps to the address NNN plus V0. 
function instructionJumpOffset(opcode){
  var tempAddress = opcode & 0x0FFF;
  var tempV0Data = c8RegisterArray[V0];
  //console.log("register ofset jump");
  c8RegisterArray[PC] = tempAddress + tempV0Data;
}

//CXNN - Vx=rand()&NN - Sets VX to the result of a bitwise and operation on a random number (Typically: 0 to 255) and NN. 
function instructionRand(opcode){
  var tempData = opcode & 0x00FF;
  var tempRand = randomInt(0, 255);
  var tempRegisterX = getNibbleFromOpcode(opcode, 2);
  
  c8RegisterArray[tempRegisterX] = tempRand & tempData;
  //console.log("rand: " + tempRand + " & " + tempData.toString(2) + " = 0b" + c8RegisterArray[tempRegisterX]);
}

//DXYN - Draws a sprite at coordinate (VX, VY) that has a width of 8 pixels and a height of N pixels. Each row of 8 pixels is read as bit-coded starting from memory location I; I value doesn’t change after the execution of this instruction. As described above, VF is set to 1 if any screen pixels are flipped from set to unset when the sprite is drawn, and to 0 if that doesn’t happen 
function instructionDraw(opcode){
  var tempRegisterX = getNibbleFromOpcode(opcode, 2);
  var tempXCoordinate = c8RegisterArray[tempRegisterX];
  var tempRegisterY = getNibbleFromOpcode(opcode, 1);
  var tempYCoordinate = c8RegisterArray[tempRegisterY];
  var tempSpriteHeight = getNibbleFromOpcode(opcode, 0);
  var tempCurrentI = c8RegisterArray[I];
  var mask;
  var curSpriteByte;
  var curBit;
  var curX = 0;
  var curY = 0;
  var oldval;
  //console.log(opcode.toString(16) + " draw X: " + tempXCoordinate + " Y: " + tempYCoordinate + " N: " + tempSpriteHeight);

  c8RegisterArray[VF] = 0x00;

  //For each row in the sprite.
  for(var curSpriteY = 0; curSpriteY < tempSpriteHeight; curSpriteY++){
    //Get the sprite data of the current row from CHIP-8 memory
    curSpriteByte = c8Memory_View.getUint8(tempCurrentI + curSpriteY);
    //Current pixel Y coordinate.
    curY = tempYCoordinate + curSpriteY;
    //If the pixel is off the screen then wrap it around to the other side if
    //wrapping is enabled or drop it if not.
    if(wrapDisplayY == true){
      curY = programmerModulo(curY, c8DisplayHeight);
    } else {
      if(curY >= c8DisplayHeight){
        break;
      }
    }
    
    //For each pixel in the current row starting at the last pixel
    for(var curSpriteX = 7; curSpriteX >= 0; curSpriteX--){
      //Current pixel value
      mask = 0x1 << curSpriteX;
      curBit = curSpriteByte & mask;
      curBit = curBit >>> curSpriteX;
      curX = tempXCoordinate + (7 - curSpriteX);

      //If the pixel is off the screen then wrap it around to the other side if
      //wrapping is enabled or drop it if not.
      if(wrapDisplayX == true){
        curX = programmerModulo(curX, c8DisplayWidth);
      } else {
        if(curX >= c8DisplayWidth){
          break;
        }
      }

      //Pixel setting is handled by XORing the curent value with the last value
      //that was in the display buffer
      oldval = c8DisplayBuffer[(curY * c8DisplayWidth) + curX];
      if(oldval == 1 && curBit == 1){
        c8RegisterArray[VF] = 0x01;
      }
      curBit = curBit ^ oldval;
      c8DisplayBuffer[(curY * c8DisplayWidth) + curX] = curBit;
    }
  }
}

//EX9E - Skips the next instruction if the key stored in VX is pressed. 
function instructionIfKeyPressed(opcode){
  var tempRegisterX = getNibbleFromOpcode(opcode, 2);
  var keyStoredInX = c8RegisterArray[tempRegisterX];
  //console.log("skip if key pressed");
  if(inputHandler.isDown(keyStoredInX) == true){
    
    skipPCIncrement = true;
    //Skip the next instruction.
    c8RegisterArray[PC] += 4;
  }
}

//EXA1 - Skips the next instruction if the key stored in VX isn't pressed.
function instructionIfKeyNotPressed(opcode){
  var tempRegisterX = getNibbleFromOpcode(opcode, 2);
  var keyStoredInX = c8RegisterArray[tempRegisterX];
  //console.log(opcode.toString(16) + " PC: " + c8RegisterArray[PC].toString(16) +" skip if not key pressed: " + keyStoredInX + " " + inputHandler.isDown(keyStoredInX));
  if(inputHandler.isDown(keyStoredInX) == false){
    skipPCIncrement = true;
    //Skip the next instruction.
    c8RegisterArray[PC] += 4;
  }
}

//FX07 - Vx = get_delay() - Sets VX to the value of the delay timer. 
function instructionGetDelayTimer(opcode){
  var tempRegisterX = getNibbleFromOpcode(opcode, 2);
  //console.log("get delay");
  c8RegisterArray[tempRegisterX] = c8RegisterArray[DT];
}

//FX0A - A key press is awaited, and then stored in VX. (Blocking Operation. All instruction halted until next key event) 
function instructionWaitForKeyPress(opcode){
  var tempRegisterX = getNibbleFromOpcode(opcode, 2);
  //console.log("wait for key press");
  ioBlocking = true;
  ioBlockDestinationRegister = tempRegisterX;
}


//FX15 - delay_timer(Vx) - Sets the delay timer to VX. 
function instructionSetDelayTimer(opcode){
  var tempRegisterX = getNibbleFromOpcode(opcode, 2);
  //console.log("set delay");
  c8RegisterArray[DT] = c8RegisterArray[tempRegisterX];
}

//FX18 - sound_timer(Vx) - Sets the sound timer to VX. 
function instructionSetSoundTimer(opcode){
  var tempRegisterX = getNibbleFromOpcode(opcode, 2);
  //console.log("set sound");
  c8RegisterArray[ST] = c8RegisterArray[tempRegisterX];
}

//FX1E - I +=Vx - Adds VX to I. VF is set to 1 when there is a range overflow (I+VX>0xFFF), and to 0 when there isn't.[c] 
function instructionSetDisplacedI(opcode){
  var tempRegisterX = getNibbleFromOpcode(opcode, 2);
  var tempXData = c8RegisterArray[tempRegisterX];
  var tempCurrentI = c8RegisterArray[I];
  //console.log("offset I by reg");
  //Add Vx to I
  tempCurrentI += tempXData;

  //check for overflow
  if(tempCurrentI > 0xFFF){
    //On overflow set VF to 1.
    c8RegisterArray[VF] = 0x01;

    tempCurrentI = tempCurrentI & 0xFFF;
  } else {
    //No overflow
    c8RegisterArray[VF] = 0x00;
  }

  c8RegisterArray[I] = tempCurrentI;
}

//FX29 - I=sprite_addr[Vx] - Sets I to the location of the sprite for the character in VX. Characters 0-F (in hexadecimal) are represented by a 4x5 font. 
function instructionFontAddress(opcode){
  var tempRegisterX = getNibbleFromOpcode(opcode, 2);
  var tempXData = c8RegisterArray[tempRegisterX];
  //console.log("font adress");
  tempXData = tempXData & 0x0F;
  c8RegisterArray[I] = c8FontStartAddress + (tempXData * 5);
}

//FX33 - Stores the binary-coded decimal representation of VX, with the most significant of three digits at the address in I, the middle digit at I plus 1, and the least significant digit at I plus 2. (In other words, take the decimal representation of VX, place the hundreds digit in memory at location in I, the tens digit at location I+1, and the ones digit at location I+2.) 
function instructionBCD(opcode){
  var tempRegisterX = getNibbleFromOpcode(opcode, 2);
  var tempXData = c8RegisterArray[tempRegisterX];
  var tempCurrentI = c8RegisterArray[I];

  var hundredsDigit = Math.trunc(tempXData / 100);
  var tensDigit = Math.trunc((tempXData / 10) % 10);
  var onesDigit = tempXData % 10;

  //console.log("store bcd");
  c8Memory_View.setUint8(tempCurrentI + 0, hundredsDigit);
  c8Memory_View.setUint8(tempCurrentI + 1, tensDigit);
  c8Memory_View.setUint8(tempCurrentI + 2, onesDigit);
}

//FX55 - Stores V0 to VX (including VX) in memory starting at address I. The offset from I is increased by 1 for each value written, but I itself is left unmodified.[d] 
//Wiki Note: In the original CHIP-8 implementation, and also in CHIP-48, I is left incremented after this instruction had been executed. In SCHIP, I is left unmodified.
function instructionSaveRegisters(opcode){
  var tempXEndRegister = getNibbleFromOpcode(opcode, 2);
  var tempCurrentI = c8RegisterArray[I];
  var currentRegisterData = 0;
  //console.log("Save Registers called");
  //From 0 to the value in register Vx
  for(var i = 0; i <= tempXEndRegister; i++){
    currentRegisterData = c8RegisterArray[i];
    c8Memory_View.setUint8(tempCurrentI + i, currentRegisterData);
  }
  if(compatabilitySaveLoad == false){
    c8RegisterArray[I] = tempCurrentI + tempXEndRegister + 1;
  }
}

//FX65 - Fills V0 to VX (including VX) with values from memory starting at address I. The offset from I is increased by 1 for each value written, but I itself is left unmodified.[d]
//Wiki Note: In the original CHIP-8 implementation, and also in CHIP-48, I is left incremented after this instruction had been executed. In SCHIP, I is left unmodified.
function instructionLoadRegisters(opcode){
  var tempXEndRegister = getNibbleFromOpcode(opcode, 2);
  var tempCurrentI = c8RegisterArray[I];
  //console.log("Load Registers called: " + tempCurrentI);
  //From 0 to the value in register Vx
  for(var i = 0; i <= tempXEndRegister; i++){
    c8RegisterArray[i] = c8Memory_View.getUint8(tempCurrentI + i);
  }
  if(compatabilitySaveLoad == false){
    c8RegisterArray[I] = tempCurrentI + tempXEndRegister + 1;
  }
}
