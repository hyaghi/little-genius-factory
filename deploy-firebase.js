
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

const promptForProjectId = async () => {
  console.log('\n⚠️ No valid Firebase project ID found or access denied to current project ID.');
  console.log('You need to provide a valid Firebase project ID to continue.');
  console.log('To create a new Firebase project, visit: https://console.firebase.google.com/');
  
  const projectId = await askQuestion('Please enter your Firebase project ID: ');
  
  if (!projectId || projectId.trim() === '') {
    console.log('❌ Project ID cannot be empty. Please try again.');
    return promptForProjectId();
  }
  
  return projectId.trim();
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
    let projectId = '';
    
    if (fs.existsSync('.firebaserc')) {
      try {
        const firebaserc = JSON.parse(fs.readFileSync('.firebaserc', 'utf8'));
        projectId = firebaserc.projects.default;
        console.log(`Using project ID from .firebaserc: ${projectId}`);
      } catch (error) {
        console.error('⚠️ Error reading .firebaserc:', error);
      }
    }
    
    console.log('\n🔑 Checking Firebase login status...');
    try {
      const loginOutput = execSync('npx firebase-tools login:list', { encoding: 'utf8' });
      if (loginOutput.includes('No authorized accounts')) {
        console.log('You need to log in to Firebase. Starting login process...');
        try {
          execSync('npx firebase-tools login', { stdio: 'inherit' });
        } catch (loginError) {
          console.error('❌ Firebase login failed:', loginError);
          process.exit(1);
        }
      } else {
        console.log('✅ Already logged in to Firebase.');
      }
    } catch (error) {
      console.log('⚠️ Could not check login status. Attempting to log in...');
      try {
        execSync('npx firebase-tools login', { stdio: 'inherit' });
      } catch (loginError) {
        console.error('❌ Firebase login failed:', loginError);
        process.exit(1);
      }
    }
    
    // Verify project exists and user has access before proceeding
    let isValidProject = false;
    
    if (projectId) {
      try {
        console.log(`Verifying access to project ${projectId}...`);
        execSync(`npx firebase-tools projects:list`, { stdio: 'pipe' });
        // Try to get project info specifically
        execSync(`npx firebase-tools projects:describe ${projectId}`, { stdio: 'pipe' });
        isValidProject = true;
        console.log(`✅ Project ${projectId} verified.`);
      } catch (error) {
        console.log(`⚠️ Could not access project ${projectId}. You might need to use a different project ID.`);
        isValidProject = false;
      }
    }
    
    if (!isValidProject) {
      projectId = await promptForProjectId();
      
      console.log('Updating .firebaserc file with new project ID...');
      const firebaserc = {
        "projects": {
          "default": projectId
        }
      };
      fs.writeFileSync('.firebaserc', JSON.stringify(firebaserc, null, 2));
      console.log('✅ .firebaserc updated successfully with project ID:', projectId);
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
      console.log('\nTroubleshooting tips:');
      console.log('1. Make sure you have proper permissions for this project');
      console.log('2. Verify your internet connection');
      console.log('3. Try running "npx firebase-tools deploy --project=your-project-id" directly to see detailed errors');
      console.log('4. Visit the Firebase console to ensure your project is set up correctly: https://console.firebase.google.com/');
      process.exit(1);
    }
  } finally {
    rl.close();
  }
};

deploy();
