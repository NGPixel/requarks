
namespace Requarks.API.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class RequestProperty
    {
        public int RequestPropertyId { get; set; }
        public string RequestPropertyValue { get; set; }
    
        public virtual Request RequestPropertyRequest { get; set; }
        public virtual PropertyDefinition RequestPropertyDefinition { get; set; }
    }
}
