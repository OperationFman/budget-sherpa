FROM mcr.microsoft.com/dotnet/sdk:7.0

COPY . /app

WORKDIR /app

RUN dotnet restore

EXPOSE 5165

CMD ["dotnet", "run"]