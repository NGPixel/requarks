
namespace Requarks.API.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Request
    {
        public Request()
        {
            this.RequestComments = new HashSet<Comment>();
            this.RequestFiles = new HashSet<File>();
            this.RequestActivities = new HashSet<Activity>();
            this.RequestDescriptions = new HashSet<Description>();
            this.RequestProperties = new HashSet<RequestProperty>();
            this.RequestSprints = new HashSet<Sprint>();
            this.RequestStakeholders = new HashSet<User>();
        }
    
        public int RequestId { get; set; }
        public string RequestTitle { get; set; }
        public DateTime RequestCreatedOn { get; set; }
        public DateTime RequestUpdatedOn { get; set; }
    
        public virtual RequestType RequestType { get; set; }
        public virtual RequestStatus RequestStatus { get; set; }
        public virtual ICollection<Comment> RequestComments { get; set; }
        public virtual User RequestAuthor { get; set; }
        public virtual ICollection<File> RequestFiles { get; set; }
        public virtual Category RequestCategory { get; set; }
        public virtual ICollection<Activity> RequestActivities { get; set; }
        public virtual ICollection<Description> RequestDescriptions { get; set; }
        public virtual ICollection<RequestProperty> RequestProperties { get; set; }
        public virtual Team RequestAssignedTeam { get; set; }
        public virtual User RequestAssignedUser { get; set; }
        public virtual ICollection<Sprint> RequestSprints { get; set; }
        public virtual ICollection<User> RequestStakeholders { get; set; }
        public virtual RequestPriority RequestPriority { get; set; }
    }
}
