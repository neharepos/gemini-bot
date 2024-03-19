const { Client, GatewayIntentBits } = require("discord.js")
const dotenv = require('dotenv');
dotenv.config();
// Client is to tell discord to make me a client to interact with the discord servers

const client = new Client({
    intents:[
        GatewayIntentBits.Guilds, // Guild is to create an event
        GatewayIntentBits.GuildMessages, //GuildMessages to know wen a message is sent
        GatewayIntentBits.MessageContent //MessageContent to get the contents of the message when the message is sent
    ]
})
//intents are the permissions we're giving our bot to access a particular set of data from the server where the bot is invited to 
// Guilds are the specific permissions given to the BOT like messaging in the server(GuildMessages), adding reaction to messages(GuildMessageReact) etc.
// We have to saperately give acess to messages to aur bot's application from the discords developer portal.

client.on("messageCreate", (message) => {
    console.log(message.content)
})

// client.on takes an argument after which it has to perform an action lik in this case the argument is "messagecreate", so in this whenever
// a new message instance is created the message is passed in the arrow function as a string called message after which it is console logged 
// In console log only message.content is printed but to see the other values which are available we can just print message to get the full value of what the message variable is carrying. 

client.login(process.env.TOKEN)
// After telling discord to make a client above we have to login to that client with our discord bot secret access token 
// This token helps discord to identify which bot or application we're trying to connect to


// npm start