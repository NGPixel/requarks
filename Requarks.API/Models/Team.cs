
namespace Requarks.API.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Team
    {

        public Team()
        {
            this.TeamMembers = new HashSet<User>();
            this.TeamProjects = new HashSet<Project>();
        }
    
        public int TeamId { get; set; }
        public string TeamName { get; set; }
    
        public virtual ICollection<User> TeamMembers { get; set; }
        public virtual ICollection<Project> TeamProjects { get; set; }
    }
}
