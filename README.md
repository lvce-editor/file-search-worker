# File Search Worker

Web worker for file search in LVCE Editor.

This repository now contains only the file-search worker and its backend routing for:

- ripgrep-backed file search
- fetch/web-backed file search
- HTML-backed file search
- in-memory file search

Quick pick UI logic, rendering, DOM event handling, and non-file picker flows were moved out to a separate repository.

## Contributing

```sh
git clone git@github.com:lvce-editor/file-search-worker.git &&
cd file-search-worker &&
npm ci &&
npm test
```
