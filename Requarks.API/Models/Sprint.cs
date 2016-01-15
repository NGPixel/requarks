
namespace Requarks.API.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Sprint
    {
        public Sprint()
        {
            this.SprintRequests = new HashSet<Request>();
        }
    
        public int SprintId { get; set; }
        public int SprintIteration { get; set; }
        public DateTime SprintStartsOn { get; set; }
        public DateTime SprintEndsOn { get; set; }
    
        public virtual Project SprintProject { get; set; }
        public virtual ICollection<Request> SprintRequests { get; set; }
    }
}
