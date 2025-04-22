import { defineConfig } from "cypress";
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export default defineConfig({
  projectId: '6x8p9z',
  e2e: {
    baseUrl: 'http://localhost:5173', // Vite's default dev server URL
    setupNodeEvents(on, config) {
      // implement node event listeners here

      // Add environment variables from .env file to Cypress config
      config.env = config.env || {};
      config.env.SUPABASE_URL = process.env.VITE_SUPABASE_URL;
      config.env.SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

      return config;
    },
    // Disable Web Security to allow Cypress to manipulate localStorage for auth
    chromeWebSecurity: false,
    // Configure default viewport size
    viewportWidth: 1280,
    viewportHeight: 800,
    // Configure default command timeout (10s)
    defaultCommandTimeout: 10000,
    // Configure wait time for page load
    pageLoadTimeout: 90000,
  },
  // Configure test videos
  video: false,
  // Configure screenshots
  screenshotOnRunFailure: true,
  // Path where screenshots and videos will be saved
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
});
