
namespace Requarks.API.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Project
    {
        public Project()
        {
            this.ProjectSprints = new HashSet<Sprint>();
            this.ProjectTeams = new HashSet<Team>();
        }
    
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public string ProjectDescription { get; set; }
        public bool ProjectIsActive { get; set; }
    
        public virtual ICollection<Sprint> ProjectSprints { get; set; }
        public virtual ICollection<Team> ProjectTeams { get; set; }
    }
}
