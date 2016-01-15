
namespace Requarks.API.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class User
    {
        
        public User()
        {
            this.UserTeams = new HashSet<Team>();
        }
    
        public int UserId { get; set; }
        public string UserLogin { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string UserEmail { get; set; }
        public string UserJobTitle { get; set; }
        public DateTime UserCreatedOn { get; set; }
    
        public virtual ICollection<Team> UserTeams { get; set; }
    }
}
