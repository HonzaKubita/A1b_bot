from bot import Bot

bot = Bot()

@bot.client.event
async def on_ready():
  print(f'✅ Bot logged in as {bot.client.user}')

@bot.client.event
async def on_message(message):
  if message.author == bot.client.user:
    return

  if message.content.startswith(bot.settings["prefix"]):

    message_command = message.content.split(" ")[0][1:] # remove prefix and extract command

    for command in bot.commands.keys(): # loop through loaded commands
      if message_command == command:
        await bot.commands[command].run(bot, message)

bot.client.run(bot.TOKEN)