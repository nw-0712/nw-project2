
![resp-removebg-preview](https://github.com/user-attachments/assets/fb160023-789d-4ba6-83b3-d97e55566c90)


Welcome Users,

**SPACE ALIEN MEMORY MATCH GAME**<br/>
Match the space alien tiles and improve your memory<br/>

OVERVIEW<br/>
This is a browser-based memory match game is done in HTML, CSS, and JavaScript. It consists of 10 pairs of matching space-alien cards and the user matching the various 10 card pairs, to improve memory and concentration. The objective is to try and match the pairs in a certain amount of time, via a timer and counter.

How It Works<br/>
If you're unfamiliar with the game, the rules are very simple; flip over two hidden cards at a time to locate the ones that match!

The game board consists of ten themed space and alien graphical cards that are arranged randonmy in a grid style layout. The deck is made up of ten different pairs of cards, each with different fun vector and AI geneated style graphics on the one side (back side) and one default spaceship graphic on the front side of the card.<br/> 

![image](https://github.com/user-attachments/assets/7e4cebf4-ce72-4995-85f9-48d53f3edffb)

Each turn:<br/>

* A player flips one card over to reveal its underlying graphic card
* The player then turns over a second card, trying to find the corresponding card with the same graphic card
* If the cards match, both cards stay flipped over
* If the cards do not match, both cards are returned to their initial hidden state
* There is a timer that counts down on the intitation of the game when the user starts the game
* The game has a 'moves' counter that counts the amount of moves by the gamer, to try help with focus and
* The restart button restarts the game.


CONTENTS:<br/>
User experience (ux)<br/>
* Project goals<br/>
* Epics & user stories<br/>
* Colours<br/>
* Typography (fonts)<br/>
* Wireframes<br/>

Features<br/>
* Home page<br/>
* Game page<br/>

Technologies used<br/>
* Frameworks and Libraries<br/>
* Programs<br/>
* Languages<br/>

Testing<br/>
* User stories<br/>
* Code validation<br/>
* Accessibility & scores<br/>
* Delpoyment<br/>

Credits<br/>


User Experience<br/>
Home Page<br/>
![image](https://github.com/user-attachments/assets/0a02b6f4-6905-4ea4-863c-80b306414977)


Game page<br/>
![image](https://github.com/user-attachments/assets/57694752-afc3-43e1-9f68-1c6e354f236c)

![image](https://github.com/user-attachments/assets/3ce84aa5-5b67-4091-963f-a8e2edbb10a0)


* The game must offer the ability to be rendered with different sizes of the grid layout of 10 different pairs of graphic game tiles<br/>
* The player has to be able to flip the tiles with the mouse or keyboard.<br/>
* The player must only be able to flip two tiles face up at a time.<br/>
* After a suitable time, matching tiles that face up must not have a visible representation in the grid.<br/>
* After an appropriate time, tiles facing up and not matching must be flipped face down.<br/>
* The positions, or rather the graphics, of the tiles in the grid must be randomized before each game round.<br/>
* The game must count how many attempts the player has made to find matching tiles and present the number of attempts when the game round is over.<br/>
* After a game round is over, the user must be allowed to restart the new game round without reloading the page.


Project Goals
* Bring your own idea(s) to life, based on providing value to users to address a specific real or imagined need.<br/>
* Use the relevant project assessment criteria as a guide to the minimum required functionality.<br/>
* Test a front-end web application through the development, implementation and deployment stages<br/>
* A fully functioning, well-documented game.<br/>
* Deploy a Front-End web application to a Cloud platform.<br/>
* Demonstrate and document the development process through a version control system such as GitHub.<br/>
* Implement Front-End interactivity, using core JavaScript, JavaScript libraries or frameworks.<br/>


User stories<br/>
* As a user I want the ability to click the 'Start Game' button and be tkaen to the game page<br/>
* As a user I want the ability to interact with the tiles in the grid layout and be able to click on tiles to see if there is a mtach or no match<br/>
* As a user I want the ability to to see how many moves I have left in the game<br/> 
* As a user I want the ability to see the amount of time left via the timer on the tiop of the grid layout<br/>
* As a user I want the ability to restart the game if I run out of time or run out of moves<br/>
* As a user I want the ability to clcik the 'Restart' button and have the game refesh<br/>

Colours<br/>
![image](https://github.com/user-attachments/assets/1665923a-a440-41da-8f09-25209eaaa519)

Typography<br/>
Headings: Font used: Agdasima<br/>
Subheading & body copy: Font used: Roboto<br/>

Wireframes<br/>
![image](https://github.com/user-attachments/assets/a311a1ec-d0fc-4044-bfb5-9ee120787fa4)
![image](https://github.com/user-attachments/assets/c7b6ca2f-c8fb-458c-92ee-ddc8fc0477bf)


Features<br/>
* Home page:
* Startgame button directs suer to next screen which is the game screen.<br/>
* On page laod the game starts for the user<br/>

* Game Page:<br/>
* A game-container contains the game board, moves counter, and timer.<br/>
* Tiles are created, shuffled, and flipped using flipTile and checkForMatch functions.<br/>
* The tiles are dynamically injected into the grid-container using JavaScript.<br/>
* The shuffle button restarts the game.<br/>
* Set matched tiles to visibility: hidden instead of removing the flip class.<br/>
* Each tile needs two sides: the front (image) and the back (which will show initially).<br/>
* Single back tile image and and array of 10 front tile variation pairs.<br/>
* A timer counts minutes and seconds.<br/>
* The game tracks moves and declares if the player wins or runs out of moves.<br/>
* All tiles start with a common default back image<br/>
* Each tile has an event listener attached to handle the click, which flips the tile and checks for matches.<br/>
* The game updates the moves left and displays appropriate notifications (e.g., "You have won!" or "You have run out of moves") directly into the DOM.<br/>
* Game logic: If all tiles are matched, the game shows a "You have won!" message & ff the player runs out of moves, it shows "You have run out of moves!".<br/>


Technologies used<br/>
Languages: HTML, CSS, Javascript<br/>

HTML5<br/>
https://en.wikipedia.org/wiki/HTML5

CSS<br/>
https://en.wikipedia.org/wiki/CSS

Javascript<br/>
https://www.javascript.com/

Frameworks, Libraries and Programs Used<br/>
VS desktop<br/>
https://code.visualstudio.com/download

Github<br/>
https://github.com/

Gitpod
https://www.gitpod.io/

Visme<br/>
https://www.visme.co/

W3C markup validator<br/>
https://validator.w3.org/

Font Awesome<br/>
https://fontawesome.com/

Freepix<br/>
https://www.freepik.com/

Pixabay<br/>
https://pixabay.com/vectors/search/ai/

Chromedevtools<br/>
https://developer.chrome.com/docs/devtools

Am I responsive<br/>
https://ui.dev/amiresponsive

Google fonts<br/>
https://fonts.google.com/

Testing<br/>
User stories<br/>

Chrome DevTools<br/>
https://developer.chrome.com/docs/devtools/<br/>
Chrome DevTools was used during the development process to test, explore and modify HTML elements and CSS styles used in the project.<br/>

Responsiveness<br/>
https://ui.dev/amiresponsive<br/>
Am I Responsive? was used to check responsiveness of the site pages across different devices.<br/>
Responsive Design Checker was used to check responsiveness of the site pages on different screen sizes.

Code valildation<br/>
The W3C Html Markup Validator and W3C CSS Validator services were used to validate all pages of the project in order to ensure there were no syntax errors.

Home page:<br/>
HTML<br/>
![image](https://github.com/user-attachments/assets/494ccd30-d297-457f-8342-1d407b87357b)

Game page<br/>
HTML<br/>
![image](https://github.com/user-attachments/assets/24ee0564-4031-406d-a2c3-570672f1f2a1)

CSS<br/>
![image](https://github.com/user-attachments/assets/4358a52f-d349-4767-96a5-5b92879d910c)

Javascript<br/>


Accessibility & scores<br/>
Used Lighthouse in Chrome DevTools to confirm accessibility used in throughout the website are easy to read and accessible.

Home page<br/>
![image](https://github.com/user-attachments/assets/f31b539d-8599-4c8d-91e1-c8d4bb09d5c5)


Game Page<br/>
![image](https://github.com/user-attachments/assets/c9e04a79-be1b-4c66-8a8a-a828b6bbaea1)


Deployment<br/>
Github pages & Libraries<br/>
https://nw-0712.github.io/nw-project2/

Chrome DevTools was used to test responsiveness in different screen sizes during the development process.

Credits<br/>
https://stackoverflow.com/<br/>
CSS-Tricks and W3Schools were consulted on a regular basis for inspiration and sometimes to be able to better understand the code being implement.<br/>

Pixabay: AI generated images<br/>
https://pixabay.com/vectors/search/ai/<br/>

Duckduckgo<br/>
https://duckduckgo.com/?t=ffab&q=html+formatter&ia=answer<br/>
Formatted html pages through this tool.





