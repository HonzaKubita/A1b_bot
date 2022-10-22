from discord import Embed
async def run(bot, message):
  embed = Embed(title="Help", description="list of all commands:", color=0x5cdce6)
  for command in bot.commands:
    embed.add_field(name=f'**{command}**', value=".", inline=False)
  await message.channel.send(embed=embed)