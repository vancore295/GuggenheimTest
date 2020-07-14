using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GuggenheimTest.Models
{
    public class Trip
    {
        public DateTime date { get; set; }
        public DateTime tripDate { get; set; }
        public string start { get; set; }
        public string end { get; set; }
        public bool inNY { get; set; }
        public string time { get; set; }
        public TimeSpan timeSpan { get; set; }

        public List<Steps> Steps { get; set; }

        public void ConvertDate()
        {
            this.tripDate = Convert.ToDateTime(this.date);
        }
    }
}
