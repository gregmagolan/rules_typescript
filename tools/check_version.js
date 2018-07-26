const path = require('path');
const fs = require('fs');
var {spawnSync} = require('child_process');

const expected = process.env.npm_package_version;

let contents;

// yarn_install in user WORKSPACE
let maybe = path.resolve(process.cwd(), '../../../../build_bazel_rules_typescript/package.bzl');
if (fs.existsSync(maybe)) {
  contents = fs.readFileSync(maybe, 'utf8');
}

// local yarn call in user WORKSPACE
if (!contents && process.cwd().endsWith('node_modules/@bazel/typescript')) {
  // no version check
  process.exit(1);
}

// yarn_install in build_bazel_rules_typescript WORKSPACE
maybe = path.resolve(process.cwd(), '../build_bazel_rules_typescript/package.bzl');
if (fs.existsSync(maybe)) {
  contents = fs.readFileSync(maybe, 'utf8');
}

// local yarn call in build_bazel_rules_typescript WORKSPACE
maybe = path.resolve(process.cwd(), 'package.bzl');
if (fs.existsSync(maybe)) {
  contents = fs.readFileSync(maybe, 'utf8');
}

if (!contents) {
  console.error('build_bazel_rules_typescript is not installed in your Bazel WORKSPACE file');
} else if (!contents.includes('def rules_typescript_dependencies():')) {
  console.error('invalid package.bzl in build_bazel_rules_typescript');
} else if (!contents.includes(`VERSION = "${expected}"`)) {
  // TODO: we might need to support a range here.
  // In particular, if you end up with @bazel/typescript@1.0.0 and @bazel/typescript@1.0.1 both installed
  // one of the postinstalls is guaranteed to fail since there's only one version of rules_typescript
  console.error('Expected build_bazel_rules_typescript to be version', expected);
} else {
  process.exit(0);
}

process.exit(1);
