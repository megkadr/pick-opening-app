using AniPick.Api.Areas.Users.Services;
using AniPick.Api.Database.Models;
using Microsoft.AspNetCore.Mvc;

namespace AniPick.Api.Areas.Users.Controllers;

[ApiController]
[Route("[controller]/")]
public class UsersController(IUsersService usersService) : ControllerBase
{
    /// <summary>
    /// Add a new user
    /// </summary>
    /// <param name="model">User model</param>
    /// <returns>Created user</returns>
    /// <response code="201">User created</response>
    /// <response code="400">Invalid user data</response>
    [HttpPost("User")]
    [ProducesResponseType(typeof(User), 201)]
    [ProducesResponseType(typeof(string), 400)]
    public async Task<IActionResult> AddUser([FromBody] User model)
    {
        var (user, error) = await usersService.AddUser(model);

        if (error != null)
        {
            return BadRequest("Invalid user data");
        }

        return CreatedAtAction(nameof(AddUser), user);
    }

    /// <summary>
    /// Verify user credentials
    /// </summary>
    /// <param name="login">User login (email)</param>
    /// <param name="password">User password</param>
    /// <returns>Authentication status and user data</returns>
    /// <response code="200">User authenticated</response>
    /// <response code="401">Invalid credentials</response>
    [HttpGet("Verify")]
    [ProducesResponseType(typeof(bool), 200)]
    [ProducesResponseType(typeof(string), 401)]
    public async Task<IActionResult> VerifyUser([FromQuery] string login, [FromQuery] string password)
    {
        var (isAuthenticated, user, error) = await usersService.VerifyUser(login, password);

        if (error != null)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }

        if (isAuthenticated)
        {
            return Ok(user);
        }
        
        return Unauthorized("Invalid credentials");
    }
    
    /// <summary>
    /// Add a new opening chosen by a user
    /// </summary>
    /// <param name="model">UserOpenings model</param>
    /// <returns>Created UserOpenings</returns>
    /// <response code="201">UserOpenings created</response>
    /// <response code="400">Invalid UserOpenings data</response>
    [HttpPost("Opening")]
    [ProducesResponseType(typeof(UserOpenings), 201)]
    [ProducesResponseType(typeof(string), 400)]
    public async Task<IActionResult> AddChosenByUserOpening([FromBody] UserOpenings model)
    {
        var (userOpenings, error) = await usersService.AddChosenByUserOpening(model);

        if (error != null)
        {
            return BadRequest("Invalid UserOpenings data");
        }

        return CreatedAtAction(nameof(AddChosenByUserOpening), userOpenings);
    }
}