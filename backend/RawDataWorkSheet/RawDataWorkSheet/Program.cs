using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using RawDataWorkSheet.Repositories;
using RawDataWorkSheet.Services;
using RawDataWorkSheet.Utils;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IRawDataRepository, RawDataRepository>();
builder.Services.AddScoped<IRawDataService, RawDataService>();
builder.Services.AddScoped<IWorksheetRepository, WorksheetRepository>();
builder.Services.AddScoped<IWorksheetService, WorksheetService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped <IFinalRawDataRepository, FinalRawDataRepository>();
builder.Services.AddScoped <IFinalRawDataService, FinalRawDataService>();
builder.Services.AddScoped <IChemicalRepository, ChemicalRepository>();
builder.Services.AddScoped <IStandardRepository, StandardRepository>();
builder.Services.AddScoped <IColumnRepository, ColumnRepository>();
builder.Services.AddScoped <IInstrumentRepository, InstrumentRepository>();
builder.Services.AddScoped <IMediaRepository, MediaRepository>();
builder.Services.AddScoped <ILogRepository, LogRepository>();
builder.Services.AddScoped <IChemicalService, ChemicalService>();
builder.Services.AddScoped <IInstrumentService, InstrumentService>();
builder.Services.AddScoped <IStandardService, StandardService>();
builder.Services.AddScoped <IColumnService, ColumnService>();
builder.Services.AddScoped <IMediaService, MediaService>();
builder.Services.AddScoped <ILogService, LogService>();
builder.Services.AddScoped<JwtService>();
builder.Services.AddScoped<ICalculationTemplateRepository, CalculationTemplateRepository>();
builder.Services.AddScoped<ICalculationTemplateService, CalculationTemplateService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
        options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
    });

var key = Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!);
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(key),
            // JwtService issues the role as a claim literally named "Role"
            // (not the standard ClaimTypes.Role). Without this, User.IsInRole(...)
            // and [Authorize(Roles = "...")] never match anything.
            RoleClaimType = "Role"
        };
    });

builder.Services.AddAuthorization(options =>
{
    // Only the QA-revert-only account (role = "admin") may hit the revert endpoint.
    options.AddPolicy("QARevertOnlyAccess", policy =>
        policy.RequireRole("admin"));

    // Every other Worksheet action: must be authenticated, and must NOT be
    // the QA-revert-only account. Deny-list (rather than allow-list) so
    // existing roles like "QA", "Reviewer", "Analyst" keep working untouched.
    options.AddPolicy("ExcludeQARevertOnly", policy =>
        policy.RequireAssertion(context =>
            context.User.Identity?.IsAuthenticated == true &&
            !context.User.IsInRole("admin")));
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");

//app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();