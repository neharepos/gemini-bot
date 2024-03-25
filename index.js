const { Client, GatewayIntentBits, SlashCommandBuilder} = require("discord.js")
const { GoogleGenerativeAI } = require("@google/generative-ai")
const dotenv = require('dotenv');
dotenv.config();


const genAI = new GoogleGenerativeAI(process.env.API_KEY);


const client = new Client({
    intents:[
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent 
    ]
})


client.on("messageCreate", (message) => {
    if(message.author.bot) return;
    else if(message.mentions.has(client.user)){
        // let msg = message.content
        const arr = message.content.split(" ")
        arr.shift()
        ques = joiner(arr);
        (async () => {
            // const result = await gemini(ques);
            message.reply({
                content: await gemini(ques),
            })
        })();
    }
    
});


const joiner = (words) => {
    let sentence = ""
    for(let i =0; i<words.length; i++){
        sentence += words[i]
        if (i < words.length -1){
            sentence += " "
        }
    }
    return sentence
}


const  gemini = async(ques) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const prompt = ques + "? reply to the question in as less words as possible like 100 words or less"
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
}


client.login(process.env.TOKEN)



