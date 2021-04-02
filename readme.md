## Azkabreak

[Link Deploy](http://github.com)

## Description

In this game the player has to move Harry Potter vertically and shoot spells at the Death Eaters that appear from the right side of the screen. The game is over if Harry Potter collides with an incoming Death Eater. 

## MVP (DOM-CANVAS)

* The Death Eaters appear randomly from the right side of the screen 
* Harry Potter moves vertically 
* Harry Potter shoots spells horizontally
* Death Eater hit by a spell disappears 
* Harry Potter hitting a Death Eater ends the game
* Death Eater reaches left side of the screen 
* Scoreboard

## Backlog

* Adding obstacles 
* Death Eaters shooting spells 


## Data structure

**main.js**
* buildStartScreen(){}
* buildGameScreen(){}
* buildGameOverScreen(){}

**game.js**
* startLoop(){}
* collision(){}
* clearCanvas(){}
* drawCanvas(){}
* keepScore(){}
* endGame(){}

**harrypotter.js**
* draw(){}
* move(){}
* shoot(){}

**deathEaters.js**
* draw(){}
* move(){}





## States & States Transitions

Definition of the different states and their transition (transition functions)

- startScreen
- gameScreen
- gameoverScreen


## Task

* main - buildDom
* main - buildStartScreen
* main - addEventListener
* main - buildGameScreen
* main - buildGameOverScreen
* main- addEventListener
* game - startLoop
* game - drawCanvas
* harrypotter - draw
* harrypotter - move
* harrypotter - shoot
* deathEaters - draw 
* deathEaters - move
* game - keepScore
* game - endGame
* game - addEventListener

## Additional Links

### Trello

[Link url](https://trello.com/b/tToS7yXF/azkabreak)

### Slides

[Link Slides.com](http://slides.com)
