# Installing the Karma rules

Add the `@bazel/karma` npm package to your `devDependencies` in `package.json`.

Your `WORKSPACE` should declare a `yarn_install` or `npm_install` rule named `npm`.
It should then install the rules found in the npm packages.

```python
yarn_install(
  name = "npm",
  package_json = "//:package.json",
  yarn_lock = "//:yarn.lock",
)

# Install all Bazel dependencies needed for npm packages that supply Bazel rules
load("@npm//:install_bazel_dependencies.bzl", "install_bazel_dependencies")
install_bazel_dependencies()
```

This causes the `@bazel/karma` package to be installed as a Bazel workspace named `npm_bazel_karma`.

Now add this to your `WORKSPACE` to install the Karma dependencies:

```python
# Fetch transitive Bazel dependencies of npm_bazel_karma
# ONLY REQUIRED if you are using the @bazel/karma npm package
load("@npm_bazel_karma//:package.bzl", "rules_karma_dependencies")
rules_karma_dependencies()
```

This installs the `build_bazel_rules_nodejs` and `io_bazel_rules_webtesting` repositories, if you haven't installed them earlier.

Finally, configure the rules_webtesting:

```python
# Setup web testing, choose browsers we can test on
# ONLY REQUIRED if you are using the @bazel/karma npm package
load("@io_bazel_rules_webtesting//web:repositories.bzl", "browser_repositories", "web_test_repositories")

web_test_repositories()
browser_repositories(
    chromium = True,
)
```

## Installing with self-managed dependencies

If you didn't use the `yarn_install` or `npm_install` rule to create an `npm` workspace, you'll have to declare a rule in your root `BUILD.bazel` file to execute karma:

```python
# Create a karma rule to use in ts_web_test_suite karma
# attribute when using self-managed dependencies
nodejs_binary(
    name = "karma/karma",
    entry_point = "karma/bin/karma",
    # Point bazel to your node_modules to find the entry point
    node_modules = ["//:node_modules"],
)
```

