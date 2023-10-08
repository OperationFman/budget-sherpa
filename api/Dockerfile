FROM mcr.microsoft.com/dotnet/runtime:7.0

COPY . /api

RUN dotnet restore

ENTRYPOINT ["dotnet", "run"]