using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using netcore.Models.AnimalCrossingNewHorizons;

namespace netcore.Controllers
{
    [ApiController]
    [Route("api/acnh")]
    public class AnimalCrossingNewHorizonsController: ControllerBase
    {
        private readonly ILogger<AnimalCrossingNewHorizonsController> _logger;

        public AnimalCrossingNewHorizonsController(ILogger<AnimalCrossingNewHorizonsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<AnimalCrossingNewHorizonsFish> Get()
        {
            FishModel model = new FishModel();
            return model.Get().Select(fish => new AnimalCrossingNewHorizonsFish 
            {
                Name = fish.Name,
                ImageURL = "",
                Price = uint.Parse(fish.Price.Replace(",", String.Empty))
            });
        }
    }
}
