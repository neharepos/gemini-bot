const {REST, Routes } = require("discord.js");
const dotenv = require('dotenv');
dotenv.config();
const commands = [
    {
        name: "ping",
        description: "Replies with Pong!",
    },
];

const rest =  new REST ({version: "10"}).setToken(process.env.TOKEN);


(async () => {
    try{
        console.log("Started refreshing application (/) commands.");

        await rest.put(Routes.applicationCommands("1219362812938162289"), {body: commands});

        console.log("Successfully reloaded application (/) commands.");
    }catch (error) {
        console.error(error);
    }
})();