FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["NotesApi.csproj", "."]
RUN dotnet restore "NotesApi.csproj"
COPY . .
WORKDIR "/src"
RUN dotnet build "NotesApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "NotesApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "NotesApi.dll"]