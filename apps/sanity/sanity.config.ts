import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

import {codeInput} from '@sanity/code-input'
import {cloudinaryImageSource, cloudinarySchemaPlugin} from 'sanity-plugin-cloudinary'

export default defineConfig({
  name: 'default',
  title: 'oldlace-penguin',

  projectId: 'ymomkzct',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), cloudinarySchemaPlugin(), codeInput()],

  form: {
    image: {
      assetSources: (previousAssetSources, context) => {
        // @ts-ignore
        if (context.currentUser?.roles.includes('cloudinaryAccess')) {
          // appends cloudinary as an asset source
          return [...previousAssetSources, cloudinaryImageSource]
        }

        // @ts-ignore
        if (context.currentUser?.roles.includes('onlyCloudinaryAccess')) {
          return [cloudinaryImageSource]
        }
        // dont add cloudnary as an asset sources
        return previousAssetSources
      },
    },
  },

  schema: {
    types: schemaTypes,
  },
})
