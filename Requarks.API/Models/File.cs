
namespace Requarks.API.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class File
    {
        public int FileId { get; set; }
        public int FileRequestId { get; set; }
        public int FileAuthorId { get; set; }
    
        public virtual Request FileRequest { get; set; }
        public virtual User FileAuthor { get; set; }
    }
}
