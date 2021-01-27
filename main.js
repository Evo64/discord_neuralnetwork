const Discord = require('discord.js')
const ml5 = require('ml5');
const fs = require('fs');
const cfg = require('./cfg.json');
const data = require('./data.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const nn = ml5.neuralNetwork({task: 'classification', debug: true});

for (item in data) {
  let inputs = {
    text: item.text;
  }

  let outputs = {
    output: item.output;
  }

  nn.addData(inputs, outputs);
}
nn.normalizeData()
nn.train({epochs: 32, batchSize: 3}, finishedTraining)

function finishedTraining() {
  console.log("Finished training!");c
}

fs.readdir('./cmd/', (err, folders) => {
  folders.forEach(folder => {
    console.log(`[Loading ${folder}...]`);
    fs.readdir(`./cmd/${folder}/`, (err, files) => {
      let commands = files.filter(f => f.endsWith('.js'));
      commands.forEach(command => {
        console.log(`[Loading ${command}...]`);

        let props = require(`./cmd/${folder}/${command}`);
        client.commands.set(command.replace('.js', ''), props);
      });
    });
  });
});

Login()

client.on('ready', () => {
  console.log('Ready!');
});

client.on('message', (message) => {
  if (message.author.bot) return;
  let prefix = cfg.prefix;
  if (message.content.startsWith(prefix)) {
    let command = message.content.substr(prefix.length).split(' ')[0];
    let arg = message.content.split(' ').slice(1);

    let cmd = client.commands.get(command);
    if (cmd) {
      cmd.run(client, message, arg, nn);
    }
  }
});

function Login() {
  let token = cfg.token;
  client.login(token);
}
