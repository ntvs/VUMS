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
- filename
- mimetype
- filesize

# Environment Variables Template
- PORT=
- DB_URL=
- CONTENT_DIRECTORY=
- MAX_FILE_SIZE=
- CLIENT_ORIGIN=

## Notes
- A folder called `uploads/` must be in the root directory for the app to function 

### Guard clauses with Express responses
Function execution does not stop once a response is sent with Express.
To create guard clauses that stop execution once a response is sent, use `return res.send()`.
See the solution by Marcos Pereira on Stack Overflow [here](https://stackoverflow.com/a/25038317).


### Multer request cancellation file issue
When a request is cancelled or terminated while a file is uploading, the part of the file which was already uploaded will remain on the server.
This solution from Nikitas IO resolves that issue and the residual file is gets deleted.
The solution can be found on Stack Overflow [here](https://stackoverflow.com/a/64849651).
