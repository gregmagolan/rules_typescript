package main

import (
	"flag"
	"fmt"
	"net/http"
	"os"
	"regexp"
	"strconv"
	"strings"

	"github.com/bazelbuild/rules_typescript/internal/concatjs/concatjs"
	"github.com/bazelbuild/rules_typescript/internal/devserver/devserver"
)

var (
	port        = flag.Int("port", 5432, "server port to listen on")
	base        = flag.String("base", "", "server base (required, runfiles of the binary)")
	pkgs        = flag.String("packages", "", "root package(s) to serve, comma-separated")
	manifest    = flag.String("manifest", "", "sources manifest (.MF)")
	servingPath = flag.String("serving_path", "/_/ts_scripts.js", "path to serve the combined sources at")
)

func main() {
	flag.Parse()

	if *base == "" || len(*pkgs) == 0 || (*manifest == "") {
		fmt.Fprintf(os.Stderr, "Required argument not set\n")
		os.Exit(1)
	}

	if _, err := os.Stat(*base); err != nil {
		fmt.Fprintf(os.Stderr, "Cannot read server base %s: %v\n", *base, err)
		os.Exit(1)
	}

	scripts := []string{RequireJs, "", ""}

	livereloadUrl := os.Getenv("IBAZEL_LIVERELOAD_URL")
	re := regexp.MustCompile("^([a-zA-Z0-9]+)\\:\\/\\/([[a-zA-Z0-9\\.]+)\\:([0-9]+)")
	match := re.FindStringSubmatch(livereloadUrl)
	if match != nil && len(match) == 4 {
		port, err := strconv.ParseUint(match[3], 10, 16)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Cannot determine livereload port from IBAZEL_LIVERELOAD_URL")
		} else {
			livereloadScheme := match[1]
			livereloadHost := match[2]
			livereloadPort := uint16(port)
			fmt.Printf("Serving live reload script for port %d\n", livereloadPort)
			scripts[1] = fmt.Sprintf("\nwindow.LiveReloadOptions = { https: \"%s\" === \"https\", host: \"%s\", port: %d };\n", livereloadScheme, livereloadHost, livereloadPort)
			scripts[2] = LivereloadJs;
		}
	}

	http.Handle(*servingPath, concatjs.ServeConcatenatedJS(*manifest, *base, scripts, nil /* realFileSystem */))
	pkgList := strings.Split(*pkgs, ",")
	http.HandleFunc("/", devserver.CreateFileHandler(*servingPath, *manifest, pkgList, *base))

	h, err := os.Hostname()
	if err != nil {
		h = "localhost"
	}

	fmt.Printf("Server listening on http://%s:%d/\n", h, *port)
	fmt.Fprintln(os.Stderr, http.ListenAndServe(fmt.Sprintf(":%d", *port), nil).Error())
	os.Exit(1)
}
