using Dapper;
using Microsoft.Data.SqlClient;
using RawDataWorkSheet.Models.References;
using System.Data;

namespace RawDataWorkSheet.Repositories
{
    public class ColumnRepository : IColumnRepository
    {
        private readonly string _connectionString;

        public ColumnRepository(IConfiguration configuration)
        {
            _connectionString = configuration["Connnectionstrings:Connection2"];
        }

        private IDbConnection CreateConnection()
            => new SqlConnection(_connectionString);

        public async Task<IEnumerable<ColumnMaster>> GetAllAsync()
        {
            using var conn = CreateConnection();
            var result = await conn.QueryAsync<ColumnMaster>("SELECT * FROM COLUMNMASTER");
            var first = result.FirstOrDefault();
            return result;
        }
        public async Task AddAsync(ColumnMaster request)
        {
            const string sql = @"
                INSERT INTO COLUMNMASTER
                VALUES (@ColumnCode,@ColumnNameWithDimension,@Make)";
            using var conn = CreateConnection();
            await conn.ExecuteAsync(sql, request);
        }

        public async Task UpdateAsync(ColumnMaster request)
        {
            const string sql = @"
                UPDATE COLUMNMASTER SET
                    ColumnNameWithDimension=@ColumnNameWithDimension,
                    Make=@Make
                WHERE ColumnCode=@ColumnCode";
            using var conn = CreateConnection();
            await conn.ExecuteAsync(sql, request);
        }

        public async Task DeleteAsync(string columnCode)
        {
            using var conn = CreateConnection();
            await conn.ExecuteAsync(
                "DELETE FROM COLUMNMASTER WHERE ColumnCode=@ColumnCode",
                new { ColumnCode = columnCode });
        }
    }
}