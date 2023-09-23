const { Client, GatewayIntentBits } = require('discord.js');

const config = require('./config.js');
global.config = config;

const client = (global.client = new Client({
    fetchAllMembers: true,
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates,
    ]
}));

const fs = require('fs');
client.commands = new Map();
client.aliases = new Map();
client.categories = fs.readdirSync('./discord/botlist/commands/');
client.cooldowns = new Map();
client.slashCommands = new Map();

client.md = require('markdown-it')({
    html: true, // Enable HTML tags in source
    linkify: true, // autoconvert links
    typographer: true, // Enable some language-neutral replacement + quotes beautification
    xhtmlOut: true, // this is for discord
    breaks: true, // convert '\n' in paragraphs into <br>
    langPrefix: 'language-',
    quotes: '“”‘’', // “”‘’,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str, true).value;
            } catch (__) { }
        }
        return ''; // use external default escaping
    }
});

['eventHandler', 'commandHandler', 'slashHandler'].map(handler => {
    require(`./discord/botlist/handlers/${handler}`)(client);
});

const connectToDatabase = async () => {
    await require('./database/connect.js')(client);
};

const clientReady = new Promise(resolve => {
    client.on("ready", async () => {
        await require('./index.js')(client);
        await connectToDatabase();
        resolve();
    });
});

const startSClient = async () => {
    await clientReady;

    try {
        let voiceChannel = client.channels.cache.get(config.server.channels.voiceChannelStatistics);

        const data = await siteanalytics.find();
        const countryData = data[0] && data[0].country && data[0].country[0];
        const count = countryData ? Object.values(countryData).reduce((c, d) => c + d, 0) : 0;

        if (voiceChannel && count > 0) {
            voiceChannel.setName("Website Visitors: " + count.toLocaleString())
            setInterval(async () => {
                voiceChannel.setName("Website Visitors: " + count.toLocaleString())
            }, 1 * 60 * 60000); // 1 hour (Careful! API limits)
        }
    } catch (e) {
        console.log(e)
    }
};

startSClient();

client.login(global.config.client.token).catch(() => { console.error('Invalid token.'); });