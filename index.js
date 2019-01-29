(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@bazel/karma", ["require", "exports", "crypto", "fs", "path", "process", "tmp", "readline"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
     * Concat all JS files before serving.
     */
    var crypto = require("crypto");
    var fs = require("fs");
    var path = require("path");
    var process = require("process");
    var tmp = require("tmp");
    var readline_1 = require("readline");
    ///<reference types="lib.dom"/>
    /**
     * Return SHA1 of data buffer.
     */
    function sha1(data) {
        var hash = crypto.createHash('sha1');
        hash.update(data);
        return hash.digest('hex');
    }
    /**
     * Entry-point for the Karma plugin.
     */
    function initConcatJs(logger, emitter, basePath) {
        var log = logger.create('framework.concat_js');
        // Create a tmp file for the concat bundle that is automatically cleaned up on
        // exit.
        var tmpFile = tmp.fileSync({ keep: false, dir: process.env['TEST_TMPDIR'] });
        emitter.on('file_list_modified', function (files) {
            var bundleFile = {
                path: '/concatjs_bundle.js',
                contentPath: tmpFile.name,
                isUrl: false,
                content: '',
                encodings: {},
            };
            var included = [];
            files.included.forEach(function (file) {
                if (path.extname(file.originalPath) !== '.js') {
                    // Preserve all non-JS that were there in the included list.
                    included.push(file);
                }
                else {
                    var relativePath = path.relative(basePath, file.originalPath).replace(/\\/g, '/');
                    // Remove 'use strict'.
                    var content = file.content.replace(/('use strict'|"use strict");?/, '');
                    content = JSON.stringify(content + '\n//# sourceURL=http://concatjs/base/' +
                        relativePath + '\n');
                    content = "//" + relativePath + "\neval(" + content + ");\n";
                    bundleFile.content += content;
                }
            });
            bundleFile.sha = sha1(Buffer.from(bundleFile.content));
            bundleFile.mtime = new Date();
            included.unshift(bundleFile);
            files.included = included;
            files.served.push(bundleFile);
            log.debug('Writing concatjs bundle to tmp file %s', bundleFile.contentPath);
            fs.writeFileSync(bundleFile.contentPath, bundleFile.content);
        });
    }
    initConcatJs.$inject = ['logger', 'emitter', 'config.basePath'];
    function watcher(fileList) {
        // ibazel will write this string after a successful build
        // We don't want to re-trigger tests if the compilation fails, so
        // we should only listen for this event.
        var IBAZEL_NOTIFY_BUILD_SUCCESS = 'IBAZEL_BUILD_COMPLETED SUCCESS';
        // ibazel communicates with us via stdin
        var rl = readline_1.createInterface({ input: process.stdin, terminal: false });
        rl.on('line', function (chunk) {
            if (chunk === IBAZEL_NOTIFY_BUILD_SUCCESS) {
                fileList.refresh();
            }
        });
        rl.on('close', function () {
            // Give ibazel 5s to kill our process, otherwise do it ourselves
            setTimeout(function () {
                console.error('ibazel failed to stop karma after 5s; probably a bug');
                process.exit(1);
            }, 5000);
        });
    }
    watcher.$inject = ['fileList'];
    module.exports = {
        'framework:concat_js': ['factory', initConcatJs],
        'watcher': ['value', watcher],
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBOztPQUVHO0lBQ0gsK0JBQWlDO0lBQ2pDLHVCQUF5QjtJQUN6QiwyQkFBNkI7SUFDN0IsaUNBQW1DO0lBQ25DLHlCQUEyQjtJQUMzQixxQ0FBeUM7SUFDekMsK0JBQStCO0lBRS9COztPQUVHO0lBQ0gsU0FBUyxJQUFJLENBQUMsSUFBSTtRQUNoQixJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7T0FFRztJQUNILFNBQVMsWUFBWSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUTtRQUM3QyxJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFFakQsOEVBQThFO1FBQzlFLFFBQVE7UUFDUixJQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFBQyxDQUFDLENBQUM7UUFFN0UsT0FBTyxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxVQUFBLEtBQUs7WUFDcEMsSUFBTSxVQUFVLEdBQUc7Z0JBQ2pCLElBQUksRUFBRSxxQkFBcUI7Z0JBQzNCLFdBQVcsRUFBRSxPQUFPLENBQUMsSUFBSTtnQkFDekIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsU0FBUyxFQUFFLEVBQUU7YUFDUCxDQUFDO1lBQ1QsSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBRXBCLEtB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c0NvbnRlbnQiOlsiLypcbiAqIENvbmNhdCBhbGwgSlMgZmlsZXMgYmVmb3JlIHNlcnZpbmcuXG4gKi9cbmltcG9ydCAqIGFzIGNyeXB0byBmcm9tICdjcnlwdG8nO1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIHByb2Nlc3MgZnJvbSAncHJvY2Vzcyc7XG5pbXBvcnQgKiBhcyB0bXAgZnJvbSAndG1wJztcbmltcG9ydCB7Y3JlYXRlSW50ZXJmYWNlfSBmcm9tICdyZWFkbGluZSc7XG4vLy88cmVmZXJlbmNlIHR5cGVzPVwibGliLmRvbVwiLz5cblxuLyoqXG4gKiBSZXR1cm4gU0hBMSBvZiBkYXRhIGJ1ZmZlci5cbiAqL1xuZnVuY3Rpb24gc2hhMShkYXRhKSB7XG4gIGNvbnN0IGhhc2ggPSBjcnlwdG8uY3JlYXRlSGFzaCgnc2hhMScpO1xuICBoYXNoLnVwZGF0ZShkYXRhKTtcbiAgcmV0dXJuIGhhc2guZGlnZXN0KCdoZXgnKTtcbn1cblxuLyoqXG4gKiBFbnRyeS1wb2ludCBmb3IgdGhlIEthcm1hIHBsdWdpbi5cbiAqL1xuZnVuY3Rpb24gaW5pdENvbmNhdEpzKGxvZ2dlciwgZW1pdHRlciwgYmFzZVBhdGgpIHtcbiAgY29uc3QgbG9nID0gbG9nZ2VyLmNyZWF0ZSgnZnJhbWV3b3JrLmNvbmNhdF9qcycpO1xuXG4gIC8vIENyZWF0ZSBhIHRtcCBmaWxlIGZvciB0aGUgY29uY2F0IGJ1bmRsZSB0aGF0IGlzIGF1dG9tYXRpY2FsbHkgY2xlYW5lZCB1cCBvblxuICAvLyBleGl0LlxuICBjb25zdCB0bXBGaWxlID0gdG1wLmZpbGVTeW5jKHtrZWVwOiBmYWxzZSwgZGlyOiBwcm9jZXNzLmVudlsnVEVTVF9UTVBESVInXX0pO1xuXG4gIGVtaXR0ZXIub24oJ2ZpbGVfbGlzdF9tb2RpZmllZCcsIGZpbGVzID0+IHtcbiAgICBjb25zdCBidW5kbGVGaWxlID0ge1xuICAgICAgcGF0aDogJy9jb25jYXRqc19idW5kbGUuanMnLFxuICAgICAgY29udGVudFBhdGg6IHRtcEZpbGUubmFtZSxcbiAgICAgIGlzVXJsOiBmYWxzZSxcbiAgICAgIGNvbnRlbnQ6ICcnLFxuICAgICAgZW5jb2RpbmdzOiB7fSxcbiAgICB9IGFzIGFueTtcbiAgICBjb25zdCBpbmNsdWRlZCA9IFtdO1xuXG4gICAgZmlsZXMuaW5jbHVkZWQuZm9yRWFjaChmaWxlID0+IHtcbiAgICAgIGlmIChwYXRoLmV4dG5hbWUoZmlsZS5vcmlnaW5hbFBhdGgpICE9PSAnLmpzJykge1xuICAgICAgICAvLyBQcmVzZXJ2ZSBhbGwgbm9uLUpTIHRoYXQgd2VyZSB0aGVyZSBpbiB0aGUgaW5jbHVkZWQgbGlzdC5cbiAgICAgICAgaW5jbHVkZWQucHVzaChmaWxlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHJlbGF0aXZlUGF0aCA9XG4gICAgICAgICAgICBwYXRoLnJlbGF0aXZlKGJhc2VQYXRoLCBmaWxlLm9yaWdpbmFsUGF0aCkucmVwbGFjZSgvXFxcXC9nLCAnLycpO1xuXG4gICAgICAgIC8vIFJlbW92ZSAndXNlIHN0cmljdCcuXG4gICAgICAgIGxldCBjb250ZW50ID0gZmlsZS5jb250ZW50LnJlcGxhY2UoLygndXNlIHN0cmljdCd8XCJ1c2Ugc3RyaWN0XCIpOz8vLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcnKTtcbiAgICAgICAgY29udGVudCA9IEpTT04uc3RyaW5naWZ5KFxuICAgICAgICAgICAgY29udGVudCArICdcXG4vLyMgc291cmNlVVJMPWh0dHA6Ly9jb25jYXRqcy9iYXNlLycgK1xuICAgICAgICAgICAgcmVsYXRpdmVQYXRoICsgJ1xcbicpO1xuICAgICAgICBjb250ZW50ID0gYC8vJHtyZWxhdGl2ZVBhdGh9XFxuZXZhbCgke2NvbnRlbnR9KTtcXG5gO1xuICAgICAgICBidW5kbGVGaWxlLmNvbnRlbnQgKz0gY29udGVudDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGJ1bmRsZUZpbGUuc2hhID0gc2hhMShCdWZmZXIuZnJvbShidW5kbGVGaWxlLmNvbnRlbnQpKTtcbiAgICBidW5kbGVGaWxlLm10aW1lID0gbmV3IERhdGUoKTtcbiAgICBpbmNsdWRlZC51bnNoaWZ0KGJ1bmRsZUZpbGUpO1xuXG4gICAgZmlsZXMuaW5jbHVkZWQgPSBpbmNsdWRlZDtcbiAgICBmaWxlcy5zZXJ2ZWQucHVzaChidW5kbGVGaWxlKTtcblxuICAgIGxvZy5kZWJ1ZygnV3JpdGluZyBjb25jYXRqcyBidW5kbGUgdG8gdG1wIGZpbGUgJXMnLFxuICAgICAgICBidW5kbGVGaWxlLmNvbnRlbnRQYXRoKTtcbiAgICBmcy53cml0ZUZpbGVTeW5jKGJ1bmRsZUZpbGUuY29udGVudFBhdGgsIGJ1bmRsZUZpbGUuY29udGVudCk7XG4gIH0pO1xufVxuXG4oaW5pdENvbmNhdEpzIGFzIGFueSkuJGluamVjdCA9IFsnbG9nZ2VyJywgJ2VtaXR0ZXInLCAnY29uZmlnLmJhc2VQYXRoJ107XG5cbmZ1bmN0aW9uIHdhdGNoZXIoZmlsZUxpc3Q6IHtyZWZyZXNoOiAoKSA9PiB2b2lkfSkge1xuICAvLyBpYmF6ZWwgd2lsbCB3cml0ZSB0aGlzIHN0cmluZyBhZnRlciBhIHN1Y2Nlc3NmdWwgYnVpbGRcbiAgLy8gV2UgZG9uJ3Qgd2FudCB0byByZS10cmlnZ2VyIHRlc3RzIGlmIHRoZSBjb21waWxhdGlvbiBmYWlscywgc29cbiAgLy8gd2Ugc2hvdWxkIG9ubHkgbGlzdGVuIGZvciB0aGlzIGV2ZW50LlxuICBjb25zdCBJQkFaRUxfTk9USUZZX0JVSUxEX1NVQ0NFU1MgPSAnSUJBWkVMX0JVSUxEX0NPTVBMRVRFRCBTVUNDRVNTJztcbiAgLy8gaWJhemVsIGNvbW11bmljYXRlcyB3aXRoIHVzIHZpYSBzdGRpblxuICBjb25zdCBybCA9IGNyZWF0ZUludGVyZmFjZSh7aW5wdXQ6IHByb2Nlc3Muc3RkaW4sIHRlcm1pbmFsOiBmYWxzZX0pO1xuICBybC5vbignbGluZScsIChjaHVuazogc3RyaW5nKSA9PiB7XG4gICAgaWYgKGNodW5rID09PSBJQkFaRUxfTk9USUZZX0JVSUxEX1NVQ0NFU1MpIHtcbiAgICAgIGZpbGVMaXN0LnJlZnJlc2goKTtcbiAgICB9XG4gIH0pO1xuICBybC5vbignY2xvc2UnLCAoKSA9PiB7XG4gICAgLy8gR2l2ZSBpYmF6ZWwgNXMgdG8ga2lsbCBvdXIgcHJvY2Vzcywgb3RoZXJ3aXNlIGRvIGl0IG91cnNlbHZlc1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcignaWJhemVsIGZhaWxlZCB0byBzdG9wIGthcm1hIGFmdGVyIDVzOyBwcm9iYWJseSBhIGJ1ZycpO1xuICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgIH0sIDUwMDApO1xuICB9KTtcbn1cblxuKHdhdGNoZXIgYXMgYW55KS4kaW5qZWN0ID0gWydmaWxlTGlzdCddO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgJ2ZyYW1ld29yazpjb25jYXRfanMnOiBbJ2ZhY3RvcnknLCBpbml0Q29uY2F0SnNdLFxuICAnd2F0Y2hlcic6IFsndmFsdWUnLCB3YXRjaGVyXSxcbn07XG4iXX0=