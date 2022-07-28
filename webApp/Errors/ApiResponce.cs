using System;

namespace webApp.Errors
{
    public class ApiResponce
    {
        public ApiResponce(int statusCode, string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDeafultMessageForStatusCode(statusCode);
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }

        private string GetDeafultMessageForStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "A Bad Request You Had Made",
                401 => "You are not authorised",
                404 => "Resource was not found",
                500 => "Errors sre the path to dark side, errors lead to the agner.",
                _ => null,
            };
        }
    }
}
