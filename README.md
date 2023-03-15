# VUMS
Video Uploading Micro Service implemented in Express.js

## Purpose
To upload videos to a remote directory and archive its metadata

# Environment Variables Template
- PORT=
- DB_URL=

## Notes
- A folder called `uploads/` must be in the root directory for the app to function 

### Guard clauses with Express responses
Function execution does not stop once a response is sent with Express.
To create guard clauses that stop execution once a response is sent, use `return res.send()`.
See the solution by Marcos Pereira on Stack Overflow [here](https://stackoverflow.com/a/25038317).
