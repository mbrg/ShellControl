FROM alexellisio/msbuild:12.0
SHELL ["powershell"]

COPY ../ 'C:\\build\\'
WORKDIR 'C:\\build\\component\\Solutions'

RUN ["nuget.exe", "restore"]
RUN ["C:\\Program Files (x86)\\MSBuild\\12.0\\Bin\\msbuild.exe", "/t:build"]

## Usage: build image, then create container and copy out the bin directory.

CMD ["powershell"]