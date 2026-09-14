// file: RawDataWorkSheet/Repositories/CalculationTemplateRepository.cs

using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;

namespace RawDataWorkSheet.Repositories
{
    public class CalculationTemplateDto
    {
        public int Id { get; set; }
        public string TemplateId { get; set; } = "";
        public string TemplateName { get; set; } = "";
        public int Version { get; set; }
        public string RecipeJson { get; set; } = "";
        public bool IsActive { get; set; }
    }

    public interface ICalculationTemplateRepository
    {
        Task<List<CalculationTemplateDto>> GetActiveTemplatesAsync();
    }

    public class CalculationTemplateRepository : ICalculationTemplateRepository
    {
        private readonly string _connectionString;

        public CalculationTemplateRepository(IConfiguration configuration)
        {
            _connectionString = configuration["Connnectionstrings:Connection2"]
                ?? throw new InvalidOperationException(
                    "Missing configuration value for 'Connnectionstrings:Connection2'.");
        }

        private IDbConnection CreateConnection()
        {
            return new SqlConnection(_connectionString);
        }

        public async Task<List<CalculationTemplateDto>> GetActiveTemplatesAsync()
        {
            const string query = """
                SELECT
                    id            AS Id,
                    template_id   AS TemplateId,
                    template_name AS TemplateName,
                    version       AS Version,
                    recipe_json   AS RecipeJson,
                    is_active     AS IsActive
                FROM worksheet_calculation_templates
                WHERE is_active = 1
                """;

            using IDbConnection connection = CreateConnection();
            var results = await connection.QueryAsync<CalculationTemplateDto>(query);
            return results.ToList();
        }
    }
}