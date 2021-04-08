## Azkabreak

[Link Deploy](https://rumas97.github.io/Azkabreak/)

## Description

In this game the player has to move Harry Potter vertically and shoot spells at the Dementors that appear from the right side of the screen. The game is over if Harry Potter collides with an incoming Dementor.

## MVP (DOM-CANVAS)

- The Death Eaters appear randomly from the right side of the screen
- Harry Potter moves vertically
- Harry Potter shoots spells horizontally
- Death Eater hit by a spell disappears
- Harry Potter hitting a Death Eater ends the game
- Death Eater reaches left side of the screen
- Scoreboard

## Backlog

- Adding obstacles
- Death Eaters shooting spells

## Data structure

**game.js**

- startLoop(){}
- clearCanvas(){}
- draw(){}
- move(){}
- shoot(){}
- collision(){}
- keepScore(){}
- endGame(){}

## States & States Transitions

Definition of the different states and their transition (transition functions)

- startScreen
- gameScreen
- gameoverScreen

## Task

- game - buildDom
- game - buildStartScreen
- game - addEventListener
- game - buildGameScreen
- game - buildGameOverScreen
- game- addEventListener
- game - startLoop
- game - drawCanvas
- harrypotter - draw
- harrypotter - move
- harrypotter - shoot
- deathEaters - draw
- deathEaters - move
- game - keepScore
- game - endGame
- game - addEventListener

## Additional Links

### Trello

[Link url](https://trello.com/b/tToS7yXF/azkabreak)

### Slides

[Link Slides.com](https://www.canva.com/design/DAEbFgvhMf0/Bbz5CtklJ7JMZieM247OYg/view?utm_content=DAEbFgvhMf0&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton)
