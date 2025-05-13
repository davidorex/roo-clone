#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Define source and destination paths
const sourceFilePath = path.join(__dirname, '..', 'src', 'core', 'Cline.ts');
const chunksDir = path.join(__dirname, 'cline-ts-chunks');
const copyPath = path.join(__dirname, 'cline-ts-full-copy.ts');

// Define the chunks based on our service boundaries
const chunks = [
  {
    name: '01-imports-and-types',
    description: 'Imports and type definitions',
    startPattern: /^import/,
    endPattern: /^export class Cline/
  },
  {
    name: '02-class-properties',
    description: 'Class properties and constructor',
    startPattern: /^export class Cline/,
    endPattern: /^\tprivate async ensureTaskDirectoryExists/
  },
  {
    name: '03-task-state-service',
    description: 'Methods for task state management (TaskStateService)',
    startPattern: /^\tprivate async ensureTaskDirectoryExists/,
    endPattern: /^\tasync restoreCheckpoint/
  },
  {
    name: '04-checkpoint-service',
    description: 'Methods for checkpoint and diff management (CheckpointService)',
    startPattern: /^\tasync restoreCheckpoint/,
    endPattern: /^\t\/\/ Communicate with webview/
  },
  {
    name: '05-webview-communication-service',
    description: 'Methods for webview communication (WebviewCommunicationService)',
    startPattern: /^\t\/\/ Communicate with webview/,
    endPattern: /^\t\/\/ Task lifecycle/
  },
  {
    name: '06-task-lifecycle-service',
    description: 'Methods for task lifecycle (TaskLifecycleService)',
    startPattern: /^\t\/\/ Task lifecycle/,
    endPattern: /^\t\/\/ Checkpoints/
  },
  {
    name: '07-checkpoint-service-methods',
    description: 'Additional checkpoint methods (CheckpointService)',
    startPattern: /^\t\/\/ Checkpoints/,
    endPattern: /^\t\/\/ Tools/
  },
  {
    name: '08-tool-execution-service',
    description: 'Methods for tool execution (ToolExecutionService)',
    startPattern: /^\t\/\/ Tools/,
    endPattern: /^\tasync \*attemptApiRequest/
  },
  {
    name: '09-api-orchestration-service',
    description: 'Methods for API requests and response handling (ApiOrchestrationService)',
    startPattern: /^\tasync \*attemptApiRequest/,
    endPattern: /^\tasync loadContext/
  },
  {
    name: '10-environment-service',
    description: 'Methods for environment context (EnvironmentService)',
    startPattern: /^\tasync loadContext/,
    endPattern: /^}/
  },
  {
    name: '11-class-end',
    description: 'End of class and file',
    startPattern: /^}/,
    endPattern: /$/
  }
];

// Function to extract a chunk from content
function extractChunk(content, startPattern, endPattern) {
  const lines = content.split('\n');
  let startIndex = -1;
  let endIndex = -1;
  
  // Find the start line
  for (let i = 0; i < lines.length; i++) {
    if (startPattern.test(lines[i])) {
      startIndex = i;
      break;
    }
  }
  
  // Find the end line
  for (let i = startIndex + 1; i < lines.length; i++) {
    if (endPattern.test(lines[i])) {
      endIndex = i;
      // If the end pattern is not the end-of-file pattern, we should decrement the index
      // Use string representation for comparison since RegExp objects are compared by reference
      if (endPattern.toString() !== /\$/.toString()) {
        endIndex--;
      }
      break;
    }
  }
  
  if (startIndex === -1 || endIndex === -1) {
    return null;
  }
  
  return lines.slice(startIndex, endIndex + 1).join('\n');
}

// Main function
async function main() {
  try {
    // Read the source file
    const content = fs.readFileSync(sourceFilePath, 'utf8');
    
    // Copy the whole file
    fs.writeFileSync(copyPath, content);
    console.log(`Copied full file to ${copyPath}`);
    
    // Process each chunk
    for (const chunk of chunks) {
      const chunkContent = extractChunk(content, chunk.startPattern, chunk.endPattern);
      
      if (!chunkContent) {
        console.error(`Failed to extract chunk: ${chunk.name}`);
        continue;
      }
      
      // Create the output file with header
      const outputContent = [
        `// ${chunk.name}: ${chunk.description}`,
        `// Extracted from Cline.ts for refactoring into ${chunk.description.match(/\(([^)]+)\)/)?.[1] || 'services'}`,
        '',
        chunkContent
      ].join('\n');
      
      const outputPath = path.join(chunksDir, `${chunk.name}.ts`);
      fs.writeFileSync(outputPath, outputContent);
      console.log(`Created chunk: ${outputPath}`);
    }
    
    // Create an index file with line ranges for each chunk
    const indexContent = [
      '# Cline.ts Chunks for Refactoring',
      '',
      'This directory contains chunks of the original Cline.ts file, organized by service boundaries',
      'to facilitate the refactoring into the new modular architecture.',
      '',
      '## Chunks Overview',
      ''
    ];
    
    for (const chunk of chunks) {
      indexContent.push(`- **${chunk.name}**: ${chunk.description}`);
    }
    
    indexContent.push('', '## Refactoring Strategy', '');
    indexContent.push('See the implementation plans in `../service-implementation-plans/` for detailed information on how to');
    indexContent.push('refactor each section into the corresponding service module.');
    
    fs.writeFileSync(path.join(chunksDir, 'README.md'), indexContent.join('\n'));
    console.log('Created index file');
    
    console.log('Done!');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();