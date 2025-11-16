// Start script for backend when deployed from root
const { spawn } = require('child_process');
const path = require('path');

console.log('Starting backend server from root directory...');

const backendPath = path.join(__dirname, 'backend');
const serverProcess = spawn('node', ['server.js'], {
  cwd: backendPath,
  stdio: 'inherit',
  env: { ...process.env }
});

serverProcess.on('error', (error) => {
  console.error('Failed to start backend:', error);
  process.exit(1);
});

serverProcess.on('exit', (code) => {
  console.log(`Backend process exited with code ${code}`);
  process.exit(code);
});
