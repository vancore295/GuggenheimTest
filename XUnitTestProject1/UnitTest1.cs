using GuggenheimTest.Models;
using Newtonsoft.Json;
using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace XUnitTestProject1
{
    public class UnitTest1
    {
        [Fact]
        public async Task Test_Post()
        {
            using (var client = new TestClientProvider().Client)
            {
                var response = await client.PostAsync("api/Trip/StaticTrip", new StringContent(JsonConvert.SerializeObject(
                    new StaticTrip
                    {
                        date = DateTime.Parse("2020-07-17"),
                        milesUnder6 = 2,
                        minAbove6 = 5,
                        time = "17:30"
                    }), Encoding.UTF8, "application/json"));

                response.EnsureSuccessStatusCode();
                Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            }
        }
    }
}
