import express from 'express'
import { join } from 'path'

if (process.env.SERVE_APP) {
  const app = express()
  app.use(express.static(join(__dirname, '../../dist')))
  app.listen(process.env.PORT ?? 1234)
}

const pluginConfig: Cypress.PluginConfig = () => {
  // Nothing here for now
}

export default pluginConfig
