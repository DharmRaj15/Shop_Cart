﻿using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class ProductWithTypesAndBrandSpecification : BaseSpecification<Product>
    {
        public ProductWithTypesAndBrandSpecification(ProductSpecParams productParams) :
            base(x =>
            (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search)) &&
            (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId)
            && (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId)) //filter code
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
            AddOrderBy(x => x.Name);
            //paging
            ApplyPaging(productParams.PageSize * (productParams.PageIndex - 1), productParams.PageSize);

            //sort code
            if (!string.IsNullOrEmpty(productParams.Sort))
            {
                switch (productParams.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(p => p.Price);
                        break;

                    case "priceDesc":
                        AddOrderByDescending(p => p.Price);
                        break;

                    default:
                        AddOrderBy(n => n.Name);
                        break;
                }
            }
        }

        public ProductWithTypesAndBrandSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
        }
    }
}
