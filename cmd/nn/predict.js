const Discord = require('discord.js');

module.exports.run = async(client, message, arg, nn) => {
  let input = {
    text: message.content;
  }
  nn.classify(input, handleResults)
}

function handleResults(error, result) {
  if (error) {
    return console.log(error);
  }
  console.log(results)
}
