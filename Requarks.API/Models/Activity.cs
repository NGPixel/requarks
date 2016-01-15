
namespace Requarks.API.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Activity
    {
        public int ActivityId { get; set; }
        public DateTime ActivityCreatedOn { get; set; }
    
        public virtual Request ActivityRequest { get; set; }
        public virtual User ActivityAuthor { get; set; }
    }
}
