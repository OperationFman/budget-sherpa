FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env

COPY *.csproj ./
RUN dotnet restore

COPY . ./

RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet:7.0

EXPOSE 5165
COPY --from=build-env /api/out .

ENTRYPOINT ["dotnet", "run", "api.dll"]