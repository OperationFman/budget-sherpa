FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env

COPY *.csproj ./api
RUN dotnet restore

COPY . ./api

RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:7.0

EXPOSE 5165
WORKDIR /api
COPY --from=build-env /api/out .

ENTRYPOINT ["dotnet", "run", "api.dll"]