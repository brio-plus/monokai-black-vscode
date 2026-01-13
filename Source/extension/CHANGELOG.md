# Monokai Black for Visual Studio Code - Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2025-01-13

### Added

- Syntax highlighting for code blocks in markdown preview using Shiki
- Custom CSS styling for markdown preview code blocks (black background, gray border)
- TypeScript build system with esbuild bundling
- CI/CD workflows for automated builds and publishing
  - `ci.yml`: Builds and packages VSIX on push to `dev` and feature branches
  - `publish.yml`: Auto-publishes to VS Code Marketplace on version bump in `main`

### Changed

- Terminal background color changed from `#363537` to `#000000` for true black
- Updated extension description to reflect new markdown preview features
- Updated keywords to include "markdown preview" and "monokai"
- Updated repository URLs to GitHub

### Removed

- Icon theme (focusing on color theme and markdown preview functionality only)

## [1.0.3] - 2023-XX-XX

### Added

- Demo images for Python and TypeScript

## [1.0.2] - 2023-XX-XX

### Changed

- Semantic highlighting improvements

## [1.0.1] - 2023-XX-XX

### Fixed

- Sidebar font color set to white

## [1.0.0] - 2023-07-12

### Added

- Initial release
- Monokai Black color theme with true black editor background
- Icon theme (removed in 1.1.0)
- Semantic highlighting support
