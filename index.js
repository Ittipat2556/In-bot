const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const express = require("express");

const app = express();

// 🌐 กันหลับ
app.get("/", (req, res) => {
  res.send("IN-OUT BOT is running");
});

app.get("/health", (req, res) => {
  res.send("OK");
});

app.listen(3000, () => {
  console.log("🌐 Web server ready");
});

// 🤖 บอท
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

client.once("ready", () => {
  console.log("✅ IN-OUT BOT online!");
});

// 🎉 คนเข้า
client.on("guildMemberAdd", (member) => {
  const channel = member.guild.channels.cache.get("1495288430219759687");

  if (!channel) return;

  const embed = new EmbedBuilder()
    .setTitle("🎉 Welcome!")
    .setDescription(`ยินดีต้อนรับ ${member} เข้าสู่เซิร์ฟเวอร์`)
    .addFields(
      { name: "👤 User", value: member.user.tag, inline: true },
      { name: "👥 Members", value: `${member.guild.memberCount}`, inline: true }
    )
    .setThumbnail(member.user.displayAvatarURL())
    .setColor("Green")
    .setTimestamp();

  channel.send({ embeds: [embed] });
});

// 🔐 TOKEN จาก Render
client.login(process.env.TOKEN);