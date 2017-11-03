using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace angular_spa.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class SettingsController : Controller
    {
        public IActionResult Index()
        {
            return Json(new
            {
                OcidClient = new {
                    authority = Environment.GetEnvironmentVariable("IDENTITY_AUTHORITY"),
                    client_id = "angular_spa",
                    redirect_uri = $"{Environment.GetEnvironmentVariable("ANGULAR_SPA")}/auth-callback",
                    post_logout_redirect_uri = Environment.GetEnvironmentVariable("ANGULAR_SPA"),
                    response_type = "id_token token",
                    scope = "openid profile api1",
                    filterProtocolClaims = true,
                    loadUserInfo = true
                },
                Api = new
                {
                    Url = Environment.GetEnvironmentVariable("WEBAPI")
                }
            });
        }
    }
}