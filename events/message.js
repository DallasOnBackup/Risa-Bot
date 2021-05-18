module.exports = (client, message, prefix) => {
  if (message.author.bot)
    return;
  if (message.guild === null)
    return;
  if (message.content.indexOf(client.config.prefix) !== 0) 
    return;
  const args = message.content.slice(5).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command);
  if (!cmd)
    return;
  cmd.run(client, message, args);
};