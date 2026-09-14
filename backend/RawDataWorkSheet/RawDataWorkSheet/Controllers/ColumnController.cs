using Microsoft.AspNetCore.Mvc;
using RawDataWorkSheet.Models.References;
using RawDataWorkSheet.Services;

namespace RawDataWorkSheet.Controllers
{
    [ApiController]
    [Route("api/columns")]
    public class ColumnController : ControllerBase
    {
        private readonly IColumnService _service;

        public ColumnController(IColumnService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _service.GetAllAsync());

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] ColumnMaster request)
        {
            await _service.AddAsync(request);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] ColumnMaster request)
        {
            await _service.UpdateAsync(request);
            return Ok();
        }

        [HttpDelete("{columnCode}")]
        public async Task<IActionResult> Delete(string columnCode)
        {
            await _service.DeleteAsync(columnCode);
            return NoContent();
        }
    }
}