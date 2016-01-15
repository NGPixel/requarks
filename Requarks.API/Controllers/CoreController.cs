using Requarks.API.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Requarks.API.Controllers
{
    public class CoreController : ApiController
    {
        // POST: api/Core/Statics
        [HttpPost]
        public Dictionary<string, IEnumerable<object>> Statics(CoreStaticsQuery qry)
        {

            var db = new DbRequests();
            var res = new Dictionary<string, IEnumerable<object>>();

            #if DEBUG
            db.Database.Log = message => Trace.WriteLine(message);
            #endif

            // Categories

            if (qry.statics.Contains("categories"))
            {
                res.Add("categories", db.Categories.ToArray());
            }

            // Types

            if (qry.statics.Contains("types"))
            {
                res.Add("types", db.RequestTypes.Select(t => new {
                    t.RequestTypeId,
                    t.RequestTypeName,
                    t.RequestTypeColor,
                    t.RequestTypeDescription,
                    t.RequestTypeSortIndex,
                    t.RequestTypeIsDefault,
                    t.RequestTypeCategory.CategoryId
                }).ToArray());
            }

            // Priorities

            if (qry.statics.Contains("priorities"))
            {
                res.Add("priorities", db.RequestPriorities.ToArray());
            }

            // Types

            if (qry.statics.Contains("status"))
            {
                res.Add("status", db.RequestStatus.ToArray());
            }

            // Properties

            if (qry.statics.Contains("properties"))
            {
                res.Add("properties", db.Properties.Where(p => p.PropertyIsActive).Select(p => new {
                    p.PropertyCategory.CategoryId,
                    p.PropertyConditions,
                    p.PropertyDefinition,
                    p.PropertyFieldDataDefault,
                    p.PropertyFieldDataValues,
                    p.PropertyFieldPlaceholder,
                    p.PropertyFieldSortIndex,
                    p.PropertyFieldType,
                    p.PropertyFieldValidation,
                    p.PropertyId,
                    p.PropertyIsActive,
                    p.PropertyIsRequired
                }).ToArray());
            }

            return res;
        }

        public class CoreStaticsQuery
        {
            public List<string> statics { get; set; }
        }

    }
}
