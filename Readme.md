# System Requirements:
1. NodeJS version >12.18
2. Docker installed

# Steps to run the test
1. Clone the project to the local using `git clone {clone url}`.
2. Navigate to the cloned project root folder
3. Perform `npm install` to ger all the dependencies. This is one time step.
4. Two options to run the test.
    1. using `npm test` command would run the test using `dev-tools` protocal on puppeter.
    2. using `npm test wdio.conf-docker.js` command which picks the `wdio.conf-docker.js` would run the test on `selenium/standalone-chrome` docker image. NOTE: First time execution would take time to download the image.