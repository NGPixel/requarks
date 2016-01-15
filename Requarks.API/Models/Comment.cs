
namespace Requarks.API.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Comment
    {
        public int CommentId { get; set; }
        public string CommentContent { get; set; }
        public DateTime CommentCreatedOn { get; set; }
    
        public virtual Request CommentRequest { get; set; }
        public virtual User CommentAuthor { get; set; }
    }
}
