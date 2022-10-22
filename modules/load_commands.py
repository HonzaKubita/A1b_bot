from os import listdir
from os.path import isfile, join

def load_commands():
  subDirPath = "commands"
  fileList =  [f'{subDirPath}.{f}'.replace(".py", "") for f in listdir(subDirPath) if isfile(join(subDirPath, f))]

  commandsList = {}

  for commandFile in fileList:
    commandModule = __import__(commandFile, fromlist=['*'])
    # somehow put it in dictionary
    commandsList[commandModule.__name__.replace('commands.', "")] = commandModule

  return commandsList