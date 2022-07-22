using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Infrastructure.Data;
using Core.Interfaces;

namespace webApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private IProductRepository _Repo;
        public ProductsController(IProductRepository Repo)
        {
           _Repo = Repo;
        }

        [HttpGet]
        //public ActionResult<List<Product>> GetProducts()
        //{
        //    var products = _context.Products.ToList();
        //    return Ok(products);
        //}
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await _Repo.GetProductsAsync();
            return Ok(products);
        }

        [HttpGet("Id")]
        public async Task<ActionResult<Product>> GetProducts(int Id)
        {
            return await _Repo.GetProductByIdAsync(Id);
        }
    }
}
