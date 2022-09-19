# Discord bot connected to a DB with a website

#### Video Demo: <URL https://youtu.be/b4QqUkC5wWM>

#### Description:

This is a Discord bot which comunicates with a DB to output a text when a user uses command /ping. The output of the command can be changed by changing the value in the DB which can be done trought a website that looks at all of your servers and outputs the once where you have administrative permissions. The website has aundification trought discord so you will not be able to change the output of the command on the servers where you dont have the administration permissions.

#### How to start-up?

You need to have node and python installed first, you can start applications by launching .sh files in launchingApplication folder with noteable exception being back-end of the website to which you can read the instructions on how to start it in the same folder in back.txt file.

#### Technologies used:

- Node.js (Discord bot)
- Discord.js
- Python
- Flask
- vite
- React

#### Basic overview of the project:

In DiscordApplication folder you can find the code for the Discord bot where `.env` file should be created by a templete of `.env.example` file all of the code is stored in src folder where index.ts is the main file that runs all of the exacutions, deploy-commands.ts runs to deploy/redeploy the commands, and in a commands folder we store all of are commands, Important note if you want to add another command the file should `export { name, description, permissions, execute };`. In the website folder you can find the code for the Front-end and back-end of the website the backend runs on some simple flask code and front-end uses standerd react nothing to complicated, and in the launchingApplication folder you can find the code for the launching applications.
