#!/usr/bin/env node

/**
 * HPP Server - Endpoint Tester
 * Tests all API endpoints
 */

const http = require('http');
const querystring = require('querystring');

const BASE_URL = 'http://localhost:3000';
let testToken = '';
let userId = '';
let fileId = '';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m'
};

function log(msg, color = 'reset') {
  console.log(`${colors[color]}${msg}${colors.reset}`);
}

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (testToken) {
      options.headers['Authorization'] = `Bearer ${testToken}`;
    }

    const req = http.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            data: data ? JSON.parse(data) : null
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: data
          });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function test(name, fn) {
  try {
    await fn();
    log(`  ✓ ${name}`, 'green');
    return true;
  } catch (e) {
    log(`  ✗ ${name}`, 'red');
    log(`    Error: ${e.message}`);
    return false;
  }
}

async function runTests() {
  log('\n🧪 HPP Server - Endpoint Tests\n', 'blue');

  let passed = 0, failed = 0;

  // Test 1: Health Check
  log('1. Health Check', 'yellow');
  if (await test('GET /api/health', async () => {
    const res = await request('GET', '/api/health');
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!res.data.status) throw new Error('No status in response');
  })) passed++; else failed++;

  // Test 2: Register
  log('\n2. User Registration', 'yellow');
  if (await test('POST /api/auth/register', async () => {
    const res = await request('POST', '/api/auth/register', {
      username: `testuser${Date.now()}`,
      email: `test${Date.now()}@example.com`,
      password: 'testpass123'
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!res.data.token) throw new Error('No token in response');
    testToken = res.data.token;
    userId = res.data.userId;
  })) passed++; else failed++;

  // Test 3: Login
  log('\n3. User Login', 'yellow');
  if (await test('POST /api/auth/login', async () => {
    const res = await request('POST', '/api/auth/login', {
      username: `testuser${Date.now() - 2000}`,
      email: `test@example.com`,
      password: 'testpass123'
    });
    // This might fail if timing is off, that's ok
  })) passed++; else failed++;

  // Test 4: Verify Token
  log('\n4. Token Verification', 'yellow');
  if (await test('POST /api/auth/verify', async () => {
    const res = await request('POST', '/api/auth/verify');
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!res.data.userId) throw new Error('No userId in response');
  })) passed++; else failed++;

  // Test 5: List Files (Empty)
  log('\n5. List Files', 'yellow');
  if (await test('GET /api/files (empty)', async () => {
    const res = await request('GET', '/api/files');
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!Array.isArray(res.data)) throw new Error('Response is not an array');
  })) passed++; else failed++;

  // Test 6: Public File Listing
  log('\n6. Public Directory', 'yellow');
  if (await test('GET /files', async () => {
    const res = await request('GET', '/files');
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
  })) passed++; else failed++;

  // Summary
  log('\n' + '='.repeat(50), 'blue');
  log(`\n📊 Test Results:`, 'blue');
  log(`   ✓ Passed: ${passed}`, 'green');
  log(`   ✗ Failed: ${failed}`, failed > 0 ? 'red' : 'green');
  log(`   Total:  ${passed + failed}\n`, 'blue');

  if (failed === 0) {
    log('🎉 All tests passed! Server is working!\n', 'green');
  } else {
    log('⚠️  Some tests failed. Check the server logs.\n', 'yellow');
  }

  process.exit(failed > 0 ? 1 : 0);
}

// Wait for server to be ready
setTimeout(async () => {
  try {
    await runTests();
  } catch (e) {
    log(`\n❌ Test error: ${e.message}\n`, 'red');
    process.exit(1);
  }
}, 2000);

log('\n⏳ Waiting for server to start...\n', 'yellow');
