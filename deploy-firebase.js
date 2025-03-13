
const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Starting Firebase deployment process...');

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

// Check if .firebaserc has a project ID
const firebaserc = JSON.parse(fs.readFileSync('.firebaserc', 'utf8'));
if (firebaserc.projects.default === 'your-firebase-project-id') {
  rl.question('Enter your Firebase project ID: ', (projectId) => {
    console.log(`Setting project ID to: ${projectId}`);
    firebaserc.projects.default = projectId;
    fs.writeFileSync('.firebaserc', JSON.stringify(firebaserc, null, 2));
    
    // Deploy to Firebase
    console.log('Deploying to Firebase...');
    try {
      execSync('npx firebase-tools deploy', { stdio: 'inherit' });
      console.log('Deployment completed successfully!');
    } catch (error) {
      console.error('Deployment failed:', error);
    }
    
    rl.close();
  });
} else {
  // Deploy to Firebase
  console.log('Deploying to Firebase...');
  try {
    execSync('npx firebase-tools deploy', { stdio: 'inherit' });
    console.log('Deployment completed successfully!');
  } catch (error) {
    console.error('Deployment failed:', error);
  }
  
  rl.close();
}
