const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const prettyms = require('pretty-ms')
const ms = require('ms')
const prefix = config.prefix;

client.on('ready', () => {
  console.log('Online')
})
client.on('message', async message => {
  const args = message.content.split(" ").splice(1)
     if(message.content.toLowerCase().startsWith(prefix + 'gcreate')){
  if(!message.member.hasPermission('ADMINISTRATOR')) return;
  const prize = message.content.split(" ").splice(3).join(" ")
  if(!args[0]) return message.channel.send(`${prefix}gcreate <time> <winners> <prize>`)
  if(!args[1]) return message.channel.send(`${prefix}gcreate <time> <winners> <prize>`)
  if(/[^0-9]/.test(args[1])) return message.channel.send('Winner Count cannot contain letters or symbols')
  if(!prize) return message.channel.send(`${prefix}gcreate <time> <winners> <prize>`)

 
const giveaway = new Discord.MessageEmbed()
.setTitle(prize)
.setDescription(`React with 🎉 to enter!\nWill end in ${prettyms(ms(args[0]), {verbose: true})}\nHosted by <@${message.author.id}>`)
.setFooter(`${args[1]} winners | Started at`)
.setTimestamp()
const thing = await message.channel.send(`🎉 **GIVEAWAY** 🎉`, giveaway)
thing.react('🎉')
setTimeout(() => {
const users = []
for(i=0; i < args[1]; i++){
const user = thing.reactions.cache.get('🎉').users.cache.filter(c => !c.bot).random()
if(user === undefined) continue;
if(users.includes(user.id)) continue;
users.push(`<@${user.id}>`)
}
 if(users.length === 0){
  const giveawayend = new Discord.MessageEmbed()
.setTitle(prize)
.setDescription(`No-one entered.\nHosted by <@${message.author.id}>`)
.setFooter(`${args[1]} winner(s) | Started at`)
.setTimestamp()
thing.reactions.removeAll()
return thing.edit(`🎉 **GIVEAWAY ENDED** 🎉`, giveawayend)
} else {
const giveawayend = new Discord.MessageEmbed()
.setTitle(prize)
.setDescription(`<@${users.join("> and <@")}> won!\nHosted by <@${message.author.id}>`)
.setFooter(`${args[1]} winner(s) | Started at`)
.setTimestamp()
thing.edit(`🎉 **GIVEAWAY ENDED** 🎉`, giveawayend)
message.channel.send(`Congratulations ${users.join(", ")}, you have won ${prize}`)
thing.reactions.removeAll()
}
  
}, ms(args[0]))


}else if(message.content.toLowerCase().startsWith(prefix + "greroll")){
  if(!message.member.hasPermission('ADMINISTRATOR')) return;
if(!args[0]) return message.channel.send(`${prefix}greroll <giveaway_message_id>`)
const thing = client.channels.cache.get(message.channel.id).messages.fetch(args[0])
const winners = givedb.get(`${thing.id}-winners`)
const prize = givedb.get(`${thing.id}-prize`)
const users = []
for(i=0; i < winners; i++){
  const user = thing.reactions.cache.get('🎉').users.cache.filter(c => !c.bot).random()
  if(user === undefined) continue;
  if(users.includes(user.id)) continue;
  users.push(user.id)
  }
  if(users.length === 0){
    return message.channel.send('Cannot choose a winner as no-one entered the giveaway')
  } else {
  message.channel.send(`Congrats <@${users.join('>, <@')}, you have won ${prize}`)
  }
}
})

client.login(config.token)
