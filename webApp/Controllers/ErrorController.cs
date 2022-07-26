﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webApp.Errors;

namespace webApp.Controllers
{
    [Route("errors/{code}")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ErrorController : BaseApiController
    {
        //[HttpGet]
        public IActionResult Error(int code)
        {
            return new ObjectResult(new ApiResponce(code));
        }
    }
}
