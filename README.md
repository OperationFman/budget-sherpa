### Database Temp Migration Steps

Ensure navigated to `/api`

- `export PATH="$PATH:$HOME/.dotnet/tools/"`
- `dotnet ef migrations add "initial_migrations"`
- `dotnet ef database update``
