/*
 * Concat all JS files before serving.
 */
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';
import * as tmp from 'tmp';
import {createInterface} from 'readline';
///<reference types="lib.dom"/>

/**
 * Return SHA1 of data buffer.
 */
function sha1(data) {
  const hash = crypto.createHash('sha1');
  hash.update(data);
  return hash.digest('hex');
}

/**
 * Entry-point for the Karma plugin.
 */
function initConcatJs(logger, emitter, basePath, hostname, port) {
  const log = logger.create('framework.concat_js');

  // Create a tmp file for the concat bundle that is automatically cleaned up on
  // exit.
  const tmpFile = tmp.fileSync({keep: false, dir: process.env['TEST_TMPDIR']});

  emitter.on('file_list_modified', files => {
    // Bootstrap files: included & served --- included (as script tags) and served (by the karma server)
    const bootstrapFiles = files.included.filter(file => files.served.includes(file));
    // Static files: !included & served --- not included (as script tags) and served (by the karma server)
    const staticFiles = files.served.filter(file => !files.included.includes(file));
    // Require files: included & !served --- included (in karma-concat-js but NOT as script tags) and not served (by the karma server) 
    const requireFiles = files.included.filter(file => !files.served.includes(file));
    // See http://karma-runner.github.io/3.0/config/files.html for explanation of included & served

    const included = [];
    const served = [];

    // Static files should be not included (as script tags) and served (by the karma server)
    staticFiles.forEach(file => {
      served.push(file);
    });

    // Bootstrap files should be included (as script tags) and served (by the karma server)
    bootstrapFiles.forEach(file => {
      included.push(file);
      served.push(file);
    });

    // Require files should be concatenated (except for non-JS files which should be added).
    // The concatenated bundle should be both included (as script tag) & served (by the karma server)
    // This should come first as the last bootstrap file will require() all the user spec files
    const bundleFile = {
      path: '/concatjs_bundle.js',
      contentPath: tmpFile.name,
      isUrl: false,
      content: '',
      encodings: {},
    } as any;

    requireFiles.forEach(file => {
      const relativePath =
          path.relative(basePath, file.originalPath).replace(/\\/g, '/');
      // Remove 'use strict'.
      let content = file.content.replace(/('use strict'|"use strict");?/,
                                          '');
      content = JSON.stringify(
        `${content}\n//# sourceURL=http://${hostname}:${port}/base/` +
        `${relativePath}\n`);
      content = `//${relativePath}\neval(${content});\n`;
      bundleFile.content += content;
    });
    bundleFile.sha = sha1(Buffer.from(bundleFile.content));
    bundleFile.mtime = new Date();

    included.push(bundleFile);
    served.push(bundleFile);

    log.debug('Writing concatjs bundle to tmp file %s',
        bundleFile.contentPath);
    fs.writeFileSync(bundleFile.contentPath, bundleFile.content);

    files.included = included;
    files.served = served;
  });
}

(initConcatJs as any).$inject = ['logger', 'emitter', 'config.basePath', 'config.hostname', 'config.port'];

function watcher(fileList: {refresh: () => void}) {
  // ibazel will write this string after a successful build
  // We don't want to re-trigger tests if the compilation fails, so
  // we should only listen for this event.
  const IBAZEL_NOTIFY_BUILD_SUCCESS = 'IBAZEL_BUILD_COMPLETED SUCCESS';
  // ibazel communicates with us via stdin
  const rl = createInterface({input: process.stdin, terminal: false});
  rl.on('line', (chunk: string) => {
    if (chunk === IBAZEL_NOTIFY_BUILD_SUCCESS) {
      fileList.refresh();
    }
  });
  rl.on('close', () => {
    // Give ibazel 5s to kill our process, otherwise do it ourselves
    setTimeout(() => {
      console.error('ibazel failed to stop karma after 5s; probably a bug');
      process.exit(1);
    }, 5000);
  });
}

(watcher as any).$inject = ['fileList'];

module.exports = {
  'framework:concat_js': ['factory', initConcatJs],
  'watcher': ['value', watcher],
};
