FROM microsoft/aspnetcore:2.0
ARG source
WORKDIR /app
EXPOSE 80
COPY ${source:-obj/Docker/publish} .

RUN apt-get update
RUN apt-get install gnupg2 -y
RUN curl --silent --location https://deb.nodesource.com/setup_6.x | bash -

RUN apt-get install nodejs -y
RUN npm install
ENTRYPOINT ["dotnet", "angular-spa.dll"]
