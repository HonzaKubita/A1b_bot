# Libraries
import os
import discord
import json
from dotenv import load_dotenv
from modules.load_commands import load_commands

class Bot:
  def __init__(self):
    load_dotenv()
    self.TOKEN = os.getenv('DISCORD_TOKEN')

    # Commands
    self.commands = load_commands()

    # Settings
    with open('settings.json') as f:
      self.settings = json.load(f)

    self.intents = discord.Intents.all()
    self.intents.message_content = True
    self.client = discord.Client(intents=self.intents)
