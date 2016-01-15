namespace Requarks.API.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using Models;
    using System.Linq;
    using System.Collections.Generic;

    internal sealed class Configuration : DbMigrationsConfiguration<DbRequests>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(DbRequests context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.

            // CATEGORIES

            var categories = new List<Category>
            {
                new Category { CategoryName = "Technical", CategoryColor = "grey700", CategoryIcon = "memory", CategoryDescription = "Report bugs, request new technical features, enhancements or support." },
                new Category { CategoryName = "Content", CategoryColor = "cyan500", CategoryIcon = "receipt", CategoryDescription = "Request new digital content such as website news, intranet articles, social media posts, or changes to existing intranet or website pages." },
                new Category { CategoryName = "Graphic Design", CategoryColor = "green500", CategoryIcon = "gesture", CategoryDescription = "Request banners, graphics, images or other graphic design elements." },
                new Category { CategoryName = "Templates", CategoryColor = "purple500", CategoryIcon = "select_all", CategoryDescription = "Request new templates, changes to existing ones or technical support." }
            };
            categories.ForEach(e => context.Categories.AddOrUpdate(c => c.CategoryName, e));
            context.SaveChanges();

            // TYPES

            context.RequestTypes.AddOrUpdate(
                t => t.RequestTypeName,
                new RequestType {
                    RequestTypeCategory = categories.Single(c => c.CategoryName == "Technical"),
                    RequestTypeColor = "red500",
                    RequestTypeDescription = "A feature that crashes and impacts a critical application.",
                    RequestTypeName = "Bug - Critical",
                    RequestTypeSortIndex = 100,
                    RequestTypeIsDefault = false
                },
                new RequestType
                {
                    RequestTypeCategory = categories.Single(c => c.CategoryName == "Technical"),
                    RequestTypeColor = "orange500",
                    RequestTypeDescription = "A feature that produces one or more errors.",
                    RequestTypeName = "Bug - Urgent",
                    RequestTypeSortIndex = 200,
                    RequestTypeIsDefault = false
                },
                new RequestType
                {
                    RequestTypeCategory = categories.Single(c => c.CategoryName == "Technical"),
                    RequestTypeColor = "brown500",
                    RequestTypeDescription = "A feature that does not work as expected.",
                    RequestTypeName = "Bug - Normal",
                    RequestTypeSortIndex = 300,
                    RequestTypeIsDefault = true
                },
                new RequestType
                {
                    RequestTypeCategory = categories.Single(c => c.CategoryName == "Technical"),
                    RequestTypeColor = "yellow500",
                    RequestTypeDescription = "A feature that has small visual glitches.",
                    RequestTypeName = "Bug - Minor",
                    RequestTypeSortIndex = 400
                },
                new RequestType
                {
                    RequestTypeCategory = categories.Single(c => c.CategoryName == "Technical"),
                    RequestTypeColor = "purple500",
                    RequestTypeDescription = "A change or add-on to an existing functionality.",
                    RequestTypeName = "Enhancement",
                    RequestTypeSortIndex = 500,
                    RequestTypeIsDefault = false
                },
                new RequestType
                {
                    RequestTypeCategory = categories.Single(c => c.CategoryName == "Technical"),
                    RequestTypeColor = "blue500",
                    RequestTypeDescription = "A new functionality which isn't currently present in the application.",
                    RequestTypeName = "New Feature",
                    RequestTypeSortIndex = 600,
                    RequestTypeIsDefault = false
                },
                new RequestType
                {
                    RequestTypeCategory = categories.Single(c => c.CategoryName == "Technical"),
                    RequestTypeColor = "pink500",
                    RequestTypeDescription = "A question or help needed using a functionality of an application.",
                    RequestTypeName = "Support",
                    RequestTypeSortIndex = 700,
                    RequestTypeIsDefault = false
                },
                new RequestType
                {
                    RequestTypeCategory = categories.Single(c => c.CategoryName == "Technical"),
                    RequestTypeColor = "teal500",
                    RequestTypeDescription = "A documentation request of a project or functionnality.",
                    RequestTypeName = "Documentation",
                    RequestTypeSortIndex = 800,
                    RequestTypeIsDefault = false
                },
                new RequestType
                {
                    RequestTypeCategory = categories.Single(c => c.CategoryName == "Technical"),
                    RequestTypeColor = "grey500",
                    RequestTypeDescription = "An access request to an / part of an application.",
                    RequestTypeName = "Access Rights",
                    RequestTypeSortIndex = 900,
                    RequestTypeIsDefault = false
                }
            );
            context.SaveChanges();

            // Status

            context.RequestStatus.AddOrUpdate(
                s => s.RequestStatusName,
                new RequestStatus
                {
                    RequestStatusCategory = categories.Single(c => c.CategoryName == "Technical"),
                    RequestStatusColor = "grey500",
                    RequestStatusName = "Unconfirmed",
                    RequestStatusSortIndex = 100,
                    RequestStatusClosed = false
                },
                new RequestStatus
                {
                    RequestStatusCategory = categories.Single(c => c.CategoryName == "Technical"),
                    RequestStatusColor = "teal500",
                    RequestStatusName = "Under Analysis",
                    RequestStatusSortIndex = 200,
                    RequestStatusClosed = false
                },
                new RequestStatus
                {
                    RequestStatusCategory = categories.Single(c => c.CategoryName == "Technical"),
                    RequestStatusColor = "orange500",
                    RequestStatusName = "Awaiting Approval",
                    RequestStatusSortIndex = 300,
                    RequestStatusClosed = false
                },
                new RequestStatus
                {
                    RequestStatusCategory = categories.Single(c => c.CategoryName == "Technical"),
                    RequestStatusColor = "yellow500",
                    RequestStatusName = "Info Required",
                    RequestStatusSortIndex = 400,
                    RequestStatusClosed = false
                },
                new RequestStatus
                {
                    RequestStatusCategory = categories.Single(c => c.CategoryName == "Technical"),
                    RequestStatusColor = "blue500",
                    RequestStatusName = "Queued",
                    RequestStatusSortIndex = 500,
                    RequestStatusClosed = false
                },
                new RequestStatus
                {
                    RequestStatusCategory = categories.Single(c => c.CategoryName == "Technical"),
                    RequestStatusColor = "cyan500",
                    RequestStatusName = "On Hold",
                    RequestStatusSortIndex = 600,
                    RequestStatusClosed = false
                },
                new RequestStatus
                {
                    RequestStatusCategory = categories.Single(c => c.CategoryName == "Technical"),
                    RequestStatusColor = "deepPurple500",
                    RequestStatusName = "In Progress",
                    RequestStatusSortIndex = 700,
                    RequestStatusClosed = false
                },
                new RequestStatus
                {
                    RequestStatusCategory = categories.Single(c => c.CategoryName == "Technical"),
                    RequestStatusColor = "grey800",
                    RequestStatusName = "To Be Deployed",
                    RequestStatusSortIndex = 800,
                    RequestStatusClosed = false
                },
                new RequestStatus
                {
                    RequestStatusCategory = categories.Single(c => c.CategoryName == "Technical"),
                    RequestStatusColor = "pink500",
                    RequestStatusName = "Deferred",
                    RequestStatusSortIndex = 900,
                    RequestStatusClosed = false
                },
                new RequestStatus
                {
                    RequestStatusCategory = categories.Single(c => c.CategoryName == "Technical"),
                    RequestStatusColor = "green500",
                    RequestStatusName = "Completed",
                    RequestStatusSortIndex = 1000,
                    RequestStatusClosed = true
                },
                new RequestStatus
                {
                    RequestStatusCategory = categories.Single(c => c.CategoryName == "Technical"),
                    RequestStatusColor = "red500",
                    RequestStatusName = "Rejected",
                    RequestStatusSortIndex = 1100,
                    RequestStatusClosed = true
                }
            );
            context.SaveChanges();

            // Priorities

            context.RequestPriorities.AddOrUpdate(
                p => p.RequestPriorityName,
                new RequestPriority
                {
                    RequestPriorityCategory = categories.Single(c => c.CategoryName == "Technical"),
                    RequestPriorityColor = "brown500",
                    RequestPriorityName = "Low",
                    RequestPrioritySortIndex = 100
                },
                new RequestPriority
                {
                    RequestPriorityCategory = categories.Single(c => c.CategoryName == "Technical"),
                    RequestPriorityColor = "grey800",
                    RequestPriorityName = "Normal",
                    RequestPrioritySortIndex = 200
                },
                new RequestPriority
                {
                    RequestPriorityCategory = categories.Single(c => c.CategoryName == "Technical"),
                    RequestPriorityColor = "red500",
                    RequestPriorityName = "High",
                    RequestPrioritySortIndex = 300
                }
            );
            context.SaveChanges();

            // Property Definitions

            var propertyDefinitions = new List<PropertyDefinition>
            {
                new PropertyDefinition
                {
                    PropertyDefinitionKey = "application",
                    PropertyDefinitionName = "Application",
                    PropertyDefinitionType = "text-predefined",
                    PropertyDefinitionDescription = "Name of the website / application",
                    PropertyDefinitionIcon = "web"
                },
                new PropertyDefinition
                {
                    PropertyDefinitionKey = "section",
                    PropertyDefinitionName = "Section",
                    PropertyDefinitionType = "text",
                    PropertyDefinitionDescription = "Sub-section of the application",
                    PropertyDefinitionIcon = "photo_size_select_small"
                }
            };
            propertyDefinitions.ForEach(e => context.PropertyDefinitions.AddOrUpdate(p => p.PropertyDefinitionKey, e));
            context.SaveChanges();

            // Properties

            context.Properties.AddOrUpdate(
                p => p.PropertyFieldSortIndex,
                new Property
                {
                    PropertyCategory = categories.Single(c => c.CategoryName == "Technical"),
                    PropertyConditions = "[]",
                    PropertyDefinition = propertyDefinitions.Single(d => d.PropertyDefinitionKey == "application"),
                    PropertyFieldDataValues = "[\"Corporate Website\",\"Intranet\",\"Visual Studio Team Services\",\"Requarks\",\"Other\"]",
                    PropertyFieldDataDefault = "Corporate Website",
                    PropertyFieldPlaceholder = "",
                    PropertyFieldSortIndex = 100,
                    PropertyFieldType = "dropdown",
                    PropertyFieldValidation = "",
                    PropertyIsActive = true,
                    PropertyIsRequired = true
                },
                new Property
                {
                    PropertyCategory = categories.Single(c => c.CategoryName == "Technical"),
                    PropertyConditions = "[]",
                    PropertyDefinition = propertyDefinitions.Single(d => d.PropertyDefinitionKey == "section"),
                    PropertyFieldDataValues = "",
                    PropertyFieldDataDefault = "",
                    PropertyFieldPlaceholder = "e.g. Investors",
                    PropertyFieldSortIndex = 200,
                    PropertyFieldType = "text",
                    PropertyFieldValidation = "",
                    PropertyIsActive = true,
                    PropertyIsRequired = false
                }
            );

        }
    }
}
