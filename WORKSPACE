# Copyright 2017 The Bazel Authors. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

workspace(name = "build_bazel_rules_karma")

# Load nested build_bazel_rules_typescript repository
local_repository(
    name = "build_bazel_rules_typescript",
    path = "../..",
)

# Load our dependencies
load("@build_bazel_rules_typescript//:package.bzl", "rules_typescript_dependencies", "rules_typescript_dev_dependencies")

rules_typescript_dependencies()

rules_typescript_dev_dependencies()

# Load rules_karma dependencies
load("//:package.bzl", "rules_karma_dependencies")

rules_karma_dependencies()

# Setup nodejs toolchain
load("@build_bazel_rules_nodejs//:defs.bzl", "node_repositories", "yarn_install")

# Install a hermetic version of node.
node_repositories()

# Download npm dependencies
yarn_install(
    name = "npm",
    package_json = "//:package.json",
    yarn_lock = "//:yarn.lock",
)

# Setup rules_go toolchain
load("@io_bazel_rules_go//go:def.bzl", "go_register_toolchains", "go_rules_dependencies")

go_rules_dependencies()

go_register_toolchains()

# Setup gazelle toolchain
load("@bazel_gazelle//:deps.bzl", "gazelle_dependencies")

gazelle_dependencies()

# Setup typescript toolchain
load("@build_bazel_rules_typescript//:defs.bzl", "ts_setup_workspace")

ts_setup_workspace()
