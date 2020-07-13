using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GuggenheimTest.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GuggenheimTest.Services;

namespace GuggenheimTest.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TripController : ControllerBase
    {
        TripService _tripService;

        public TripController()
        {
            _tripService = new TripService();
        }

        [HttpPost(Name = "CalcTrip")]
        public ActionResult Post(StaticTrip trip)
        {
            // var fare = _tripService.CalcFareRealTime(trip);
            var fare = _tripService.CalcStaicFare(trip);


            return Ok(fare);
        }
    }
}
