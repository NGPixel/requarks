
namespace Requarks.API.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class PropertyDefinition
    {
        public int PropertyDefinitionId { get; set; }
        public string PropertyDefinitionKey { get; set; }
        public string PropertyDefinitionName { get; set; }
        public string PropertyDefinitionType { get; set; }
        public string PropertyDefinitionDescription { get; set; }
        public string PropertyDefinitionIcon { get; set; }
    }
}
