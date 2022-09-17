FROM windows10:latest

# install nodejs, npm, git, python
RUN choco install -y nodejs.install git python2
