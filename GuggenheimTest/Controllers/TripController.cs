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
    [Route("api/[controller]/[action]", Name = "[controller]_[action]")]
    public class TripController : ControllerBase
    {
        TripService _tripService;

        public TripController()
        {
            _tripService = new TripService();
        }

        [HttpPost]
        public IActionResult StaticTrip(StaticTrip trip)
        {
            var fare = _tripService.CalcStaicFare(trip);


            return Ok(fare);
        }

        [HttpPost]
        public IActionResult DynamicTrip(Trip trip)
        {
            var fare = _tripService.CalcFareRealTime(trip);

            return Ok(fare);
        }
    }
}
