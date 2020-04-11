using System.Globalization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.IO;
using CsvHelper;
using CsvHelper.Configuration.Attributes;

namespace netcore.Models.AnimalCrossingNewHorizons
{
    public class Fish 
    {
        [Index(0)]
        public int SeqNo { get; set; }
        [Index(1)]
        public string Name { get; set; }
        [Index(2)]
        public string Location { get; set; }
        [Index(3)]
        public string Size { get; set; }
        [Index(4)]
        public string Price { get; set; }
        [Index(5)]
        public string Hours { get; set; }
        [Index(6)]
        public string Season { get; set; }
    }
    public class FishModel
    {
        private List<Fish> AllFish;
        public FishModel() {
            using (TextReader reader = new StreamReader("fish-raw.csv")) 
            {
                using (CsvReader csv = new CsvReader(reader, CultureInfo.InvariantCulture)) 
                {
                    this.AllFish = csv.GetRecords<Fish>().ToList();
                }
            }
        }
        public IEnumerable<Fish> Get()
        {
            return this.AllFish;
        }
    }
}
