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

"""Package file which defines build_bazel_rules_karma dependencies
"""

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

def rules_karma_dependencies():
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
        urls = ["https://github.com/gregmagolan/rules_nodejs/archive/36293992947e0ca835dc6dc6a26c018f8f29a00b.zip"],
        strip_prefix = "rules_nodejs-36293992947e0ca835dc6dc6a26c018f8f29a00b",
    )

    # io_bazel_rules_webtesting web_test_repositories depends on the Go rules.
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

    # ts_web_test depends on the web testing rules to provision browsers.
    _maybe(
        http_archive,
        name = "io_bazel_rules_webtesting",
        urls = ["https://github.com/bazelbuild/rules_webtesting/archive/111d792b9a5b17f87b6e177e274dbbee46094791.zip"],
        strip_prefix = "rules_webtesting-111d792b9a5b17f87b6e177e274dbbee46094791",
        sha256 = "a13af63e928c34eff428d47d31bafeec4e38ee9b6940e70bf2c9cd47184c5c16",
    )

def _maybe(repo_rule, name, **kwargs):
    if name not in native.existing_rules():
        repo_rule(name = name, **kwargs)
