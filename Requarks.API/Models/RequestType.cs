
namespace Requarks.API.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class RequestType
    {
        public int RequestTypeId { get; set; }
        public string RequestTypeName { get; set; }
        public string RequestTypeDescription { get; set; }
        public int RequestTypeSortIndex { get; set; }
        public string RequestTypeColor { get; set; }
        public bool RequestTypeIsDefault { get; set; }
    
        public virtual Category RequestTypeCategory { get; set; }
    }
}
