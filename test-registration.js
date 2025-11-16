const fetch = require('node-fetch');

async function testRegistration() {
  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'test123456',
        rollNo: 'TEST001',
        college: 'Test College',
        degree: 'B.Tech (Bachelor of Technology)',
        course: 'Computer Science Engineering',
        year: '1st Year'
      })
    });

    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testRegistration();
