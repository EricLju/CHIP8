//c8_audio.js - Uses WebAudio api to generate sound for the emulator.

//New Web Audio API context. Reduce the sample rate to 16000, going lower
//negatively effects the sound of generated audio.
var audioContext = new window.AudioContext({sampleRate:16000});

//WebAudio expects we keep track of sound nodes.
var currentTone = null;

//CHIP-8 only specifies playing a simple tone. Use WebAudio to generate a 
//very simple triangle wave oscillator. I thought the triangle wave sounded the
//best compared to sine, square, and sawtooth.
function playTone(){
  //If there isn't already a tone playing. If there is then we don't have to do
  //anything
  if(currentTone == null){
    //WebAudio implementaitions have issues with 0 values for gain
    if(audioGlobalGain <= 0.0){
      audioGlobalGain = 0.001;
    }
    //If muted don't play the tone.
    if(muteAudio == true){
      return;
    }
    //current Web Audio API time
    var now = audioContext.currentTime; 
    //oscillatorNode-->gainNode-->destination
    var gainNode = audioContext.createGain();
    var oscillatorNode = audioContext.createOscillator();
    
    oscillatorNode.type = 'triangle';
    //note: As of writing this, firefox doesn't set with .value as it seems it should. Using setValueAtTime works
    //I thought 1000Hz sounded good
    oscillatorNode.frequency.setValueAtTime(1000, now);
    
    oscillatorNode.connect(gainNode);
    
    gainNode.gain.setValueAtTime(audioGlobalGain, now);
    
    gainNode.connect(audioContext.destination);

    oscillatorNode.start(now);
    //Save the oscilatorNode so that we can stop the sound later.
    currentTone = oscillatorNode;
  }
}

//Stop any playing sound.
function stopTone(){
  if(currentTone != null){
    currentTone.stop(audioContext.currentTime);
    currentTone = null;
  }
}