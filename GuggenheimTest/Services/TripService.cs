using GuggenheimTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace GuggenheimTest.Services
{
    public class TripService
    {
        public TripService() { }
        public double CalcFare(Trip trip)
        {
            trip.ConvertDate();
            double fare = 3.00;
            double additonalPassengersFee = (trip.passengers - 1) * 0.35;
            double nysTax = .50;
            TimeSpan surgeStart = new TimeSpan(16, 0, 0);
            TimeSpan surgeEnd = new TimeSpan(20, 0, 0);

            fare += additonalPassengersFee;
            fare += nysTax;

            if(trip.tripDate.DayOfWeek != DayOfWeek.Saturday || trip.tripDate.DayOfWeek != DayOfWeek.Sunday)
            {
                if(trip.tripDate.TimeOfDay > surgeStart && trip.tripDate.TimeOfDay < surgeEnd)
                {
                    fare += 1.0;
                }
            }


            return fare;
        }
    }
}
