// file: RawDataWorkSheet/Services/CalculationTemplateService.cs

using RawDataWorkSheet.Repositories;

namespace RawDataWorkSheet.Services
{
    public interface ICalculationTemplateService
    {
        Task<List<CalculationTemplateDto>> GetAllAsync();
    }

    public class CalculationTemplateService : ICalculationTemplateService
    {
        private readonly ICalculationTemplateRepository _repository;

        public CalculationTemplateService(ICalculationTemplateRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<CalculationTemplateDto>> GetAllAsync()
        {
            return await _repository.GetActiveTemplatesAsync();
        }
    }
}