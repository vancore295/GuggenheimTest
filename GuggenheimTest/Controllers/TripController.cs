using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GuggenheimTest.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GuggenheimTest.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TripController : ControllerBase
    {
        [HttpPost(Name = "CalcTrip")]
        public ActionResult Post(Trip trip)
        {
            DateTime date = Convert.ToDateTime(trip.date);

            return Ok(trip);
        }
    }
}
