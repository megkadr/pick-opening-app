using System.Net;
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
    [HttpPost("user/register")]
    [ProducesResponseType(typeof(User), 201)]
    [ProducesResponseType(typeof(string), 400)]
    public async Task<IActionResult> Register([FromBody] User model)
    {
        var (user, error) = await usersService.AddUser(model);

        if (error != null)
        {
            return BadRequest("Invalid user data");
        }

        return CreatedAtAction(nameof(Register), user);
    }

    /// <summary>
    /// Verify user credentials
    /// </summary>
    /// <param name="login">User login (email)</param>
    /// <param name="password">User password</param>
    /// <returns>Authentication status and user data</returns>
    /// <response code="200">User authenticated</response>
    /// <response code="401">Invalid credentials</response>
    [HttpGet("login")]
    [ProducesResponseType(typeof(bool), 200)]
    [ProducesResponseType(typeof(string), 401)]
    public async Task<IActionResult> Login([FromQuery] string login, [FromQuery] string password)
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
    [HttpPost("opening")]
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
    
    /// <summary>
    /// Remove a user
    /// </summary>
    /// <param name="userId">User ID</param>
    /// <returns>Status of the operation</returns>
    /// <response code="200">User removed</response>
    /// <response code="404">User not found</response>
    /// <response code="500">Internal server error</response>
    [HttpDelete("user/{userId}")]
    [ProducesResponseType(typeof(string), 200)]
    [ProducesResponseType(typeof(string), 404)]
    [ProducesResponseType(typeof(string), 500)]
    public async Task<IActionResult> RemoveUser(int userId)
    {
        var (statusCode, error) = await usersService.RemoveUser(userId);

        if (error != null)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
        }

        if (statusCode == HttpStatusCode.NotFound)
        {
            return NotFound("User not found");
        }

        return Ok("User removed");
    }
    
    /// <summary>
    /// Change a user's password
    /// </summary>
    /// <param name="userId">User ID</param>
    /// <param name="newPassword">New password</param>
    /// <returns>Status of the operation</returns>
    /// <response code="200">Password changed</response>
    /// <response code="404">User not found</response>
    /// <response code="400">Invalid password</response>
    /// <response code="500">Internal server error</response>
    [HttpPut("user/password/{userId}")]
    [ProducesResponseType(typeof(string), 200)]
    [ProducesResponseType(typeof(string), 404)]
    [ProducesResponseType(typeof(string), 400)]
    [ProducesResponseType(typeof(string), 500)]
    public async Task<IActionResult> ChangePassword(int userId, [FromBody] string newPassword)
    {
        var (statusCode, error) = await usersService.ChangePassword(userId, newPassword);

        if (error == null) return Ok("Password changed");
        return error.Message switch
        {
            "User not found" => NotFound("User not found"),
            "Invalid password" => BadRequest("Invalid password"),
            _ => StatusCode(StatusCodes.Status500InternalServerError, "Internal server error")
        };
    }
}