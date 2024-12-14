import * as ExtensionMeta from '../ExtensionMeta/ExtensionMeta.ts'
import * as ExtensionHostCommandType from '../ExtensionHostCommandType/ExtensionHostCommandType.ts'
import * as ExtensionHostShared from './ExtensionHostShared.ts'

const getCommandsFromExtension = (extension) => {
  if (!extension || !extension.commands) {
    return []
  }
  return extension.commands
}

const getCommandsFromExtensions = (extensions) => {
  return extensions.flatMap(getCommandsFromExtension)
}

export const getCommands = async () => {
  const extensions = await ExtensionMeta.getExtensions()
  const commands = getCommandsFromExtensions(extensions)
  return commands
}

// TODO add test for this
// TODO add test for when this errors

export const executeCommand = (id, ...args) => {
  return ExtensionHostShared.executeProvider({
    event: `onCommand:${id}`,
    method: ExtensionHostCommandType.CommandExecute,
    params: [id, ...args],
    noProviderFoundMessage: 'No command provider found',
  })
}
