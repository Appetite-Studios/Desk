var inquirer = require("inquirer");

start();
var Discord = require("discord.js");
var dc = new Discord.Client();
var config = require("./config.json");
function execute() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Execute a Command",
        name: "executecmd",
        choices: [
          "Send a Message",
          "Set Status",
          "Fetch User",
          "Bot Data",
          "Quit",
        ],
      },
    ])
    .then((answers) => {
      if (answers.executecmd === "Quit") {
        process.exit();
      }
      if (answers.executecmd === "Send a Message") {
        sendMSG();
      }
      if (answers.executecmd === "Set Status") {
        setStatus();
      }
      if (answers.executecmd === "Fetch User") {
        playFetch();
      }
      if (answers.executecmd === "Bot Data") {
        botData();
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
        console.warn("Prompt Enviroment is not Rendered.");
      } else {
        // Something else when wrong
        console.warn("Something went wrong?!?!?");
      }
    });
}
function start() {
  console.clear();
  console.log("█▀▀▄ █▀▀ █▀▀ █░█");
  console.log("█░░█ █▀▀ ▀▀█ █▀▄");
  console.log("▀▀▀░ ▀▀▀ ▀▀▀ ▀░▀");
  console.log("-----------------------------");
  execute();
}
function botData() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Bot Data",
        name: "list",
        choices: ["Guilds", "Users"],
      },
    ])
    .then((answers) => {
      if (answers.list === "Users") {
        inquirer
          .prompt([
            {
              type: "list",
              message: " ",
              name: "userchoose",
              choices: ["Info", "Count"],
            },
          ])
          .then((answers) => {
            if (answers.userchoose === "Count") {
              dc.on("ready", () => {
                if (dc.users.size === 1) {
                  console.log(
                    `\n${dc.users.size} user is using ${dc.user.username}.`
                  );
                }
                if (dc.users.size > 1) {
                  console.log(
                    `\n${dc.users.size} users are using ${dc.user.username}.`
                  );
                }
              });
              dc.login(config.token);
              inquirer
                .prompt([
                  {
                    type: "list",
                    message: "Continue",
                    name: "confirm",
                    choices: ["Yes"],
                  },
                ])
                .then((answers) => {
                  start();
                });
            }
            if (answers.userchoose === "Info") {
              dc.on("ready", () => {
                console.log("\n-----------------------------");
                dc.users.forEach((guild) =>
                  console.log(`${guild.tag}:${guild.id}`)
                );
              });
              dc.login(config.token);
              inquirer
                .prompt([
                  {
                    type: "list",
                    message: "Continue",
                    name: "confirm",
                    choices: ["Yes"],
                  },
                ])
                .then((answers) => {
                  start();
                });
            }
          });
      }
      if (answers.list === "Guilds") {
        inquirer
          .prompt([
            {
              type: "list",
              message: " ",
              name: "guildchoose",
              choices: ["Info", "Count"],
            },
          ])
          .then((answers) => {
            if (answers.guildchoose === "Count") {
              dc.on("ready", () => {
                if (dc.guilds.size === 1) {
                  console.log(
                    `\n${dc.guilds.size} guild is using ${dc.user.username}.`
                  );
                }
                if (dc.guilds.size > 1) {
                  console.log(
                    `\n${dc.guilds.size} guilds are using ${dc.user.username}.`
                  );
                }
              });
              dc.login(config.token);
              inquirer
                .prompt([
                  {
                    type: "list",
                    message: "Continue",
                    name: "confirm",
                    choices: ["Yes"],
                  },
                ])
                .then((answers) => {
                  start();
                });
            }
            if (answers.guildchoose === "Info") {
              dc.on("ready", () => {
                console.log("\n-----------------------------");
                dc.guilds.forEach((guild) =>
                  console.log(`${guild.name}:${guild.id}`)
                );
              });
              dc.login(config.token);
              inquirer
                .prompt([
                  {
                    type: "list",
                    message: "Continue",
                    name: "confirm",
                    choices: ["Yes"],
                  },
                ])
                .then((answers) => {
                  start();
                });
            }
          });
      }
    });
}
function playFetch() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "User ID",
        name: "u_id",
      },
    ])
    .then((answers) => {
      dc.on("ready", () => {
        dc.fetchUser(answers.u_id).then((value) => {
          console.log("\n-----------------------------");
          console.log("Username: " + value.username);
          console.log("Discriminator: " + value.discriminator);
          console.log("ID: " + value.id);
          console.log("Bot: " + value.bot);
          console.log(
            "Status: " +
              JSON.stringify(value.presence.status)
                .replace('"', "")
                .replace('"', "") +
              " (Based on what the bot sees)"
          );
          inquirer
            .prompt([
              {
                type: "list",
                message: "Continue",
                name: "confirm",
                choices: ["Yes"],
              },
            ])
            .then((answers) => {
              start();
            });
        });
      });
      dc.login(config.token);
    });
}
function setStatus() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Content",
        name: "sc",
      },
    ])
    .then((answers) => {
      var content = answers.sc;
      inquirer
        .prompt([
          {
            type: "list",
            message: "Type",
            name: "st",
            choices: ["PLAYING", "LISTENING", "WATCHING"],
          },
        ])
        .then((answers) => {
          var type1 = answers.st;
          if (type1 === "PLAYING") {
            dc.on("ready", () => {
              dc.user.setActivity(content);
            });
            dc.login(config.token);
            return start();
          }
          if (type1 === "LISTENING") {
            dc.on("ready", () => {
              dc.user.setActivity(content, { type: "LISTENING" });
            });
            dc.login(config.token);
            return start();
          }
          if (type1 === "WATCHING") {
            dc.on("ready", () => {
              dc.user.setActivity(content, {
                type: "WATCHING",
              });
            });
            dc.login(config.token);
            return start();
          }
        });
    });
}
function sendMSG() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Choose Message Type",
        name: "msgtype",
        choices: ["Embed", "Message"],
      },
    ])
    .then((answers) => {
      const choosal = answers.msgtype;
      inquirer
        .prompt([
          {
            type: "list",
            message: "Choose Recipient",
            name: "msgrecipient",
            choices: ["Guild", "User"],
          },
        ])
        .then((answers) => {
          if (answers.msgrecipient === "Guild") {
            if (choosal === "Message") {
              inquirer
                .prompt([
                  {
                    type: "input",
                    message: "Message Content",
                    name: "cleanmsgc",
                  },
                ])
                .then((answers) => {
                  var content = answers.cleanmsgc;
                  inquirer
                    .prompt([
                      {
                        type: "input",
                        message: "Server ID",
                        name: "cleanmsgguild",
                      },
                    ])
                    .then((answers) => {
                      var guild = answers.cleanmsgguild;
                      inquirer
                        .prompt([
                          {
                            type: "input",
                            message: "Channel ID",
                            name: "cleanmsgchannel",
                          },
                        ])
                        .then((answers) => {
                          var channel = answers.cleanmsgchannel;
                          dc.on("ready", () => {
                            dc.guilds
                              .get(guild)
                              .channels.get(channel)
                              .send(content);
                            start();
                          });
                          dc.login(config.token);
                        });
                    });
                });
            }
            if (choosal === "Embed") {
              inquirer
                .prompt([
                  {
                    type: "input",
                    message: "Embed Title",
                    name: "embedtitle",
                  },
                ])
                .then((answers) => {
                  var title = answers.embedtitle;
                  inquirer
                    .prompt([
                      {
                        type: "input",
                        message: "Embed Description",
                        name: "embeddesc",
                      },
                    ])
                    .then((answers) => {
                      var desc = answers.embeddesc;
                      inquirer
                        .prompt([
                          {
                            type: "input",
                            message: "Color",
                            name: "embedcolor",
                          },
                        ])
                        .then((answers) => {
                          var color = answers.embedcolor;
                          inquirer
                            .prompt([
                              {
                                type: "input",
                                message: "Guild ID",
                                name: "serverid",
                              },
                            ])
                            .then((answers) => {
                              var serverid = answers.serverid;
                              inquirer
                                .prompt([
                                  {
                                    type: "input",
                                    message: "Channel ID",
                                    name: "channelid",
                                  },
                                ])
                                .then((answers) => {
                                  var channelid = answers.channelid;
                                  dc.on("ready", () => {
                                    var embed = new Discord.RichEmbed()
                                      .setTitle(title)
                                      .setDescription(desc)
                                      .setColor(color);
                                    dc.guilds
                                      .get(serverid)
                                      .channels.get(channelid)
                                      .send(embed);
                                    start();
                                  });
                                  dc.login(config.token);
                                });
                            });
                        });
                    });
                });
            }
          }
          if (answers.msgrecipient === "User") {
            inquirer
              .prompt([
                {
                  type: "input",
                  message: "User ID",
                  name: "userid",
                },
              ])
              .then((answers) => {
                const user = answers.userid;
                if (choosal === "Message") {
                  inquirer
                    .prompt([
                      {
                        type: "input",
                        message: "Message Content",
                        name: "cleanmsgc",
                      },
                    ])
                    .then((answers) => {
                      var content = answers.cleanmsgc;
                      dc.on("ready", () => {
                        dc.fetchUser(user).then((u) => {
                          u.send(content);
                          start();
                        });
                      });
                      dc.login(config.token);
                    });
                }
                if (choosal === "Embed") {
                  inquirer
                    .prompt([
                      {
                        type: "input",
                        message: "Embed Title",
                        name: "embedtitle",
                      },
                    ])
                    .then((answers) => {
                      var title = answers.embedtitle;
                      inquirer
                        .prompt([
                          {
                            type: "input",
                            message: "Embed Description",
                            name: "embeddesc",
                          },
                        ])
                        .then((answers) => {
                          var desc = answers.embeddesc;
                          inquirer
                            .prompt([
                              {
                                type: "input",
                                message: "Color",
                                name: "embedcolor",
                              },
                            ])
                            .then((answers) => {
                              var color = answers.embedcolor;

                              var channelid = answers.channelid;
                              dc.on("ready", () => {
                                var embed = new Discord.RichEmbed()
                                  .setTitle(title)
                                  .setDescription(desc)
                                  .setColor(color);
                                dc.fetchUser(user).then((u2) => {
                                  u2.send(embed);
                                });
                              });
                              dc.login(config.token);
                              start();
                            });
                        });
                    });
                }
              });
          }
        });
    });
}
