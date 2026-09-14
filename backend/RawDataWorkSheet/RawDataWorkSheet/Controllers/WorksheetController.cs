using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RawDataWorkSheet.Models;
using RawDataWorkSheet.Models.DTOs;
using RawDataWorkSheet.Models.Requests;
using RawDataWorkSheet.Services;

namespace RawDataWorkSheet.Controllers
{
    [ApiController]
    [Route("api/worksheets")]
    public class WorksheetController : ControllerBase
    {
        private readonly IWorksheetService _worksheetService;
        private readonly IUserService _userService;

        public WorksheetController(IWorksheetService worksheetService, IUserService userService)
        {
            _worksheetService = worksheetService;
            _userService = userService;
        }

        [HttpGet("analysts")]
        [Authorize(Policy = "ExcludeQARevertOnly")]
        public async Task<IActionResult> GetAnalysts()
        {
            try
            {
                var analysts = await _userService.GetAnalystsAsync();
                return Ok(analysts);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost]
        [Authorize(Policy = "ExcludeQARevertOnly")]
        public async Task<IActionResult> CreateWorksheet([FromBody] SaveWorksheetRequest request)
        {
            try
            {
                var worksheetId = await _worksheetService.CreateWorksheetAsync(request);
                return CreatedAtAction(nameof(GetWorksheetById), new { worksheetId }, new { worksheetId });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("parameters/{worksheetId}")]
        [Authorize(Policy = "ExcludeQARevertOnly")]
        public async Task<IActionResult> AddParameter(string worksheetId, [FromBody] ParameterDto request)
        {
            try
            {
                var id = await _worksheetService.AddParameterAsync(worksheetId, request);
                return Ok(new { ParameterId = id });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{worksheetId}")]
        [Authorize(Policy = "ExcludeQARevertOnly")]
        public async Task<IActionResult> UpdateWorksheet(string worksheetId, [FromBody] SaveWorksheetRequest request)
        {
            try
            {
                request.WorksheetId = worksheetId;
                var id = await _worksheetService.UpdateWorksheetAsync(request);
                return Ok(new { worksheetId = id });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPatch("{worksheetId}/revert-approval")]
        [Authorize(Policy = "QARevertOnlyAccess")]
        public async Task<IActionResult> RevertApproval(string worksheetId)
        {
            try
            {
                await _worksheetService.RevertApprovalAsync(worksheetId);
                return Ok(new { worksheetId, status = "Submitted For QA Review" });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("parameters/{parameterId}")]
        [Authorize(Policy = "ExcludeQARevertOnly")]
        public async Task<IActionResult> UpdateParameter(int parameterId, [FromBody] ParameterDto request)
        {
            try
            {
                request.Id = parameterId;
                var id = await _worksheetService.UpdateParameterAsync(parameterId, request);
                return Ok(new { ParameterId = id });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{worksheetId}")]
        [Authorize(Policy = "ExcludeQARevertOnly")]
        public async Task<IActionResult> DeleteWorksheet(string worksheetId)
        {
            try
            {
                await _worksheetService.DeleteWorksheetAsync(worksheetId);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpDelete("parameters/{parameterId}")]
        [Authorize(Policy = "ExcludeQARevertOnly")]
        public async Task<IActionResult> DeleteParameter(int parameterId)
        {
            try
            {
                await _worksheetService.DeleteParameterAsync(parameterId);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpPost("get/{worksheetId}")]
        [Authorize]
        public async Task<IActionResult> GetWorksheetById(string worksheetId, [FromBody] FetchWorksheetsRequest request)
        {
            try
            {
                return Ok(await _worksheetService.GetWorksheetByIdAsync(worksheetId, request));
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpPost("get-all")]
        [Authorize]
        public async Task<IActionResult> GetAllWorksheets([FromBody] FetchWorksheetsRequest request)
        {
            return Ok(await _worksheetService.GetAllWorksheetsAsync(request));
        }

    }
}