// Import statements
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './schemas';  // Make sure this path matches the actual location of your schemas


// Configuration definition
export default defineConfig({
  name: 'default',  // Or 'sanity-nextjs-site' if you prefer something more descriptive
  title: 'Sanity Next.js MadDevSite',  // Descriptive and specific to your project
  projectId: 'rep8os56',  // Replace with your actual project ID
  dataset: 'production',
  basePath: '/studio',  // The base path where your studio will be accessed
  plugins: [deskTool()],  // Only using the desk tool here
  schema: {
    types: schemaTypes,  // Reference to your schema definitions
  },
});

