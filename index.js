const { Client, GatewayIntentBits} = require("discord.js")
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// const { SlashCommandBuilder } = require('discord.js');

// Client is to tell discord to make me a client to interact with the discord servers

const client = new Client({
    intents:[
        GatewayIntentBits.Guilds, // Guild is to create an event
        GatewayIntentBits.GuildMessages, //GuildMessages to know when a message is sent
        GatewayIntentBits.MessageContent //MessageContent to get the contents of the message when the message is sent
    ]
})
//intents are the permissions we're giving our bot to access a particular set of data from the server where the bot is invited to 
// Guilds are the specific permissions given to the BOT like messaging in the server(GuildMessages), adding reaction to messages(GuildMessageReact) etc.
// We have to saperately give acess to messages to aur bot's application from the discords developer portal.

// client.on("messageCreate", (message) => {
//     console.log(message.content)
// })

// clientn.on takes an argument after which it has to perform an action lik in this case the argument is "messagecreate", so in this whenever
// a new message instance is created the message is passed in the arrow function as a string called message after which it is console logged 
// In console log only message.content is printed but to see the other values which are available we can just print message to get the full value of what the message variable is carrying. 

client.on("messageCreate", (message) => {
    if(message.author.bot) return;
         if (message.mentions.has(client.user)) {
            let msg = message.content;
            let arr = msg.split(" ");
            // console.log(arr);
            arr.shift();
            // console.log(arr);
            question = arrayToSentence(arr);
            (async () => {
                const result = await run(question);
                // console.log(result);
                message.reply({
                    content: result,
                })
            })();
        }
   });

   function arrayToSentence(array) {
    // Create an empty string to store the sentence.
    let sentence = "";
  
    // Iterate over the array and add each word to the sentence,
    // with a space in between.
    for (let i = 0; i < array.length; i++) {
      sentence += array[i] + " ";
    }
  
    // Return the sentence.
    return sentence;
  }
  

  async function run(question) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt = question;
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  }
  


    // async execute(interaction) {
    //     await interaction.reply('Pong!')
    // }




client.login(process.env.TOKEN)
// After telling discord to make a client above we have to login to that client with our discord bot secret access token 
// This token helps discord to identify which bot or application we're trying to connect to




