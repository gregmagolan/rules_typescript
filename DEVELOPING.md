# For Developers

We strongly encourage you to review the project's scope described in the `README.md` file before working on new features. For large changes, consider writing a design document using [this template](https://goo.gl/YCQttR).

## Testing changing downstream

By default, downstream projects use both an `http_archive` of `build_bazel_rules_typescript` and the released `@bazel/typescript` npm package. `postinstall` steps in these npm packages check that the version of the `build_bazel_rules_typescript` is compatible with the version of the npm package(s).

For example, if a downstream `WORKSPACE` contain:

```python
http_archive(
    name = "build_bazel_rules_typescript",
    url = "https://github.com/bazelbuild/rules_typescript/archive/0.21.0.zip",
    strip_prefix = "rules_typescript-0.21.0",
)
```

that that project's `package.json` would contain the matching:

```json
"@bazel/typescript": "0.21.0",
```

When authoring changes and testing downstream, depending on the `@bazel/typescript` npm package makes the workflow confusing and difficult.
To make authoring and testing changes downstream easier, it is recommended that you override the default `compiler` attribute of `ts_library` if making changes
to `ts_library` and the default `karma` attribute of `ts_web_test_suite`/`ts_web_test` if making changes to those rules.

For example, in `/internal/build_defs.bzl`, change

```python
"compiler": attr.label(
    default = Label(_DEFAULT_COMPILER),
```

to

```python
"compiler": attr.label(
    default = Label("@build_bazel_rules_typescript//internal:tsc_wrapped_bin"),
```

The correct defaults to use so that you are not depending on the npm package downstream are in `/internal/defaults.bzl`. Note, your downstream
workspace will also need the correct `@npm` dependencies available to build these targets (see `internal/e2e/typescript_3.1/package.json`).
In the case of the `angular` workspace, some `@npm` dependencies in this repository will also need to be changed to `@ngdeps` since `angular` does not have
an `@npm` workspace with npm dependencies.

Note, with this workflow the downstream version of `@npm//typescript` will be used to compile the `ts_library` targets in `build_bazel_rules_typescript`.
An example of this can be found under `internal/e2e/typescript_3.1`.

## Releasing

Start from a clean checkout at master/HEAD. Check if there are any breaking
changes since the last tag - if so, this will be a minor, if not, it's a patch.
(This may not sound like semver - but since our major version is a zero, the
rule is that minors are breaking changes and patches are new features).

1. Re-generate the API docs: `yarn skydoc`
1. May be necessary if Go code has changed though probably it was already necessary to run this to keep CI green: `bazel run :gazelle`
1. If we depend on a newer rules_nodejs, update the `check_rules_nodejs_version` in `ts_repositories.bzl`
1. `git commit -a -m 'Update docs for release'`
1. Update `VERSION` in `version.bzl` (increment `patch` if no breaking changes, otherwise increment `minor`)
1. Update `COMPAT_VERSION` in `version.bzl` to equal `VERSION` if there are breaking changes or new features added
1. `git stage version.bzl`
1. `git commit -a -m 'rel: x.x.x'` (replace x.x.x with `VERSION` from `version.bzl`)
1. Build npm package and publish @bazel/typescript: `bazel run //:npm_package.publish`
1. Build npm package and publish @bazel/karma: `bazel run //internal/karma:npm_package.publish`
1. `git push && git push --tags`
1. (Temporary): submit a google3 CL to update the version in `version.bzl`

[releases]: https://github.com/bazelbuild/rules_typescript/releases
