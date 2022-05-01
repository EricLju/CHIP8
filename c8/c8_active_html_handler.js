//c8_active_html_handler.js - Functions related to handling or updating anything
//HTML related on index.html.

//Window resize handler
//On window resize, make sure the canvas is resized correctly.
function windowResize(){
  //Check the aspect ratio of the space provided for the canvas renderer. If
  //the aspect ratio is greater than about two then we have to change the way
  //we size the canvas so that it remains in the screen and doesn't stretch 
  //oddly.
  var aspectRatio = canvasDisplay.parentElement.clientWidth / window.innerHeight;
  //Actual scale to fit transition value would be 2 but I think 1.96 provides
  //a bit better looking transition.
  if(aspectRatio > 1.96){ 
    //The screen is wide but very short.
    canvasDisplay.style.width = "auto";
    //Only 95% the viewport height so that there is a small space below the
    //canvas that matches the padding above the canvas.
    canvasDisplay.style.height = "95vh";
  } else {
    //Go back to normal sizing. The border pushes the canvas 5 pixels to the
    //right. Subract 5 pixels from the size of the canvas to keep HTML elements
    //lined up.
    canvasDisplay.style.width = "calc(100% - 5px)";
    canvasDisplay.style.height = "auto";
  }
}

//Switch to mobile mode. Mobile mode makes the cavas take up the entire screen
//and adds an on screen keyboard
function activateMobileMode(){
  //Fullscreen to get as much space as possible for the canvas. Hides the 
  //address bar.
  //.catch to keep the console happy.
  document.documentElement.requestFullscreen().catch(function() {}); 
  //Landscape mode since the CHIP-8 display is landscape shaped.
  screen.orientation.lock("landscape").catch(function() {});
  //Scroll the canvas back into view.
  window.scrollTo({top: 3, left: 0, behavior: 'auto'});
  //Switch the mobile mode button to a style that is less visible.
  buttonMobileMode.className = "cellphone_btn_activated";
  //Dark background so that we can see the white key outlines.
  document.body.style.backgroundColor = "#3E252B";
}

//Exit mobile mode. Revert the page back to it's defualt look.
function deactivateMobileMode(){
  //Check to see if we are in fullscreen mode. If not then .unlock() will
  //throw an error.
  if(document.fullscreenElement != null){
    document.exitFullscreen(); 
    screen.orientation.unlock();
  }
  //Return to defualt background color.
  document.body.style.backgroundColor = "#CEE5D0";
  //Return the mobile mode button back to its defualt styling.
  buttonMobileMode.className = "cellphone_btn";
}

//Mobile mode button click handler
//Enter mobile mode on first click. Switch modes on other clicks. 
//Lastly close mobile mode on last click.
function onMoblieModeClick(){
  //Switch mode on click.
  mobileMode++;
  switch(mobileMode){
    case 1:
      //Enter full screen mobile mode.
      activateMobileMode();
      //Show full CHIP-8 keyboard
      buttonMobileMode.innerText = "1";
      divFullMobileKeyboard.style.display = "block";
    break;
    case 2:
      //Show the reduced keyboard
      buttonMobileMode.innerText = "2";
      divFullMobileKeyboard.style.display = "none";
      divMiniMobileKeyboard.style.display = "block";
    break;
    case 3:
      //Show the WASD only keyboard
      buttonMobileMode.innerText = "3";
      divMiniMobileKeyboard.style.display = "none";
      divWASDMobileKeyboard.style.display = "block";
    break;
    default:
      //Leave mobile mode
      deactivateMobileMode();
      //Close all mobile keyboards.
      buttonMobileMode.innerText = "";
      divFullMobileKeyboard.style.display = "none";
      divMiniMobileKeyboard.style.display = "none";
      divWASDMobileKeyboard.style.display = "none";
      mobileMode = 0;
  }
}

//Mobile mode key down handler
function onMobileKeyDown(value){
  //Pass the key value back to the InputHander to treat it as a regular
  //keyboard press.
  inputHandler.onPress({key: value});
}

//Mobile mode key up handler
function onMobileKeyUp(value){
  //Pass the key value back to the InputHander to treat it as a regular
  //keyboard key release.
  inputHandler.onRelease({key: value});
}

//On mute checkbox click handler
function onMuteClick(element){
  //element.checked returns true/false. Pass the value to the global mute var.
  muteAudio = element.checked;
}

//Volume slider change handler
function setAudioVolume(value){
  //HTML slider passes a string, convert to a Float.
  audioGlobalGain = parseFloat(value);
}

//On collapsible button click handler.
//Collapsables are the div's that expand accordian style to show hidden info. 
function onCollapsibleClick(element){
  element.classList.toggle("active");
  var content = element.nextElementSibling;
  if (content.style.display == "block") {
    //hide content div
    content.style.display = "none";
  } else {
    //Show content div
    content.style.display = "block";
  }
}

//An extra handler for the "Emulator Internals" collapsible.
//The fields that are updated every frame can take up a fair bit of processing
//power. Only update those fields if they are actually visible.
function onEmulatorInternalsClick(){
  isDisplayingDebugOutput = !isDisplayingDebugOutput;
}

//Reset button click handler
function htmlButtonReset(){
  resetEmulator();
}

//Update the "ROM Discription" collapsible with info about the current ROM
function setROMDescription(content){
  document.getElementById('htmlDescription').innerHTML = content;
}

//Show the file browser. Allows the user to load a ROM located on their system
function showFileBrowser(input) {
  var calcedHash = 0;
  var file = input.files[0];
  var reader = new FileReader();
  
  currentROMName = file.name;
  
  //Inline function to run after file load.
  reader.onload = function(e) {
    //File loaded by FileReader as ArrayBuffer.
    var arrayBuffer1 = reader.result;
    //Set the CHIP-8 ROM to the loaded file.
    currentROMBuffer = arrayBuffer1;
    //Reset will reload with the new ROM.
    resetEmulator();
    //Calculate a hash to see if it matches any ROMs in the compatibility list.
    calcedHash = sdbmHash(arrayBuffer1);
    console.log("Calculated hash: " + calcedHash);
    var listIndex = isInCompatabilityListByHash(calcedHash);
    //if(listIndex != 0){
      setEmulatorToCompatabilitySettings(listIndex);
      //Update HTML elements with the new settings
      updateAllHTMLOptionElements();
    //}
    console.log("File name: " + file.name + " / " + arrayBuffer1.byteLength);
  }

  reader.readAsArrayBuffer(file);
}

//Run/Stop button click handler
function runningSwitcher(){
  running = !running;
}

//Compatibility X display wrapping checkbox click handler
function wrapXCheckboxClick(){
  wrapDisplayX = checkboxWrapX.checked;
}

//Compatibility Y display wrapping checkbox click handler
function wrapYCheckboxClick(){
  wrapDisplayY = checkboxWrapY.checked;
}

//Cycle rate Number field change handler
function onOptionCycleRateChange(value){
  numberOfInstructionThisFrame = value;
}

//Built in ROM selection list handler
function loadROMSelection(){
  var currentSelection = selectBuiltInRoms.value;
  var settingsIndex = 0;

  switch (currentSelection){
    case "invaders_rom":
      currentROMBuffer = loadProgramFrom16Array(invaders_rom);
      settingsIndex = 1;
    break;
    case "pong_rom":
      currentROMBuffer = loadProgramFrom16Array(pong_rom);
      settingsIndex = 2;
    break;
    case "danm8ku_rom":
      currentROMBuffer = loadProgramFrom16Array(danm8ku_rom);
      settingsIndex = 3;
    break;
    case "snake_rom":
      currentROMBuffer = loadProgramFrom16Array(snake_rom);
      settingsIndex = 4;
    break;
    default:
      currentROMBuffer = loadProgramFrom16Array(startup_rom);
      settingsIndex = 5;
  }
  //Reset will load the new ROM
  resetEmulator();

  setEmulatorToCompatabilitySettings(settingsIndex);
  //Update HTML elements with the new settings
  updateAllHTMLOptionElements();
  //Automatically scroll to the canvas so that the user doesn't have to.
  canvasDisplay.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
}

//Update settings HTML elements with the internal variable values.
function updateAllHTMLOptionElements(){
  //Audio mute
  checkboxMuteSound.checked = muteAudio;
  //Audio volume
  sliderVolume.value = audioGlobalGain;
  //Display wrapping x
  checkboxWrapX.checked = wrapDisplayX;
  //Display wrapping y
  checkboxWrapY.checked = wrapDisplayY;
  //Shift vy vx
  checkboxShiftVy.checked = !compatabilityBitShift;
  //Shift vx vx
  checkboxShiftVx.checked = compatabilityBitShift;
  //Cycle rate
  numberboxTargetRate.value = numberOfInstructionThisFrame;
}

//Debugging output number base radio button handler
function updateOutputRegisterBase(val){
  outputRegisterBase = val;
}

//Update a debugging register textbox with it's corresponding internal variable
//value.
function outputSingleRegister(register, base=10){
  var tempOutput = "";
  var tempPad = 8;
  //Add a certain number of leading zeros depending on what base the number
  //will be displayed as. I think it's easier to read if the leading zeros
  //are included.
  if(base == 2){ //Binary
    //I and PC are 16 bit. Pad them out 16 places. The rest are padded 8 places.
    tempPad = (register==I||register==PC)? 16 : 8;
    tempOutput = c8RegisterArray[register].toString(base).padStart(tempPad, "0");
  } else if (base == 16){ //Hexadecimal
    tempPad = (register==I||register==PC)? 4 : 2;
    tempOutput = c8RegisterArray[register].toString(base).padStart(tempPad, "0").toUpperCase();
  } else { //Decimal
    //No padding for decimal
    tempOutput = c8RegisterArray[register].toString(base);
  }
  //Update the HTML textbox with the generated string.
  textboxArray[register].value = tempOutput;
}

//Update all textbox fields in the Emulator Internals table 
function outputAllRegisters(base=10){
  //For each register in the emulator
  for(var i = 0; i < c8RegisterArray.length; i++){
    outputSingleRegister(i, base);
  }
}
