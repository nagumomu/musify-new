import { Message, MessageEmbed } from "discord.js";
import { bot } from "../index";
import { i18n } from "../utils/i18n";

export default {
  name: "evaluate",
  aliases: ["eval"],
  description: "Evaluate a code (owner-only)",
  execute(message: Message) {
    (async () => {
    const owners = ["778137404770091020"]
    if (owners.includes(message.author.id)) {
      var result = message.content.split(" ").splice(1).join(" ")
      try {
        var evaled = await eval(result)

        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);

        const evalEmbed = new MessageEmbed()
          .setColor('GREEN')
          .setTitle("SUCCESS!")
          .addFields(
            { name: '**Input:**', value: `\`\`\`js\n${message.content.split(" ").splice(1).join(' ')}\`\`\``, inline: false },
            { name: '**Output:**', value: `\`\`\`js\n${clean(evaled)}\`\`\``, inline: false }
          )
        message.channel.send({ embeds: [evalEmbed] }).catch(e => console.log(e))
      } catch (e) {
        message.channel.send({
          embeds: [new MessageEmbed().setTitle("ERROR").addFields(
            { name: '**Input:**', value: `\`\`\`js\n${message.content.split(" ").splice(1).join(' ')}\`\`\``, inline: false },
            { name: '**Output:**', value: `\`\`\`js\n${clean(e)}\`\`\``, inline: false }
          ).setColor("RED")]
        }).catch(e => console.log(e))
      }

      function clean(text: any) {
        if (typeof (text) === 'string')
          return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
        else
          return text;
      }
    }
    })();
  }
};
