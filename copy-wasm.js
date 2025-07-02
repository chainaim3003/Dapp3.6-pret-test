import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cross-platform copy function for WASM files
function copyWasmFiles() {
  const sourceDir = path.join(__dirname, 'node_modules', 'o1js', 'dist', 'node', 'bindings', 'compiled', '_node_bindings');
  const targetDir = path.join(__dirname, 'build');
  
  // Check if source directory exists
  if (!fs.existsSync(sourceDir)) {
    console.log('⚠️  WASM source directory not found, skipping copy...');
    console.log('   This is normal for Vercel deployment - WASM files will be handled automatically');
    return;
  }

  // Ensure target directory exists
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  try {
    // Copy all files from source to target
    const files = fs.readdirSync(sourceDir);
    files.forEach(file => {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);
      
      if (fs.statSync(sourcePath).isFile()) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`✅ Copied: ${file}`);
      }
    });
    
    console.log('🎉 WASM files copied successfully!');
  } catch (error) {
    console.log('⚠️  WASM copy failed (this may be okay for Vercel):', error.message);
    console.log('   Vercel will handle WASM files during deployment');
  }
}

copyWasmFiles();
