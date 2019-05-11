using System;
using System.Collections.Generic;
using System.Linq;
using Advantage.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Advantage.API.Controllers
{
    [ApiController]
    public class ApiController : ControllerBase
    {
        private ApiContext _context;

        public ApiController(ApiContext context)
        {
            _context = context;
        }


        [HttpGet("/orders")]
        public IEnumerable<Order> GetOrders()
        {
            return _context.Orders
            .OrderBy(o => o.Id)
            .Include(c => c.Customer)
            .Include(o => o.Product)
            .ToList();
        }

        [HttpGet("/customer")]
        public IEnumerable<object> GetOrdersByCustomer()
        {
            return _context
            .Orders
            .Include(o => o.Customer)
            .GroupBy(o => o.Customer)
            .Select(o => new { Customer = o.Key, OrderCount = o.Sum(t => t.Id) })
            .Take(5).ToList();
        }

        [HttpGet("/servers")]
        public IEnumerable<Server> GetServers()
        {
            return _context.Servers.ToList();
        }

        [HttpPost("/change")]
        public bool ChangeServerStatus([FromBody]Server serverParam)
        {
            try
            {
                var server = _context.Servers.FirstOrDefault(s => s.Id == serverParam.Id);
                server.IsOnline = !server.IsOnline;
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                return false;
            }
            return true;
        }

        [HttpGet("/monthly")]
        public IEnumerable<object> MonthlySalesByProduct()
        {
            var monthlySalesByProduct = _context.Orders
            .Include(o => o.Product)
           .GroupBy(o => new { o.Product.Id, o.Placed.Month })
           .Select(o => new { ProductId = o.Key.Id, SaleCount = o.Sum(p => p.Total), Month = o.Key.Month })
           .OrderBy(o => o.Month).ToList();

            return monthlySalesByProduct
            .Select(m => new
            {
                label = _context.Products.FirstOrDefault(p => p.Id == m.ProductId).Name,
                data = monthlySalesByProduct.Where(s => s.ProductId == m.ProductId).Select(s => s.SaleCount).ToArray()
            })
            .ToList();
        }
    }
}