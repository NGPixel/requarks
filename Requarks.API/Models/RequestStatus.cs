
namespace Requarks.API.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class RequestStatus
    {
        public int RequestStatusId { get; set; }
        public string RequestStatusName { get; set; }
        public int RequestStatusSortIndex { get; set; }
        public string RequestStatusColor { get; set; }
        public bool RequestStatusClosed { get; set; }

        public virtual Category RequestStatusCategory { get; set; }
    }
}
