using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer4.Models;
using Microsoft.Extensions.Configuration;

namespace identityserver
{
    public class Config
    {
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("api1", "My API")
            };
        }

        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile()
            };
        }

        public static IEnumerable<Client> GetClients(IConfigurationRoot configuration)
        {
            var clients =  new List<Client>
            {
                new Client
                {
                    ClientId = "angular_spa",
                    ClientName = "Angular 4 Client",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    RedirectUris = new List<string> { $"{configuration["ANGULAR_SPA"]}/auth-callback" },
                    PostLogoutRedirectUris = new List<string> { $"{configuration["ANGULAR_SPA"]}/" },
                    AllowedCorsOrigins = new List<string> { configuration["ANGULAR_SPA"], configuration["WEBAPI"] },
                    AllowAccessTokensViaBrowser = true,
                    AllowedScopes = new List<string> { "openid", "profile", "api1" },
                    RequireConsent = false
                }
            };
            return clients;
        }
    }
}
