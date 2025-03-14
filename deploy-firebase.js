#!/usr/bin/env node

import { execSync } from 'child_process';
import * as readline from 'readline';
import * as fs from 'fs';
import * as path from 'path';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

console.log('\n===== Firebase Deployment Script =====\n');
console.log('Starting Firebase deployment process...');

const getCurrentProjectId = () => {
  try {
    if (fs.existsSync('.firebaserc')) {
      const firebaserc = JSON.parse(fs.readFileSync('.firebaserc', 'utf8'));
      return firebaserc.projects.default;
    }
  } catch (error) {
    console.error('Error reading .firebaserc:', error);
  }
  return '';
};

const promptForProjectId = async () => {
  const currentId = getCurrentProjectId();
  
  console.log('\n⚠️ Choose a Firebase project ID to continue.');
  if (currentId) {
    console.log(`Current project ID is: ${currentId}`);
    const useExisting = await askQuestion('Do you want to use this project ID? (y/n): ');
    if (useExisting.toLowerCase() === 'y') {
      return currentId.trim();
    }
  }
  
  console.log('To create a new Firebase project, visit: https://console.firebase.google.com/');
  
  const projectId = await askQuestion('Please enter your Firebase project ID: ');
  
  if (!projectId || projectId.trim() === '') {
    console.log('❌ Project ID cannot be empty. Please try again.');
    return promptForProjectId();
  }
  
  return projectId.trim();
};

const forceRelogin = async () => {
  console.log('Logging out from Firebase to reset credentials...');
  try {
    execSync('npx firebase-tools logout', { stdio: 'inherit' });
    console.log('✅ Successfully logged out from Firebase.');
    
    console.log('Please log in with the Google account that has access to your project:');
    execSync('npx firebase-tools login', { stdio: 'inherit' });
    console.log('✅ Successfully logged in to Firebase.');
    return true;
  } catch (error) {
    console.error('❌ Error during Firebase re-login:', error);
    return false;
  }
};

const initializeFirebaseApp = async (projectId) => {
  console.log('\n🔧 Checking if Firebase web app exists...');
  
  try {
    const appsOutput = execSync(`npx firebase-tools apps:list --project=${projectId}`, { encoding: 'utf8' });
    
    if (appsOutput.includes('No apps found')) {
      console.log('No web app found. Creating a new Firebase web app...');
      
      const appName = await askQuestion('Enter a name for your web app (default: Web App): ') || 'Web App';
      
      try {
        execSync(`npx firebase-tools apps:create web "${appName}" --project=${projectId}`, { stdio: 'inherit' });
        console.log('✅ Firebase web app created successfully!');
        return true;
      } catch (error) {
        console.error('❌ Failed to create Firebase web app:', error);
        return false;
      }
    } else {
      console.log('✅ Firebase web app already exists.');
      return true;
    }
  } catch (error) {
    console.error('⚠️ Could not check for existing apps:', error);
    
    console.log('Attempting to create a new Firebase web app...');
    const appName = await askQuestion('Enter a name for your web app (default: Web App): ') || 'Web App';
    
    try {
      execSync(`npx firebase-tools apps:create web "${appName}" --project=${projectId}`, { stdio: 'inherit' });
      console.log('✅ Firebase web app created successfully!');
      return true;
    } catch (createError) {
      console.error('❌ Failed to create Firebase web app:', createError);
      return false;
    }
  }
};

if (!fs.existsSync('firebase.json')) {
  console.log('Creating firebase.json configuration file...');
  const firebaseConfig = {
    "hosting": {
      "public": "dist",
      "ignore": [
        "firebase.json",
        "**/.*",
        "**/node_modules/**"
      ],
      "rewrites": [
        {
          "source": "**",
          "destination": "/index.html"
        }
      ]
    }
  };
  fs.writeFileSync('firebase.json', JSON.stringify(firebaseConfig, null, 2));
  console.log('✅ firebase.json created successfully.');
}

const deploy = async () => {
  try {
    const reloginResult = await forceRelogin();
    if (!reloginResult) {
      console.log('⚠️ Continuing without re-login. If you encounter permission issues, run this script again.');
    }
    
    const projectId = await promptForProjectId();
    
    console.log('Updating .firebaserc file with project ID...');
    const firebaserc = {
      "projects": {
        "default": projectId
      }
    };
    fs.writeFileSync('.firebaserc', JSON.stringify(firebaserc, null, 2));
    console.log('✅ .firebaserc updated successfully with project ID:', projectId);

    const appInitialized = await initializeFirebaseApp(projectId);
    if (!appInitialized) {
      console.log('⚠️ Could not initialize Firebase web app. You may need to do this manually in the Firebase console.');
      const continueDeploy = await askQuestion('Continue with deployment anyway? (y/n): ');
      if (continueDeploy.toLowerCase() !== 'y') {
        console.log('Deployment cancelled.');
        process.exit(0);
      }
    }

    if (!fs.existsSync('node_modules')) {
      console.log('⚠️ node_modules not found. Installing dependencies...');
      try {
        execSync('npm install', { stdio: 'inherit' });
        console.log('✅ Dependencies installed successfully.');
      } catch (error) {
        console.error('❌ Failed to install dependencies:', error);
        process.exit(1);
      }
    }

    console.log('\n🔧 Building the application...');
    try {
      execSync('npm run build', { stdio: 'inherit' });
      console.log('✅ Build completed successfully.');
    } catch (error) {
      console.error('❌ Build failed:', error);
      process.exit(1);
    }

    console.log('\n🚀 Deploying to Firebase...');
    try {
      execSync(`npx firebase-tools deploy --project=${projectId}`, { stdio: 'inherit' });
      console.log('\n✅ Deployment completed successfully!');
      console.log(`🌎 Your website is now live at: https://${projectId}.web.app`);
    } catch (error) {
      console.error('❌ Deployment failed:', error);
      console.log('\nTry running the Firebase CLI directly:');
      console.log(`npx firebase-tools deploy --project=${projectId}`);
      process.exit(1);
    }
  } finally {
    rl.close();
  }
};

deploy();
