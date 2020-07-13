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
        double unitRate = 0.35;
        public TripService() { }
        public double CalcFareRealTime(Trip trip)
        {
            trip.ConvertDate();
            double fare = 3.00;
            double nysTax = .50;
            double mph;
            double milesBelow6mph = 0;
            double timeAbove6mph = 0;

            if (trip.inNY) fare += nysTax;
            fare = SurgeCharge(trip.tripDate, fare);
            fare = NightSurcharge(trip.tripDate, fare);

            for(int i = 0; i < trip.Steps.Count; i++)
            {
                mph = trip.Steps[i].distance / (trip.Steps[i].duration / 60);

                if (mph > 6)
                {
                    timeAbove6mph += trip.Steps[i].duration;
                }
                else
                {
                    milesBelow6mph += trip.Steps[i].distance;
                }
            }

            fare = FareOnTime(timeAbove6mph, fare);
            fare = FareOnDistance(milesBelow6mph, fare);


            return Math.Round(fare, 2);
        }

        private double SurgeCharge(DateTime start, double fare)
        {
            TimeSpan surgeStart = new TimeSpan(16, 0, 0);
            TimeSpan surgeEnd = new TimeSpan(20, 0, 0);

            if (start.DayOfWeek != DayOfWeek.Saturday || start.DayOfWeek != DayOfWeek.Sunday)
            {
                if (start.TimeOfDay > surgeStart && start.TimeOfDay < surgeEnd)
                {
                    fare += 1.0;
                }
            }

            return fare;
        }

        private double NightSurcharge(DateTime start, double fare)
        {
            TimeSpan after8 = new TimeSpan(20, 0, 0);
            TimeSpan before6 = new TimeSpan(6, 0, 0);

            if (start.TimeOfDay > after8 || start.TimeOfDay < before6)
            {
                fare += 0.50;
            }

            return fare;
        }

        private double FareOnTime(double time, double fare)
        {
            double units = Math.Round(time, 0);

            double charge = units * unitRate;

            return fare += charge;
        }

        private double FareOnDistance(double miles, double fare)
        {
            double units = Math.Round((miles / .2), 0);

            double charge = units * unitRate;

            return fare += charge;
        }
    }
}
