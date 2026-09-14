// file: RawDataWorkSheet/Controllers/CalculationTemplatesController.cs

using Microsoft.AspNetCore.Mvc;
using RawDataWorkSheet.Services;

namespace RawDataWorkSheet.Controllers
{
    [ApiController]
    [Route("api/calculation-templates")]
    public class CalculationTemplatesController : ControllerBase
    {
        private readonly ICalculationTemplateService _service;

        public CalculationTemplatesController(ICalculationTemplateService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _service.GetAllAsync());
    }
}