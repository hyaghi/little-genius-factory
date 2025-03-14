
#!/usr/bin/env node

const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n===== Firebase Deployment Script =====\n');
console.log('Starting Firebase deployment process...');

// Check if firebase.json exists, if not create it
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

// Check if .firebaserc exists, if not create it with the correct project ID
let projectId = '1-998159886681';
if (fs.existsSync('.firebaserc')) {
  try {
    const firebaserc = JSON.parse(fs.readFileSync('.firebaserc', 'utf8'));
    projectId = firebaserc.projects.default;
    console.log(`Using project ID from .firebaserc: ${projectId}`);
  } catch (error) {
    console.error('⚠️ Error reading .firebaserc:', error);
  }
} else {
  console.log('Creating .firebaserc file...');
  const firebaserc = {
    "projects": {
      "default": projectId
    }
  };
  fs.writeFileSync('.firebaserc', JSON.stringify(firebaserc, null, 2));
  console.log('✅ .firebaserc created successfully with project ID:', projectId);
}

// Check if node_modules exists
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

// Build the application
console.log('\n🔧 Building the application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully.');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}

// Check if user is logged in to Firebase
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

// Deploy to Firebase
console.log('\n🚀 Deploying to Firebase...');
try {
  execSync('npx firebase-tools deploy', { stdio: 'inherit' });
  console.log('\n✅ Deployment completed successfully!');
  console.log(`🌎 Your website is now live at: https://${projectId}.web.app`);
} catch (error) {
  console.error('❌ Deployment failed:', error);
  console.log('\nTroubleshooting tips:');
  console.log('1. Make sure you have proper permissions for this project');
  console.log('2. Verify your internet connection');
  console.log('3. Try running "npx firebase-tools deploy" directly to see detailed errors');
  process.exit(1);
}

rl.close();
