
namespace Requarks.API.Models
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;

    public partial class DbRequests : DbContext
    {
        public DbRequests() : base("name=DbRequests")
        {

        }

        public DbSet<Activity> Activities { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Description> Descriptions { get; set; }
        public DbSet<File> Files { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Property> Properties { get; set; }
        public DbSet<PropertyDefinition> PropertyDefinitions { get; set; }
        public DbSet<Request> Requests { get; set; }
        public DbSet<RequestPriority> RequestPriorities { get; set; }
        public DbSet<RequestProperty> RequestProperties { get; set; }
        public DbSet<RequestStatus> RequestStatus { get; set; }
        public DbSet<RequestType> RequestTypes { get; set; }
        public DbSet<Sprint> Sprints { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<User> Users { get; set; }

    }
}
