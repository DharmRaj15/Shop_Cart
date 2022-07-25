using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Infrastructure.Data;
using Core.Interfaces;
using Core.Specifications;

namespace webApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IGenericRepository<ProductBrand> _productBrandRepo;
        private readonly IGenericRepository<ProductType> _productTypeRepo;
        public ProductsController(IGenericRepository<Product> productRepo, IGenericRepository<ProductBrand> productBrandRepo,
            IGenericRepository<ProductType> productTypeRepo)
        {
            _productBrandRepo = productBrandRepo;
            _productTypeRepo = productTypeRepo;
            _productRepo = productRepo;
        }

        [HttpGet]
        //public ActionResult<List<Product>> GetProducts()
        //{
        //    var products = _context.Products.ToList();
        //    return Ok(products);
        //}
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            //new spec
            var spec = new ProductWithTypesAndBrandSpecification();

            var products = await _productRepo.ListAsync(spec);
            return Ok(products);
        }

        [HttpGet("Id")]
        public async Task<ActionResult<Product>> GetProducts(int Id)
        {
            var spec = new ProductWithTypesAndBrandSpecification(Id);

            return await _productRepo.GetEntityWithSpec(spec);
        }

        //added later..
        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            return Ok(await _productBrandRepo.ListAllAsync());
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            return Ok(await _productTypeRepo.ListAllAsync());
        }

    }
}
