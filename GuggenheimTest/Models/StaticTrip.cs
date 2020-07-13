using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GuggenheimTest.Models
{
    public class StaticTrip
    {
        public int minAbove6 { get; set; }
        public int milesUnder6 { get; set; }
        public DateTime date { get; set; }
        public string time { get; set; }
        public TimeSpan timeSpan;

        public void ConvertTimeSpan()
        {
            this.timeSpan = TimeSpan.Parse(this.time);
        }
    }
}
