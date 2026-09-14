using RawDataWorkSheet.Models.References;

namespace RawDataWorkSheet.Repositories
{
    public interface IColumnRepository
    {
        Task AddAsync(ColumnMaster request);
        Task DeleteAsync(string columnCode);
        Task<IEnumerable<ColumnMaster>> GetAllAsync();
        Task UpdateAsync(ColumnMaster request);
    }
}