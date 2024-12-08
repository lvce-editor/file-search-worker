const uri = '../../test-integration-util/src/setup.js'

const module = await import(uri)

const { setup } = module

export { setup }
