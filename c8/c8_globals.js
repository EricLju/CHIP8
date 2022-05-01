//c8_globals.js - global/window variables

//TODO: This is a bit of a mess. Needs clean up.

//----------------------CHIP-8 Emulator variables-------------------------------
var C8_MEMORY_SIZE = 0x2000;
var c8Memory = new ArrayBuffer(C8_MEMORY_SIZE); //CHIP-8 memory space
var c8Memory_View = new DataView(c8Memory);
var c8Memory_U8View = new Uint8Array(c8Memory);
//Going to store the display in its own buffer as some documentation states
//that program memory can go from 0x200 to 0xFFF
var c8Display = new ArrayBuffer(0x100); //display buffer
var c8FontStartAddress = 0x000;
var c8ProgramStartAddress = 0x200;
var c8DisplayStartAdrdess = 0xF00;
var c8StackStartAddress = 0x050;
var c8StackCurrentFreeAddress = c8StackStartAddress; //stack pointer
var c8StackMaxAddress = 0x0B0;
var c8RegisterArray = new Array(20).fill(0); //CHIP-8 registers
var V0 = 0, V1=1, V2=2, V3=3, V4=4, V5=5, V6=6, V7=7, V8=8, V9=9, VA=10, VB=11, VC=12, VD=13, VE=14, VF=15, I=16, PC=17, DT = 18, ST = 19;
var ioBlocking = false; //is emulator waiting on user input
var ioBlockDestinationRegister = 0; //register to load once user input is detected
var currentROMName = "chip8_rom";
var numberOfInstructionThisFrame = 8; //number of emulator cycles to run on each animation frame
var c8DisplayWidth = 64;
var c8DisplayHeight = 32;
var c8DisplayBufferSize = c8DisplayHeight * c8DisplayWidth;
var c8DisplayBuffer = [];
c8DisplayBuffer.length = c8DisplayBufferSize;
var c8DisplayPersistance = []; //secondary display buffer holding persistance decay values
c8DisplayPersistance.length = c8DisplayBufferSize;
var displayDecayRate = 0.1; //rate at which a pixel decays after being turned off
var running = false; //is the emulator running, false=paused
var currentROMBuffer; //points to the ArrayBuffer of the currently loaded ROM
var isCurrentROMBuiltIn = true;
var skipPCIncrement = false; //should the emulator increment PC after the current instruction is ran
var forgroundColor = {r:243, g:240, b:215}; //canvas pixel color
var backgroundColor = {r:34, g:19, b:25}; //canvas bacground color
var remainderST = 0; //carryover remainder after calculating ST register timing
var remainderDT = 0; //carryover remainder after calculating DT register timing

//----------------------Compatibility variables---------------------------------
var wrapDisplayX = true;
var wrapDisplayY = true;
var compatabilityBitShift = false;
var compatabilitySaveLoad = true;
var compatabilityLogicClearsVF = false;
var compatabilitySpeedUpLoadInstruction = 0x000;
var compatabilitySpeedUpLoadRate = 50;


//----------------------Animation Frame variables-------------------------------
var lastTime = Date.now(); //last animation frame time
var currentTime = 0; //current animation frame time
var deltaTime = 0; //time in milliseconds since last frame
var totalTime = 0;
var framecountDebug = 0;
var targetRemainder = 0;
var mainFrameCount = 0;


//----------------------Audio variables-----------------------------------------
//audioGlobalGain acts as a global volume control.
var audioGlobalGain = 0.5;
//Handle muting with a boolean value. This allows audioGlobalGain to save the
//volume value before muting rather then just setting gain to 0.
var muteAudio = false;


//----------------------Other variables-----------------------------------------
var inputHandler = null;
var mobileMode = 0; //current mobile mode state

//----------------------HTML Elements-------------------------------------------
var isDisplayingDebugOutput = false;
var canvasDisplay = document.getElementById('cavasDisplay');
var contextDisplay = canvasDisplay.getContext('2d', {alpha: false});
var dbgMsg = document.getElementById('state-msg');
var checkboxWrapX = document.getElementById("wrapX");
var checkboxWrapY = document.getElementById("wrapY");
var checkboxShiftVy = document.getElementById("shiftVy");
var checkboxShiftVx = document.getElementById("shiftVx");
var numberboxTargetRate = document.getElementById("emuTargetFreq");
var checkboxMuteSound = document.getElementById("soundMute");
var buttonMobileMode = document.getElementById("mobile_mode_button");
var divMobileHolder = document.getElementById("mobile_holder");
var divFullMobileKeyboard = document.getElementById("mini_keyboard_full");
var divMiniMobileKeyboard = document.getElementById("mini_keyboard_small");
var divWASDMobileKeyboard = document.getElementById("mini_keyboard_wasd");
var divCanvasAligner = document.getElementById("canvasAligner");
var selectBuiltInRoms = document.getElementById("ROMS");
var sliderVolume = document.getElementById("soundGainSlider");
var textboxArray = [];
textboxArray[V0] = document.getElementById('tbV0');
textboxArray[V1] = document.getElementById('tbV1');
textboxArray[V2] = document.getElementById('tbV2');
textboxArray[V3] = document.getElementById('tbV3');
textboxArray[V4] = document.getElementById('tbV4');
textboxArray[V5] = document.getElementById('tbV5');
textboxArray[V6] = document.getElementById('tbV6');
textboxArray[V7] = document.getElementById('tbV7');
textboxArray[V8] = document.getElementById('tbV8');
textboxArray[V9] = document.getElementById('tbV9');
textboxArray[VA] = document.getElementById('tbVA');
textboxArray[VB] = document.getElementById('tbVB');
textboxArray[VC] = document.getElementById('tbVC');
textboxArray[VD] = document.getElementById('tbVD');
textboxArray[VE] = document.getElementById('tbVE');
textboxArray[VF] = document.getElementById('tbVF');
textboxArray[I] =  document.getElementById('tbI');
textboxArray[PC] = document.getElementById('tbPC');
textboxArray[DT] = document.getElementById('tbDT');
textboxArray[ST] = document.getElementById('tbST');
var outputRegisterBase = 16;

var c8DisplayPixelWidth = canvasDisplay.width / c8DisplayWidth;
var c8DisplayPixelHeight = canvasDisplay.height / c8DisplayHeight;

