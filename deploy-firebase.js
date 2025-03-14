
const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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
  console.log('firebase.json created successfully.');
}

// Check if .firebaserc exists, if not create it with the correct project ID
let projectId = '1-998159886681';
if (fs.existsSync('.firebaserc')) {
  try {
    const firebaserc = JSON.parse(fs.readFileSync('.firebaserc', 'utf8'));
    projectId = firebaserc.projects.default;
  } catch (error) {
    console.error('Error reading .firebaserc:', error);
  }
} else {
  console.log('Creating .firebaserc file...');
  const firebaserc = {
    "projects": {
      "default": "1-998159886681"
    }
  };
  fs.writeFileSync('.firebaserc', JSON.stringify(firebaserc, null, 2));
  console.log('.firebaserc created successfully.');
}

// Build the application
console.log('Building the application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build completed successfully.');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}

// Check if user is logged in to Firebase
console.log('Checking Firebase login status...');
try {
  execSync('npx firebase-tools login:list', { stdio: 'inherit' });
} catch (error) {
  console.log('You need to log in to Firebase. Starting login process...');
  try {
    execSync('npx firebase-tools login', { stdio: 'inherit' });
  } catch (loginError) {
    console.error('Firebase login failed:', loginError);
    process.exit(1);
  }
}

// Deploy to Firebase
console.log('Deploying to Firebase...');
try {
  execSync('npx firebase-tools deploy', { stdio: 'inherit' });
  console.log('Deployment completed successfully!');
  console.log('Your website is now live at https://' + projectId + '.web.app');
} catch (error) {
  console.error('Deployment failed:', error);
  process.exit(1);
}

rl.close();
