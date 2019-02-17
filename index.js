const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");


const bot = new Discord.Client({ disableEveryone: true });
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);

    let command_collection = files.filter(selected => selected.split(".").pop() === "js");

    if (command_collection.length <= 0) {
        console.log("Error 404!\nFile not found!");
        return;
    }
    command_collection.forEach((file) => {
        let prop = require(`./commands/${file}`);
        console.log(`${file} loaded!`);
        bot.commands.set(prop.help.name, prop);
    });
})

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("Type c.help");
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type == "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (cmd === `${prefix}update`) {
         let bicon = bot.user.displayAvatarURL;
         let botembed = new Discord.RichEmbed()
             .setDescription("New Updates will be coming soon!")
             .setColor("#FF1493")
             .setThumbnail(bicon)
             .addField("We are making moderator commands soon and some cat anime picture commands", bot.user.username)
             .addField("Bot created on", bot.user.createdAt);

         return message.channel.send(botembed);

    }

    if (cmd === `${prefix}contact`) {
        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
            .setDescription("Contact us")
            .setColor("#FF1493")
            .setThumbnail(bicon)
            .addField("You need help? Email of CatMe bot developer team: cmbot.devteam@gmail.com if you need any help send a mail for this email or contact the bot owner/developer Lorika#5048");
        return message.channel.send(botembed);
    }

    if (cmd === `${prefix}help`) {
        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
            .setDescription("The Following commands are available for your use")
            .setColor("#FF1493")
            .setThumbnail(bicon)
            .addField("»Commands")
            .addField("c.contact - contact the CatMe bot developer team")
            .addField("c.update - what updates are coming")
            .addField("c.devs - Developer names and Developers recruiting")
            .addField("c.about - About all (the plan why we did this bot...)")
            .addField("c.doggo - a dog picture")
            .addField("»Prefix - c.");
        return message.channel.send(botembed);

    }

    if (cmd === `${prefix}devs`) {
        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
            .setDescription("Developer names and developer recruiting")
            .setColor("#FF1493")
            .setThumbnail(bicon)
            .addField("»Developer names: DrBread")
            .addField("»Developer recruiting: Send an mail into this email: cmbot.devteam@gmail.com (Talk about you and tell your age and real name thanks.)")

        return message.channel.send(botembed);

    }

    if (cmd === `${prefix}about`) {
        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
            .setDescription("Developer names and developer recruiting")
            .setColor("#FF1493")
            .setThumbnail(bicon)
            .addField("How this is started? - When i see some bots are was cool and I'm said I'm wanna create one bot! and i started searching some videos to how to do that and its so hard but i created one!");
        return message.channel.send(botembed);
    }
    let command = bot.commands.get(cmd.slice(prefix.length));
	if (command) command.run(bot, message, args);
});
bot.login(botconfig.token);
