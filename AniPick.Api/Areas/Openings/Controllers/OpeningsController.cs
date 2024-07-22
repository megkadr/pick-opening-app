using AniPick.Api.Areas.Openings.Models;
using AniPick.Api.Areas.Openings.Services;
using AniPick.Api.Database.Models;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace AniPick.Api.Areas.Openings.Controllers;

[ApiController]
[Route("[controller]/")]
[SwaggerResponse(401)]
public class OpeningsController(IOpeningsService openingsService) : ControllerBase
{
    [HttpGet("openings")]
    [SwaggerResponse(200, Type = typeof(List<Opening>))]
    [SwaggerResponse(400, Type = typeof(ProblemDetails), Description = "Request is invalid. Check response for details.", ContentTypes = ["application/json"])]
    [SwaggerResponse(500, Type = typeof(ProblemDetails), Description = "An error occurred while retrieving openings. Check response for details.", ContentTypes = ["application/json"])]
    public async Task<ActionResult<List<Opening>>> GetOpenings(int year)
    {
        var openings = await openingsService.GetRandomOpeningsByYear(year);
        return Ok(openings);
    }
    
    [HttpPost("opening")]
    [SwaggerResponse(201, Type = typeof(Opening))]
    [SwaggerResponse(400, Type = typeof(ProblemDetails), Description = "Request is invalid. Check response for details.", ContentTypes = ["application/json"])]
    [SwaggerResponse(500, Type = typeof(ProblemDetails), Description = "An error occurred while adding opening. Check response for details.", ContentTypes = ["application/json"])]
    public async Task<ActionResult<OpeningModel>> AddOpening([FromBody] OpeningModel model)
    {
        var (opening, error) = await openingsService.AddOpening(model);

        if (error != null)
        {
            return StatusCode(500, new ProblemDetails { Title = "Error adding opening", Detail = error.Message });
        }

        return CreatedAtAction(nameof(AddOpening), opening);
    }
}