
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

const promptForProjectId = async (currentId = '') => {
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
    return promptForProjectId(currentId);
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
    
    // Always prompt for project ID to make it easier to switch
    projectId = await promptForProjectId(projectId);
    
    console.log('Updating .firebaserc file with project ID...');
    const firebaserc = {
      "projects": {
        "default": projectId
      }
    };
    fs.writeFileSync('.firebaserc', JSON.stringify(firebaserc, null, 2));
    console.log('✅ .firebaserc updated successfully with project ID:', projectId);

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
    let deploymentSuccess = false;
    try {
      execSync(`npx firebase-tools deploy --project=${projectId}`, { stdio: 'inherit' });
      deploymentSuccess = true;
    } catch (error) {
      const errorMsg = error.toString();
      console.error('❌ Deployment failed:', error);
      
      if (errorMsg.includes('Failed to get Firebase project') || 
          errorMsg.includes('permission') || 
          errorMsg.includes('not authorized')) {
        
        console.log('\n⚠️ Permission error detected. This might be because:');
        console.log('1. You\'re not logged in with the correct Google account that owns this project');
        console.log('2. The project ID doesn\'t exist or is incorrect');
        console.log('3. Your account doesn\'t have permission to access this project');
        
        const tryRelogin = await askQuestion('\nWould you like to try logging out and logging in again with a different account? (y/n): ');
        
        if (tryRelogin.toLowerCase() === 'y') {
          const reloginSuccess = await forceRelogin();
          
          if (reloginSuccess) {
            const retryDeploy = await askQuestion('Would you like to try deploying again? (y/n): ');
            
            if (retryDeploy.toLowerCase() === 'y') {
              try {
                console.log('Attempting to deploy again...');
                execSync(`npx firebase-tools deploy --project=${projectId}`, { stdio: 'inherit' });
                deploymentSuccess = true;
              } catch (retryError) {
                console.error('❌ Deployment failed again:', retryError);
              }
            }
          }
        }
        
        if (!deploymentSuccess) {
          console.log('\nTroubleshooting steps:');
          console.log('1. Verify the project ID is correct. Your current project ID is:', projectId);
          console.log('2. Go to Firebase console and confirm the project exists: https://console.firebase.google.com/');
          console.log('3. Make sure you\'re logged in with the correct Google account that has access to this project');
          console.log('4. If needed, create a new project in the Firebase console and use that project ID instead');
        }
      } else {
        console.log('\nGeneral troubleshooting tips:');
        console.log('1. Verify your internet connection');
        console.log('2. Try running "npx firebase-tools deploy --project=your-project-id" directly');
        console.log('3. Check Firebase status page for any outages: https://status.firebase.google.com/');
      }
    }
    
    if (deploymentSuccess) {
      console.log('\n✅ Deployment completed successfully!');
      console.log(`🌎 Your website is now live at: https://${projectId}.web.app`);
    }
  } finally {
    rl.close();
  }
};

deploy();
