using Microsoft.EntityFrameworkCore;
using Microsoft.FeatureManagement;


var builder = WebApplication.CreateBuilder(args);

var policyName = "allowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: policyName,
        builder =>
        {
            builder
            .WithOrigins("https://budget-sherpa-ui.onrender.com")
            .AllowAnyMethod()
            .AllowAnyOrigin()
            .AllowAnyHeader();
        });

});

builder.Services
    .AddFeatureManagement(builder.Configuration.GetSection("FeatureFlags"));

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApiDbContext>(
    options => options.UseSqlite(connectionString));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{

    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(policyName);

app.UseAuthorization();

app.MapControllers();

app.Run();
