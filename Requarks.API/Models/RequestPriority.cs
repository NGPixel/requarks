
namespace Requarks.API.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class RequestPriority
    {
        public int RequestPriorityId { get; set; }
        public string RequestPriorityName { get; set; }
        public int RequestPrioritySortIndex { get; set; }
        public string RequestPriorityColor { get; set; }

        public virtual Category RequestPriorityCategory { get; set; }
    }
}
