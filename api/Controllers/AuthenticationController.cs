using Microsoft.AspNetCore.Mvc;
using Microsoft.FeatureManagement;

namespace Authentication.Controller
{

    [Route("api/v1/auth")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {

        [HttpGet]
        public async Task<IActionResult> GetAuth(IFeatureManager manager)
        {

            if (!await manager.IsEnabledAsync("authentication"))
            {
                return StatusCode(StatusCodes.Status403Forbidden, "Feature flag disabled");
            }

            return Ok("Feature flag allowing");
        }
    }
}
