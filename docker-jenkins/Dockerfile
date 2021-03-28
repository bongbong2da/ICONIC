FROM jenkins/jenkins:lts

USER root

RUN apt-get update
RUN apt install git
RUN apt install python3-pip -y
RUN pip3 install awscli