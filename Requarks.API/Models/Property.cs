namespace Requarks.API.Models
{
    using System;
    using System.Collections.Generic;

    public partial class Property
    {
        public int PropertyId { get; set; }
        public string PropertyConditions { get; set; }
        public bool PropertyIsRequired { get; set; }
        public bool PropertyIsActive { get; set; }
        public string PropertyFieldType { get; set; }
        public string PropertyFieldDataValues { get; set; }
        public string PropertyFieldDataDefault { get; set; }
        public string PropertyFieldValidation { get; set; }
        public string PropertyFieldPlaceholder { get; set; }
        public int PropertyFieldSortIndex { get; set; }

        public virtual PropertyDefinition PropertyDefinition { get; set; }
        public virtual Category PropertyCategory { get; set; }
    }
}
