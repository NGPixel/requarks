
namespace Requarks.API.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Category
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string CategoryDescription { get; set; }
        public string CategoryColor { get; set; }
        public string CategoryIcon { get; set; }
    }
}
