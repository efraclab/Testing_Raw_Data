using RawDataWorkSheet.Models.References;
using RawDataWorkSheet.Repositories;

namespace RawDataWorkSheet.Services
{
    public class ColumnService : IColumnService
    {
        private readonly IColumnRepository _repo;

        public ColumnService(IColumnRepository repo)
        {
            _repo = repo;
        }

        public Task<IEnumerable<ColumnMaster>> GetAllAsync()
            => _repo.GetAllAsync();

        public Task AddAsync(ColumnMaster request)
            => _repo.AddAsync(request);

        public Task UpdateAsync(ColumnMaster request)
            => _repo.UpdateAsync(request);

        public Task DeleteAsync(string columnCode)
            => _repo.DeleteAsync(columnCode);
    }

}