using RawDataWorkSheet.Models.References;

namespace RawDataWorkSheet.Services
{
    public interface IColumnService
    {
        Task AddAsync(ColumnMaster request);
        Task DeleteAsync(string columnCode);
        Task<IEnumerable<ColumnMaster>> GetAllAsync();
        Task UpdateAsync(ColumnMaster request);
    }
}