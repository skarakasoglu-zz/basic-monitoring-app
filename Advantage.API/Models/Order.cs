using System;

namespace Advantage.API.Models 
{
    public class Order 
    {
        public int Id { get; set; }
        public virtual Customer Customer { get; set; }
        public virtual Product Product { get; set; }
        public decimal Total { get; set; }
        public DateTime Placed { get; set; }
        public DateTime? Completed { get; set; }
    }
}