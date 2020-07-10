using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GuggenheimTest.Models
{
    public class Trip
    {
        public string date { get; set; }
        public DateTime tripDate;
        public string start { get; set; }
        public string end { get; set; }
        public int passengers { get; set; }

        public void ConvertDate()
        {
            this.tripDate = Convert.ToDateTime(this.date);
        }
    }
}
