# Better Weather 🌤️
 ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white) ![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black) 

![champhubgif](https://github.com/laurelbonal/ChampHub/assets/155783683/397778e4-faf3-4fcf-98b9-92181e45dba5)

## 🌟 Overview

ChampionHub is a database of all League of Legends champions, as of the 14.11.1 Patch :) you can sort through champions by name, difficulty level, and type. It was created through a combination of a love for coding and a gaming hobby. I pulled inspiration for this app from the officil League of Legends website, used the official RIOT API, and have registered this application with RIOT itself. 

## Deployed link

Don't want to install or you don't need to look at the code? Check out my deployed link [here](https://champion-hub.vercel.app/)

## ✨ Features

- dynamic URL. The URL changes based on which tab you are on for the champ details page
- LOTS of error handling. Since I had optional parameters for the URL, I was having issues with the application not displaying errors when it needed to. To solve this, I made "acceptable routes" and specified that if the URL goes to a route outside of those, it takes you to an error page.
- reactive design through multiple breakpoints
- Accessibility. My application has 0 WAVE and contrast errors, as well as a 20/21 lighthouse rating. The reason I dont have 100% for the lighthouse is because I wanted the application accessible to screen readers, and one of my ARIA labels has different text than the element it is attached to.
- search champion by name, or through filters
- "sticky" search functions, the search and filters stay at the top of the page as you scroll through all champions

## ⚙️ Installation & Setup

1.  `cd` into the correct directory
2. `git clone git@github.com:laurelbonal/ChampHub.git`
3. `cd ChampHub`
4. Install all dependencies with `npm i` or `npm install`
5. Run the app with `npm start

### Tests

For this application, I did E2E testing using Cypress. If you want to check out the testing for any of my pages, including All Champions, Single Champions, and Error testing, follow these instructions

1. `cd` into the repo
2. run `npm run cypress`
3. Select the test you wish to run!

## 🏆 Wins

1. I am very proud of my design for this application, I pulled colors from the official League of Legends site and tried to make the application as true to the game as possible.
2. I am SUPER proud of the dynamic URL for the single champ page (it's pretty cool, check it out ☺️)
3. I had the MVP done within the first 3 days of being assigned this project, with day 1 spent just designing my [wireframe](https://www.figma.com/design/rcHZNL5xhvh1HXcsQ9Xk5r/Untitled?node-id=0-1&t=GkW5UqoNtx3p95AV-0). Since I was able to complete my MVP so quickly, I was able to spend a lot of time focusing on small details. 

## 🚧 Challenges

1. The wireframe I designed did not work out as expected. The images coming in from the API were landscape and I expected them to be portrait, so I had to readjust my vision. I spent lots of time getting opinions from other developers and players of League of Legends trying to figure out what would look best, and I'm very happy with the final outcome.
2. Learning how to make the URL dynamic for different tabs was difficult and I thought for a second "Is anyone even going to notice this?", but I persevered and am glad I did! I feel that the dynamic URL makes the application feel more complete, and makes it so the application can be used how I envisioned.
3. If you look at the wireframe, you can see I originally planned a landing page. I decided to get rid of it last minute because it didn't do much. Getting rid of this page proved to be more of a struggle than I initially thought, and I had to refactor multiple pages. 

## Future Plans and Features

1. Typescript
2. Display "free to play" champions on the landing screen (yes, I'm going to bring it back after going through all the trouble to remove it)
3. Allow users to choose language, to allow me to help people from multiple backgrounds
4. Add skins carousel to champion page
5. Add common build paths

### Thank you for checking out ChampionHub! 
