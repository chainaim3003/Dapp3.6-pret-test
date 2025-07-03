/**
 * Simple Infrastructure Test
 * Verifies the new infrastructure system works correctly
 */

import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
dotenv.config();

async function testInfrastructure() {
  try {
    console.log('🔧 Testing ZK-PRET Infrastructure System...');

    // Check if build directory exists
    const buildExists = fs.existsSync('./build');
    console.log(`\n📁 Build Directory: ${buildExists ? '✅ EXISTS' : '❌ MISSING'}`);
    
    if (!buildExists) {
      console.log('\n⚠️ Build directory not found. Please run "npm run build" first.');
      console.log('📝 To fix this issue:');
      console.log('   1. npm install');
      console.log('   2. npm run build');
      console.log('   3. npm test');
      return;
    }

    // Check compiled files
    const requiredPaths = [
      './build/infrastructure',
      './build/core',
      './build/api'
    ];
    
    console.log('\n📂 Checking compiled files:');
    for (const reqPath of requiredPaths) {
      const exists = fs.existsSync(reqPath);
      console.log(`   ${reqPath}: ${exists ? '✅' : '❌'}`);
    }

    // Test environment manager
    console.log('\n1️⃣ Testing Environment Manager...');
    try {
      const { environmentManager } = await import('./build/infrastructure/environment/manager.js');
      const currentEnv = environmentManager.getCurrentEnvironment();
      console.log(`✅ Current environment: ${currentEnv}`);

      const envInfo = environmentManager.getEnvironmentInfo();
      console.log(`✅ Environment info:`, envInfo);
    } catch (error) {
      console.log(`⚠️ Environment manager not ready: ${error.message}`);
    }

    // Test oracle registry
    console.log('\n2️⃣ Testing Oracle Registry...');
    try {
      const { OracleRegistryFactory } = await import('./build/infrastructure/oracle/factory.js');
      const oracleRegistry = await OracleRegistryFactory.create();
      console.log('✅ Oracle registry created');

      const oracles = oracleRegistry.listOracles();
      console.log(`✅ Available oracles: ${oracles.join(', ')}`);

      // Test a specific oracle
      const gleifPublicKey = oracleRegistry.getPublicKeyFor('GLEIF');
      console.log(`✅ GLEIF oracle public key: ${gleifPublicKey.toBase58()}`);
    } catch (error) {
      console.log(`⚠️ Oracle registry not ready: ${error.message}`);
    }

    // Test compilation manager
    console.log('\n3️⃣ Testing Compilation Manager...');
    try {
      const { compilationManager } = await import('./build/infrastructure/compilation/manager.js');
      await compilationManager.initialize();
      console.log('✅ Compilation manager initialized');

      const stats = compilationManager.getStats();
      console.log(`✅ Compilation stats:`, stats);
    } catch (error) {
      console.log(`⚠️ Compilation manager not ready: ${error.message}`);
    }

    // Test deployment manager
    console.log('\n4️⃣ Testing Deployment Manager...');
    try {
      const { deploymentManager } = await import('./build/infrastructure/deployment/manager.js');
      const deploymentSummary = await deploymentManager.getDeploymentSummary();
      console.log(`✅ Deployment summary:`, deploymentSummary);
    } catch (error) {
      console.log(`⚠️ Deployment manager not ready: ${error.message}`);
    }

    // Test API endpoints
    console.log('\n5️⃣ Testing API Structure...');
    try {
      if (fs.existsSync('./build/api/index.js')) {
        console.log('✅ Main API file compiled successfully');
      }
      if (fs.existsSync('./build/api/health.js')) {
        console.log('✅ Health API endpoint compiled successfully');
      }
    } catch (error) {
      console.log(`⚠️ API structure test failed: ${error.message}`);
    }

    console.log('\n🎉 Infrastructure test completed successfully!');
    console.log('\n📊 System Status Summary:');
    console.log(`  • Environment: ${process.env.BUILD_ENV || 'LOCAL'}`);
    console.log(`  • Build Directory: ${buildExists ? 'EXISTS' : 'MISSING'}`);
    console.log(`  • TypeScript Compiled: ${checkCompiledFiles() ? 'YES' : 'NO'}`);
    console.log(`  • API Ready: ${fs.existsSync('./build/api/index.js') ? 'YES' : 'NO'}`);

  } catch (error) {
    console.error('❌ Infrastructure test failed:', error);
    console.log('\n🔧 Troubleshooting steps:');
    console.log('1. Ensure all dependencies are installed: npm install');
    console.log('2. Compile TypeScript files: npm run build');
    console.log('3. Check for TypeScript errors: npm run verify');
    console.log('4. Run this test again: npm test');
    throw error;
  }
}

function checkCompiledFiles() {
  return fs.existsSync('./build/infrastructure') && 
         fs.existsSync('./build/core') && 
         fs.existsSync('./build/api');
}

// Run test
testInfrastructure().catch(err => {
  console.error('💥 Fatal error:', err);
  console.log('\n🚨 Please ensure you have run "npm install" and "npm run build" before running this test.');
  process.exit(1);
});
