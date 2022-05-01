//c8_compatability_list.js - Handles setting compatibitly settings.

//A big ole array of ROMs and their settings. Also include a HTML text description.
var programCompatabilityList = [
  {names:["default"], hash:[0],
    compCycleRate:8, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"No ROM description found.</br>Using defualt settings.</br><b>The defualt input keys for the emulator are:</br><code>[Keyboard Key / CHIP-8 Key]</br></br>[1 / 1] [2 / 2] [3 / 3] [4 / C]</br>[Q / 4] [W / 5] [E / 6] [R / D]</br>[A / 7] [S / 8] [D / 9] [F / E]</br>[Z / A] [X / 0] [C / B] [V / F]</code></b>"},

  {names:["Space Invaders [David Winter].ch8","invaders_rom", "INVADERS"], hash:[35982051930, -35714285786, 15947312129],
    compCycleRate:8, compPersistance:0.1, compShift:true, compWrapX:true, compWrapY:true, compSaveLoad:false,
    note:"A CHIP-8 version of the game Space Invaders. </br>Use Q and E to move and W to fire."},

  {names:["Pong.ch8","pong_rom", "Pong (1 player).ch8"], hash:[78274310905],
    compCycleRate:8, compPersistance:0.1, compShift:true, compWrapX:true, compWrapY:true, compSaveLoad:false,
    note:"A CHIP-8 single player version of the game Pong. </br>Use 1 to move the paddle up and Q to move the paddle down."},

  {names:["Danm8ku.ch8","danm8ku_rom"], hash:[-85303660676, 86935269764,44312548685],
    compCycleRate:1000, compPersistance:1, compShift:false, compWrapX:true, compWrapY:true, compSaveLoad:false,
    note:"A bullet hell game for CHIP-8. Avoid getting hit by the bullets.  </br>WASD controls to move your ship. </br></br><a href=\"https://github.com/buffis/danm8ku\" target=\"_blank\">Author: Björn Kempen</a>."},

  {names:["Snake.ch8","snake_rom"], hash:[34481992282],
    compCycleRate:20, compPersistance:0.2, compShift:false, compWrapX:true, compWrapY:true, compSaveLoad:false,
    note:"A CHIP-8 version of the game Snake but without walls. </br>Use WASD to change the direction of the snake.</br></br><a href=\"https://boringreallife.com\" target=\"_blank\">Author: TimoTriisa</a>."},
    
  {names:["EricLj.ch8"], hash:[0],
    compCycleRate:8, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"The \"boot ROM\" for my emulator.</br>Displays the text \"CHIP-8 Emulator by EricLj\" with a water dripping animation.</br><b>The defualt input keys for the emulator are:</br><code>[Keyboard Key / CHIP-8 Key]</br></br>[1 / 1] [2 / 2] [3 / 3] [4 / C]</br>[Q / 4] [W / 5] [E / 6] [R / D]</br>[A / 7] [S / 8] [D / 9] [F / E]</br>[Z / A] [X / 0] [C / B] [V / F]</code></b>"},

  {names:["15PUZZLE"], hash:[-4719195035],
    compCycleRate:20, compPersistance:0.2, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"A CHIP-8 version of the 15-Puzzle challenge. The numbers in this ROMs case are 1-15 in Hexadecimal i.e. 1-F.</br>The goal is to move the blank spot around until all numbers are in order.</br>Use 2 to move up. S to move down. E to move left. A to move right."},

  {names:["15 Puzzle [Roger Ivie].ch8", "PUZZLE"], hash:[-23327605029],
    compCycleRate:20, compPersistance:0.2, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"A CHIP-8 version of the 15-Puzzle challenge. The numbers in this ROMs case are 1-15 in Hexadecimal i.e. 1-F.</br>The goal is to move the blank spot around until all numbers are in order. The game does not check for a winning condition and leaves that up to the user to decide.</br>Keys on the keyboard directly corrispond to their place on the screen. Use a key to move the blank spot to that keys position on screen."},

    {names:["15 Puzzle [Roger Ivie] (alt).ch8"], hash:[-21370680314],
    compCycleRate:20, compPersistance:0.2, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:true,
    note:"A CHIP-8 version of the 15-Puzzle challenge. The numbers in this ROMs case are 1-15 in Hexadecimal i.e. 1-F.</br>The goal is to move the blank spot around until all numbers are in order. The game does not check for a winning condition and leaves that up to the user to decide.</br>Keys on the keyboard directly corrispond to their place on the screen. Use a key to move the blank spot to that keys position on screen."},

  {names:["Blinky [Hans Christian Egeberg, 1991].ch8", "BLINKY"], hash:[66773178927],
    compCycleRate:20, compPersistance:0.15, compShift:true, compWrapX:true, compWrapY:true, compSaveLoad:true,
    note:"A CHIP-8 version of the game Pac-Man.</br>Use 3 to move up and E to move down. A to move left and S to move right.</br>V to restart."},

  {names:["Blinky [Hans Christian Egeberg] (alt).ch8"], hash:[-48999211666],
    compCycleRate:20, compPersistance:0.15, compShift:true, compWrapX:true, compWrapY:false, compSaveLoad:true,
    note:"A CHIP-8 version of the game Pac-Man.</br>Use 2 to move up and S to move down. Q to move left and E to move right. V to restart."},

  {names:["BLITZ"], hash:[-6168681364],
    compCycleRate:10, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"Drop bombs on buildings to destory them before you plane gets too low and hits them.</br>Use W to drop a bomb."},

  {names:["BRIX"], hash:[-5590339823],
    compCycleRate:8, compPersistance:0.1, compShift:false, compWrapX:true, compWrapY:false, compSaveLoad:false,
    note:"A CHIP-8 version of the game Breakout.</br>Use Q to move the paddle left and E to move the paddle right"},

  {names:["CONNECT4"], hash:[11200752502],
    compCycleRate:8, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:true,
    note:"A CHIP-8 version of the game Connect 4.</br>A two player game.</br>The game uses solid and non-solid chips to differentiate players. The player with non-solid chips goes first.</br>The game does not check for a winning condition and leaves that up to the users to decide.</br>Use Q and E to move the selector left and right. Use W to drop a chip in the current slot."},

  {names:["Guess [David Winter].ch8", "Guess [David Winter] (alt).ch8", "GUESS"], hash:[1641579044, -19862749679],
    compCycleRate:20, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"Player picks a random number between 0 and 62. The game will output a list of numbers. If the players number is on that list then click the W key. If not, click any other CHIP-8 key. After a few screens the game will guess the number the player picked."},

  {names:["HIDDEN"], hash:[39694540825],
    compCycleRate:20, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false, 
    note:"Players flips two cards at a time in an attempt to match up corresponding symbols. </br>Use 2QSE to move the selector. Use W to select a card."},

  {names:["Kaleidoscope [Joseph Weisbecker, 1978].ch8", "KALEID"], hash:[20519594308, 19613075268],
    compCycleRate:8, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"Draws Kaleidoscope style designs.</br>Use 2 to move outward vertically. Q to move outward horizontally. E to move inward horizontally. S to move inward vertically. Press X to make the ROM automatically repeat the patten. Any other key inverts the current pixel."},

  {names:["MAZE", "Maze (alt) [David Winter, 199x].ch8", "Maze [David Winter, 199x].ch8"], hash:[-8225291698, 14084734049],
    compCycleRate:20, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false, 
    note:"Draws a maze-like pattern. Non-interactive."},

    {names:["MERLIN"], hash:[18420513284],
    compCycleRate:8, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false, 
    note:"A CHIP-8 version of the game Simon.</br>The keys QWAS match their corresponding position on screen."},

  {names:["MISSILE"], hash:[-360583139],
    compCycleRate:8, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false, 
    note:"Try to shoot as many circles you can in 10 shots. Everytime you shoot the player platform moves faster.</br>Use the S key to shoot."},

  {names:["Pong [Paul Vervalin, 1990].ch8", "Pong (alt).ch8", "PONG", "PONG2", "Pong 2 (Pong hack) [David Winter, 1997].ch8"], hash:[2425556103, 48609632143, -45535810107],
    compCycleRate:8, compPersistance:0.05, compShift:false, compWrapX:false, compWrapY:true, compSaveLoad:false, 
    note:"A CHIP-8 version of Pong. This is the two player version.</br>The Left Player uses the 1 and Q keys. The Right Player uses the 4 and R keys."},

  {names:["SYZYGY"], hash:[47570497584],
    compCycleRate:8, compPersistance:0.1, compShift:false, compWrapX:true, compWrapY:true, compSaveLoad:true, 
    note:"Only way I can describe this is it's like an odd game of Snake.</br>To start a new game with boarders use V. Without boarders use F. When in play use 3 and E to move up and down. Use A and S to move left and right."},

  {names:["TANK"], hash:[-29421901875],
    compCycleRate:16, compPersistance:0.1, compShift:false, compWrapX:true, compWrapY:true, compSaveLoad:false,
    note:"Player controls a tank and tries to shoot the moving target. You have 25 shots to gain as many points as possible. You also lose 5 shots if the target and the tank touch.</br>Use 2QSE to move the tank. Use W to shoot. The up and down controls are reversed."},

  {names:["TETRIS"], hash:[-28536509524],
    compCycleRate:8, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"A CHIP-8 version of Tetris.</br>Use W and E to move the piece left and right. Q to rotate the piece. A to drop the piece."},

  {names:["UFO"], hash:[-2357304686],
    compCycleRate:8, compPersistance:0.2, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"Launch your missiles at the passing UFO. Hitting the Large UFO gives 5 points and the small UFO gives 15 points. You have 15 missiles to start with.</br>Use W to launch the missile straight and Q and E to launch diagonally."},

  {names:["Addition Problems [Paul C. Moews].ch8"], hash:[-24553814736],
    compCycleRate:8, compPersistance:0.2, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"Solve the adition problem presented on the screen.</br>The keys are as folows: <br>1=1<br>2=2<br>3=3<br>4=Q<br>5=W<br>6=E<br>7=A<br>8=S<br>9=D<br>0=X"},

  //TODO: VBRIX sometimes at the start the ball doesnt spawn. is this a compatability issue?
  {names:["VBRIX"], hash:[-36749216140],
    compCycleRate:10, compPersistance:0.1, compShift:true, compWrapX:false, compWrapY:false, compSaveLoad:true,
    note:"A sort of sideways version of the game Breakout.</br>Use 1 and Q to move the paddle up and down. A to start."},

  {names:["VERS"], hash:[-19226769104],
    compCycleRate:8, compPersistance:0.1, compShift:false, compWrapX:true, compWrapY:true, compSaveLoad:false,
    note:"A two player Tron like game. The first person to collide with a wall or trail loses the round.</br>The left player uses A and Z for up and down and 1 to turn left. The left player cannot turn right. The right player uses 4 and R for up and down and V to turn right. The right player cannot turn left."},

  {names:["WIPEOFF"], hash:[1999573643],
    compCycleRate:8, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"A Breakout type clone with small squares replacing the horizontal bricks of the origonal.</br>Use Q and E to move the paddle left and right."},

  {names:["Particle Demo [zeroZshadow, 2008].ch8"], hash:[-41166046015],
    compCycleRate:50, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"A partical system demo. Non-interactive."},

  {names:["Sierpinski [Sergey Naydenov, 2010].ch8", "Sirpinski [Sergey Naydenov, 2010].ch8"], hash:[-14004650155],
    compCycleRate:80, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"Draws a Sierpiński triangle. Non-interactive."},

  {names:["Stars [Sergey Naydenov, 2010].ch8"], hash:[42084579263],
    compCycleRate:30, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:true,
    note:"Draws a a star or firework type animation. Non-interactive."},

  {names:["Trip8 Demo (2008) [Revival Studios].ch8"], hash:[86763486488],
    compCycleRate:8, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"A sprite animation demo. Non-interactive."},

  {names:["Zero Demo [zeroZshadow, 2007].ch8"], hash:[-24968834668],
    compCycleRate:8, compPersistance:0.2, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"A sprite animation demo. Non-interactive."},

  {names:["Airplane.ch8"], hash:[21303099779],
    compCycleRate:9, compPersistance:0.12, compShift:false, compWrapX:true, compWrapY:false, compSaveLoad:false,
    note:"Drop your bombs without hitting any of the other airplanes.</br>Use S to drop a bomb."},
  
  {names:["Animal Race [Brian Astle].ch8"], hash:[13099740275],
    compCycleRate:20, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"A race betting game. Choose an animal to bet for and a bet of $1 to $9. Reaching a winnings of $256 wins the game.</br>Use the full key map for inputs. See the Keyboard layout for corresponding keys. A=Z B=C C=4 D=R F=E"},

  {names:["Astro Dodge [Revival Studios, 2008].ch8"], hash:[-65305044081],
    compCycleRate:10, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:true,
    note:"Dodge the astroids.</br>W to start. Q and E to move Left and Right"},

  {names:["Biorhythm [Jef Winsor].ch8"], hash:[22589932603],
    compCycleRate:10, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"Program to chart and idea called Biorhythms. Use the keyboard to enter a birth date and a starting date both in MM-DD-YYYY format. Then use C and V to move the starting date of the charts.</br>See a copy of \"Biorhythm [Jef Winsor].txt\" for more information."},

  {names:["Bowling [Gooitzen van der Wal].ch8"], hash:[15503104560],
    compCycleRate:10, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"A bowling simulator. Can be played as single player or multiplayer.</br>For mor information see a copy of \"Bowling [Gooitzen van der Wal].txt\" for more information."},

  {names:["Breakout (Brix hack) [David Winter, 1997].ch8"], hash:[-6366733567],
    compCycleRate:8, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"A Breakout type clone but with no gaps horizontally between bricks.</br>Use Q and E to move the paddle left and right."},

  {names:["Breakout [Carmelo Cortez, 1979].ch8"], hash:[15464462430],
    compCycleRate:7, compPersistance:0.1, compShift:false, compWrapX:true, compWrapY:false, compSaveLoad:false,
    note:"A Breakout type clone but the goal is to simply reach the other side. The bricks have a strange breaking pattern but I am not sure if that is intentional or a compatability issue.</br>Use Q and E to move the paddle left and right."},

  {names:["Brick (Brix hack, 1990).ch8"], hash:[-71103311806],
    compCycleRate:8, compPersistance:0.1, compShift:false, compWrapX:true, compWrapY:false, compSaveLoad:false,
    note:"A Breakout type clone but with no gaps between bricks.</br>Use Q and E to move the paddle left and right."},

  {names:["Cave.ch8"], hash:[35925833237],
    compCycleRate:8, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"Guide the square through the cave without hitting the walls. Once the square starts moving it will not stop moving and only change directions.</br>Use V to start and 2QSE to change direction"},

  {names:["Coin Flipping [Carmelo Cortez, 1978].ch8"], hash:[6336881799],
    compCycleRate:20, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"A \"Coin-flipping\" program. Generates a random flip and counts how many \"Heads\" or \"Tails\" are generated"},

  {names:["Craps [Camerlo Cortez, 1978].ch8"], hash:[2390296288],
    compCycleRate:8, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"A demo/unfinished version of the game Craps. Press any key to roll the dice. Each number represents a single die."},

  {names:["Deflection [John Fort].ch8"], hash:[-17275152630],
    compCycleRate:8, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"A two player game where each player is given a turn to place mirrors to deflect a ball into a target. The more deflections in a turn the higher the score in that round.</br>This game has a complicated control scheme. See \"Deflection [John Fort].txt\" for more details."},

  {names:["Figures.ch8"], hash:[82683060516],
    compCycleRate:8, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"A tetris like game. Not sure exactly how to play this one but it seems the goal is to simply pack as many falling numbers in the given space as possible.</br>Use Q and E to move the falling piece left and right."},

  {names:["Hi-Lo [Jef Winsor, 1978].ch8"], hash:[-12395040894],
    compCycleRate:8, compPersistance:0.1, compShift:false, compWrapX:true, compWrapY:false, compSaveLoad:false,
    note:"The computer generates a random number between 0 and 99 and you have to guess what it is. Use the keypad to enter a number and the computer will tell you if the number you guessed is too high or too low. You have 10 chances to guess the number."},

  {names:["Filter.ch8"], hash:[16056497905],
    compCycleRate:8, compPersistance:0.1, compShift:false, compWrapX:true, compWrapY:false, compSaveLoad:false,
    note:"Catch as many falling squares as possible. Everytime you catch a square you gain a point. Everytime you let a square fall past your paddle you lose a life.</br>Use Q and E to move the paddle left and right."},

  {names:["Landing.ch8"], hash:[-32827587628],
    compCycleRate:8, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"Drop bombs on the towers to make them smaller. Your plane will slowly lose altitude. The round ends when you hit a tower.</br>Use S to drop a bomb."},

  {names:["Lunar Lander (Udo Pernisz, 1979).ch8"], hash:[-146373874615],
    compCycleRate:8, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:true, compSaveLoad:false,
    note:"Land your lunar lander on the surface of the moon.</br>Use 2 for upwards thrust. Q and E for thrust left and right."},

  {names:["Mastermind FourRow (Robert Lindley, 1978).ch8"], hash:[29535845786],
    compCycleRate:8, compPersistance:0.1, compShift:true, compWrapX:false, compWrapY:true, compSaveLoad:false,
    note:"The computer generates a random 4-digit code with the numbers 1-6. The players goal is to try to guess that code within 10 tries. Each column of 4 dashes represents a try. After each column of numbers are entered, a score made up of symbols is assigned to that column. Two dots means that a number exactly matches what is in the code. A solid line means that a number exists in the code but it is currently in the wrong place.</br>Use the keys 1 2 3 Q W E to enter numbers. V clears the current try."},

  {names:["Most Dangerous Game [Peter Maruhnic].ch8"], hash:[12249434154],
    compCycleRate:8, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"A two player game where one player hunts the other. Each round takes place in a maze in which you can't see the walls until you interact with them.</br>See the file \"Most Dangerous Game [Peter Maruhnic].txt\" for a more in depth explanation and game controls."},

  {names:["Nim [Carmelo Cortez, 1978].ch8"], hash:[-7715248324],
    compCycleRate:8, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"A single player game against the computer. The player and computer take turns subracting either 1, 2, or 3 from the number displayed on screen. The goal is to not be the last one to subract the number to zero.</br>Use the 1, 2, and 3 keys to subract that number."},

  {names:["Paddles.ch8"], hash:[-36940725723],
    compCycleRate:9, compPersistance:0.05, compShift:true, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"A pong or table tennis like game. Can be played signle player or two player.</br>To start press V for single player or F for two player. In single player use Q and E to move the player paddle. In two player the top player uses Q and E to move and the bottom player uses A and D."},

  {names:["Programmable Spacefighters [Jef Winsor].ch8"], hash:[15474757539],
    compCycleRate:8, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"A multiplayer game in which players program spacefighters with commands that are executed during a round.</br>This game has complicated gameplay and many inputs. See \"Programmable Spacefighters [Jef Winsor].txt\" for more details on how to play."},

  {names:["Reversi [Philip Baltzer].ch8"], hash:[11625064035],
    compCycleRate:10, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"A two player CHIP-8 version of the game Reversi.</br>Use 2QSE to move the cursor and W to place the current piece. Use V to skip the current players turn."},

  {names:["Rocket [Joseph Weisbecker, 1978].ch8"], hash:[-17138497400],
    compCycleRate:8, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"Luanch your rocket and try to hit the passing plane.</br>Use V to launch the rocket."},

  {names:["Rocket Launch [Jonas Lindstedt].ch8"], hash:[23940779256],
    compCycleRate:10, compPersistance:0.2, compShift:false, compWrapX:false, compWrapY:true, compSaveLoad:true,
    note:"A cave flying type game in which you try to fly your rocket without touching the walls.</br>Use C to start. Use Q and E to move left and right."},

  {names:["Rocket Launcher.ch8"], hash:[-8795680451],
    compCycleRate:8, compPersistance:0.1, compShift:true, compWrapX:false, compWrapY:false, compSaveLoad:true,
    note:"A demo program.</br>Use V to launch the rocket."},

  //TODO: seems to be a bug in my code. Rush Hour [Hap, 2006] (alt) works in some other emulators.
  {names:["Rush Hour [Hap, 2006] (alt).ch8"], hash:[-12875744074],
    compCycleRate:8, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"NOTE: I could not get this version to work correctly. Use the non-(alt) version</br>A CHIP-8 version of the board game Rush Hour."},

  {names:["Rush Hour [Hap, 2006].ch8"], hash:[78973603451],
    compCycleRate:8, compPersistance:0.1, compShift:false, compWrapX:false, compWrapY:false, compSaveLoad:false,
    note:"A CHIP-8 version of the board game Rush Hour. Move the block containing the arrow to the exit point.</br>Use WASD to move to cursor. Use Z to select"},
];

//Check if the ROM name is in the compatibility list. I would assume that people
//wouldn't be naming their ROM the same as something that's already out there.
//Returns the index position of the ROM in the compatibility list if found.
//Returns 0 if not found.
function isInCompatabilityListByName(name){
  //For each ROM in the combatibility list
  for(var i = 1; i < programCompatabilityList.length; i++){
    //For each name at the currently checking ROM.
    for(var j = 0; j < programCompatabilityList[i].names.length; j++){
      if(programCompatabilityList[i].names[j] == name){
        console.log("Match by name: " + i);
        return i;
      }
    }
  }
  return 0;
}

//Check to see if the ROM is in the compatibility list by file hash.
//Returns the index position of the ROM in the compatibility list if found.
//Returns 0 if not found.
function isInCompatabilityListByHash(hash){
  //For each ROM in the combatibility list
  for(var i = 1; i < programCompatabilityList.length; i++){
    //For each hash value at the currently checking ROM. Some ROMs will be
    //functionally the same but have different hashs.
    for(var j = 0; j < programCompatabilityList[i].hash.length; j++){
      if(programCompatabilityList[i].hash[j] == hash){
        console.log("Match by hash: " + i);
        return i;
      }
    }
  }
  return 0;
}

//Change internal emulator settings to match the values in the compatibility
//list.
function setEmulatorToCompatabilitySettings(settingsListIndex){
  var currentSettings = programCompatabilityList[settingsListIndex];
  var defaultSettings = programCompatabilityList[0];
  
  //Instructions per draw frame
  if(currentSettings.compCycleRate != undefined){
    numberOfInstructionThisFrame = currentSettings.compCycleRate;
  } else {
    numberOfInstructionThisFrame = defaultSettings.compCycleRate;
  }

  //Display persistance
  if(currentSettings.compPersistance != undefined){
    displayDecayRate = currentSettings.compPersistance;
  } else {
    displayDecayRate = defaultSettings.compPersistance;
  }

  //Shift instructions
  if(currentSettings.compShift != undefined){
    compatabilityBitShift = currentSettings.compShift;
  } else {
    compatabilityBitShift = defaultSettings.compShift;
  }

  //Display wrapping on the X-Axis
  if(currentSettings.compWrapX != undefined){
    wrapDisplayX = currentSettings.compWrapX;
  } else {
    wrapDisplayX = defaultSettings.compWrapX;
  }

  //Display wrapping on the Y-Axis
  if(currentSettings.compWrapY != undefined){
    wrapDisplayY = currentSettings.compWrapY;
  } else {
    wrapDisplayY = defaultSettings.compWrapY;
  }

  //Save and Load instructions
  if(currentSettings.compSaveLoad != undefined){
    compatabilitySaveLoad = currentSettings.compSaveLoad;
  } else {
    compatabilitySaveLoad = defaultSettings.compSaveLoad;
  }

  setROMDescription(currentSettings.note);
}


function setSettingsByName(name){
  var listIndex;

  listIndex = isInCompatabilityListByName(name);
  setEmulatorToCompatabilitySettings(listIndex);
}

