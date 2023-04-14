# VUMS
Video Uploading Micro Service implemented in Express.js

## Purpose
Simplifying of main branch code to work with decoupled video file uploading and metadata uploading.
Users should be able to upload files, and then add metadata in the future if they want to publish it.
Otherwise, they can simply leave the file uploaded and it will remain in their personal archive.

## Features
- Upload files with MP4 mimetype
- Create and store metadata about the file

## Metadata
- Title
- Description
- Tags
- Rating
- Views
- Latest update

## Issues
- Title, description and tags can be of any length
- Anyone can submit any file as long as the extension is modified
- No user system

# Environment Variables Template
- PORT=
- DB_URL=
- CONTENT_DIRECTORY=
- MAX_FILE_SIZE=
- CLIENT_ORIGIN=

## Notes
- ERROR: file gets saved before fields are analyzed. If any issue with fields are detected, file will remain on server.
- A folder called `uploads/` must be in the root directory for the app to function 

### Guard clauses with Express responses
Function execution does not stop once a response is sent with Express.
To create guard clauses that stop execution once a response is sent, use `return res.send()`.
See the solution by Marcos Pereira on Stack Overflow [here](https://stackoverflow.com/a/25038317).
