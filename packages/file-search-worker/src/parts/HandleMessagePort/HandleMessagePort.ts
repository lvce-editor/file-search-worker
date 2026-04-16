import { PlainMessagePortRpc } from '@lvce-editor/rpc'
import * as CommandMap from '../CommandMap/CommandMap.ts'

export const handleMessagePort = async (port: MessagePort): Promise<void> => {
  await PlainMessagePortRpc.create({
    commandMap: CommandMap.commandMap,
    isMessagePortOpen: true,
    messagePort: port,
  })
}
