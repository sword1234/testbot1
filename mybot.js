const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
 
client.on("ready", () => {
  console.log("I am ready!");
});
const prefix = "sf!";
client.on("message", (message) => {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  
    if (message.content.startsWith(config.prefix + "ping")) {
      message.channel.send("pong!");
    } else
    if (message.content.startsWith(config.prefix + "test")) {
      message.channel.send({embed: { 
        color: 16777215, description:'Test', 
        image:  {
            url: "https://media.giphy.com/media/UAJpANY0bGPhS/giphy.gif"
        }
    }});
    }
    if (message.content.startsWith(config.prefix + "kick")) {
      if (!message.member.hasPermission("KICK_MEMBERS")){
        message.channel.send("you do not have permission to use this command");
        return;
      }
      let member = message.mentions.members.first();
      member.kick();
      let reason = args.slice(1).join(" ");
      
      message.channel.send({embed: { 
        color: 16777215, description:'The user has been kicked', 
        image:  {
            url: "https://media.giphy.com/media/2uxVmiuizw7UAOnP6L/giphy.gif"
        }
    }});
      
    }
    if (message.content.startsWith(config.prefix + "ban")) {
      if (!message.member.hasPermission("BAN_MEMBERS")){
        message.channel.send("you do not have permission to use this command");
        return;
      }
      let member = message.mentions.members.first();
      if(!member)
        return message.reply("Please mention a valid member of this server");
      if(!member.bannable) 
        return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

      let reason = args.slice(1).join(' ');
      if(!reason) reason = "No reason provided";
      member.ban();
      message.channel.send({embed: { 
        color: 16777215, description:'The user has been banned', 
        image:  {
            url: "https://media.giphy.com/media/uC9e2ojJn1ZXW/giphy.gif"
        }
    }});
    }  
   
    if(message.content.startsWith(config.prefix + "say")){
      let text = args.join(" ");
      message.delete();
      message.channel.send(text);
    }
    if(message.content.startsWith(config.prefix + "help")){
      const exampleEmbed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle('Commands')
        .setThumbnail('https://i.imgur.com/wSTFkRM.png')
        
        .addBlankField()
        .addField('kick', 'kicks a user', true)
        .addField('mute', 'mutes a user for 10 minutes(must have a role with the name [Muted])', true)
        .addField('say', 'makes the bot say something', true)
        
        

      message.channel.send(exampleEmbed);
    }
    if(message.content.startsWith(config.prefix + "mute")){
      if (!message.member.hasPermission("KICK_MEMBERS")){
        message.channel.send("you do not have permission to use this command");
        return;
      }
      let mute_role = message.guild.roles.find(role => role.name === "Muted");
      let member = message.mentions.members.first();
      member.addRole(mute_role); // <- this assign the role
      setTimeout(() => {member.removeRole(mute_role);}, 600 * 1000)
      message.channel.send({embed: { 
        color: 16777215, description:'The user has been muted for 10 minutes', 
        image:  {
            url: "https://media.giphy.com/media/UAJpANY0bGPhS/giphy.gif"
        }
    }});
      //message.channel.send(`${member} has been muted for 10 minutes.`);
    

    }
    if(message.content.startsWith(config.prefix + "purge")){
      if (!message.member.hasPermission("MANAGE_MESSAGES")){
        message.channel.send("you do not have permission to use this command");
        return;
      }
      const user = message.mentions.users.first();
      // Parse Amount
      const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
      if (!amount) return message.reply('Must specify an amount to delete!');
      if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
      // Fetch 100 messages (will be filtered and lowered up to max amount requested)
      message.channel.fetchMessages({
      limit: 100,
      }).then((messages) => {
      if (user) {
      const filterBy = user ? user.id : Client.user.id;
      messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
      }
      message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
        });


    }
    if (message.content.startsWith (prefix + "spongebob")) {
      number = 4;
      imageNumber = Math.floor (Math.random() * number) + 1;
      
      message.channel.send ({files: ["./images/" + imageNumber + ".png"]})
      
    }
  });
 
client.login(config.token);