FROM ubi8/nodejs-16

USER root
COPY . /tmp/src
RUN yum update -y && \
    yum install -y python39 gcc-c++ make
RUN alternatives --set python /usr/bin/python3
RUN chown -R 1001:0 /tmp/src
USER 1001
RUN /usr/libexec/s2i/assemble
EXPOSE 1880
EXPOSE 8080
CMD /usr/libexec/s2i/run
