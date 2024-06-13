#!/usr/bin/env node

console.log("Setting up your API starter kit...");
// Add your setup code here

const fs = require("fs");
const path = require("path");

// Path to the starter kit files
const starterKitPath = path.join(__dirname, "create-api-starter-kit");

// Function to copy files
function copyFiles(source, destination) {
  const files = fs.readdirSync(source);

  files.forEach((file) => {
    const srcFile = path.join(source, file);
    const destFile = path.join(destination, file);

    if (fs.lstatSync(srcFile).isDirectory()) {
      fs.mkdirSync(destFile);
      copyFiles(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  });
}

// Destination path (current working directory)
const destinationPath = process.cwd();

// Copy files from starter kit to destination
copyFiles(starterKitPath, destinationPath);

console.log("API Starter Kit setup complete.");
