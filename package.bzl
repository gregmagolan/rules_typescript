# Copyright 2018 The Bazel Authors. All rights reserved.
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

"""Package file which defines build_bazel_rules_typescript dependencies
"""

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

def rules_typescript_dependencies():
    """
    Fetch our transitive dependencies.

    If the user wants to get a different version of these, they can just fetch it
    from their WORKSPACE before calling this function, or not call this function at all.
    """

    # TypeScript compiler runs on node.js runtime
    # TODO(gregmagolan): update to next tagged release
    _maybe(
        http_archive,
        name = "build_bazel_rules_nodejs",
        urls = ["https://github.com/gregmagolan/rules_nodejs/archive/8b79c320a7471d7a15f90cc78db37361a0fd411f.zip"],
        strip_prefix = "rules_nodejs-8b79c320a7471d7a15f90cc78db37361a0fd411f",
    )

    # ts_devserver depends on the Go rules.
    # See https://github.com/bazelbuild/rules_go#setup for the latest version.
    _maybe(
        http_archive,
        name = "io_bazel_rules_go",
        # We need https://github.com/bazelbuild/rules_go/commit/109c520465fcb418f2c4be967f3744d959ad66d3 which
        # is not part of any 0.16.x release yet. This commit provides runfile resolve support for Windows.
        urls = ["https://github.com/bazelbuild/rules_go/archive/12a52e9845a5b06a28ffda06d7f2b07ff2320b97.zip"],
        strip_prefix = "rules_go-12a52e9845a5b06a28ffda06d7f2b07ff2320b97",
        sha256 = "5c0a059afe51c744c90ae2b33ac70b9b4f4c514715737e2ec0b5fd297400c10d",
    )

    # go_repository is defined in bazel_gazelle
    _maybe(
        http_archive,
        name = "bazel_gazelle",
        urls = ["https://github.com/bazelbuild/bazel-gazelle/archive/c0880f7f9d7048b45be5d36115ec2bf444e723c4.zip"],  # 2018-12-05
        strip_prefix = "bazel-gazelle-c0880f7f9d7048b45be5d36115ec2bf444e723c4",
        sha256 = "d9980ae0c91d90aaf9131170adfec4e87464d53e58ce2eb01b350a53e93a87c7",
    )

    # ts_auto_deps depends on com_github_bazelbuild_buildtools
    _maybe(
        http_archive,
        name = "com_github_bazelbuild_buildtools",
        url = "https://github.com/bazelbuild/buildtools/archive/0.19.2.1.zip",
        strip_prefix = "buildtools-0.19.2.1",
        sha256 = "9176a7df34dbed2cf5171eb56271868824560364e60644348219f852f593ae79",
    )

def rules_typescript_dev_dependencies():
    """
    Fetch dependencies needed for local development, but not needed by users.

    These are in this file to keep version information in one place, and make the WORKSPACE
    shorter.
    """

    # For running skylint
    _maybe(
        http_archive,
        name = "io_bazel",
        urls = ["https://github.com/bazelbuild/bazel/releases/download/0.17.1/bazel-0.17.1-dist.zip"],
    )

    #############################################
    # Dependencies for generating documentation #
    #############################################

    http_archive(
        name = "io_bazel_rules_sass",
        urls = ["https://github.com/bazelbuild/rules_sass/archive/8ccf4f1c351928b55d5dddf3672e3667f6978d60.zip"],  # 2018-11-23
        strip_prefix = "rules_sass-8ccf4f1c351928b55d5dddf3672e3667f6978d60",
        sha256 = "894d7928df8da85e263d743c8434d4c10ab0a3f0708fed0d53394e688e3faf70",
    )

    http_archive(
        name = "io_bazel_skydoc",
        url = "https://github.com/bazelbuild/skydoc/archive/9bbdf62c03b5c3fed231604f78d3976f47753d79.zip",  # 2018-11-20
        strip_prefix = "skydoc-9bbdf62c03b5c3fed231604f78d3976f47753d79",
        sha256 = "07ae937026cb56000fb268d4986b220e868c1bdfe6aac27ecada4b4b3dae246f",
    )

def _maybe(repo_rule, name, **kwargs):
    if name not in native.existing_rules():
        repo_rule(name = name, **kwargs)
