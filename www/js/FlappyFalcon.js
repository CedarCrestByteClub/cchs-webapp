//Credit for this code goes to blog.lessmilk.com

// Initialize Phaser, and create a 400x490px game
var game = new Phaser.Game(screen.width, screen.height, Phaser.CANVAS, 'gameDiv');

var firstTime = true;

// Create our 'main' state that will contain the game
var mainState = {

    preload: function() {  
	    // Change the background color of the game
	    game.stage.backgroundColor = '#71c5cf';
	
	    // Load the bird sprite
	    //Credit to flaminginfernox.deviantart.com
	    game.load.image('bird', 'img/bird.png'); 
	    
	    //Credit to itch.io
	    game.load.image('pipeB', 'img/pipeB.png'); 
	    game.load.image('pipeG', 'img/pipeG.png');  
	},
	
	create: function() {  
	    // Set the physics system
	    game.physics.startSystem(Phaser.Physics.ARCADE);
	
	    // Display the bird on the screen
	    this.bird = this.game.add.sprite(100, 245, 'bird');
	    this.bird.height = screen.width/8;
	    this.bird.width = screen.width/8;
	    //this.bird.scale.setTo(screen.height/500, screen.height/500);
	
	    // Add gravity to the bird to make it fall
	    game.physics.arcade.enable(this.bird);
	    this.bird.body.gravity.y = 800;

	    // Call the 'jump' function when the spacekey is hit
	    //var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	    //spaceKey.onDown.add(this.jump, this);     
	    
	    this.pipes = game.add.group(); // Create a group  
		this.pipes.enableBody = true;  // Add physics to the group  
		this.pipes.createMultiple(20, 'pipeG'); // Create 20 pipes  
		this.timer = game.time.events.loop(((screen.width)/250) * 1000, this.addRowOfPipes, this);
		
		this.score = 0;  
		this.labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });  
		
		var pointer = game.input.activePointer;
		console.log(pointer.id);
		console.log(pointer.isDown);
	},
	
	update: function() {  
		game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);
		if(game.input.activePointer.isDown) {
			this.jump();
		}
		//var pointer = game.input.activePointer; 
		//console.log(pointer.isDown);
	    // If the bird is out of the world (too high or too low), call the 'restartGame' function
	    if (this.bird.inWorld == false)
	        this.restartGame();
	},
	
	// Make the bird jump 
	jump: function() {  
	    // Add a vertical velocity to the bird
	    this.bird.body.velocity.y = -screen.height/2.25;
	},
	
	// Restart the game
	restartGame: function() {  
	    // Start the 'main' state, which restarts the game
	    firstTime = true;
	    game.state.start('main');
	},
	
	addOnePipe: function(x, y) {  
	    // Get the first dead pipe of our group
	    var pipe = this.pipes.getFirstDead();
	
	    // Set the new position of the pipe
	    pipe.reset(x, y);
	
	    // Add velocity to the pipe to make it move left
	    pipe.body.velocity.x = -200; 
	    
	    pipe.width = screen.height/15;
	    pipe.height = screen.height/15;
	    
	    //pipe.scale.setTo(screen.height/500, screen.height/500);
	
	    // Kill the pipe when it's no longer visible 
	    pipe.checkWorldBounds = true;
	    pipe.outOfBoundsKill = true;
	},
	
	addRowOfPipes: function() {  
	    // Pick where the hole will be
	    var hole = Math.floor(Math.random() * 6) + 1;
	    this.score += 1;
	    if(firstTime == true) {
	    	this.score -= 1;
	    	firstTime = false;
	    } 
		this.labelScore.text = this.score;  
	
	    // Add the 6 pipes 
	    for (var i = 0; i < 9; i++)
	        if (i != hole && i != hole + 1) 
	            this.addOnePipe((7 * screen.width)/8, i * screen.height/10 + 20);   
	},
};

// Add and start the 'main' state to start the game
game.state.add('main', mainState);  
game.state.start('main');  