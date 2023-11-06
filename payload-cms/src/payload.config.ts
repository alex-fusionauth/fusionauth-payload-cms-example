import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { viteBundler } from '@payloadcms/bundler-vite'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

import Users from './collections/Users'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: viteBundler(),
    vite: (config) => {
      return {
        ...config,
        plugins:[
          // ...config.plugins,
          nodePolyfills()
        ]
      }
    }
  },
  editor: slateEditor({}),
  collections: [Users],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
})
