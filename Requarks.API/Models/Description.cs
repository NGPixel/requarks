
namespace Requarks.API.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Description
    {
        public int DescriptionId { get; set; }
        public int DescriptionRequestId { get; set; }
        public string DescriptionContent { get; set; }
        public DateTime DescriptionCreatedOn { get; set; }
        public int DescriptionAuthorId { get; set; }
    
        public virtual Request DescriptionRequest { get; set; }
        public virtual User DescriptionAuthor { get; set; }
    }
}
