const plants = [
  {
    "id": 1,
    "name": "Euphorbia eritrea",
    "sun": "high",
    "water": "rarely",
    "url": "https://storage.googleapis.com/front-br-challenges.appspot.com/green-thumb-v2/plants/euphorbia-eritrea.png",
    "price": 25,
    "toxicity": false
  },
  {
    "id": 2,
    "name": "Succulent Bowl",
    "sun": "high",
    "water": "rarely",
    "url": "https://storage.googleapis.com/front-br-challenges.appspot.com/green-thumb-v2/plants/succulent-bowl.png",
    "price": 30,
    "toxicity": false
  },
  {
    "id": 3,
    "name": "Bunny ears cacti",
    "sun": "high",
    "water": "rarely",
    "url": "https://storage.googleapis.com/front-br-challenges.appspot.com/green-thumb-v2/plants/bunny-ears-cacti.png",
    "price": 20,
    "toxicity": false
  },
  {
    "id": 4,
    "name": "Ficus lyrata",
    "sun": "high",
    "water": "regularly",
    "url": "https://storage.googleapis.com/front-br-challenges.appspot.com/green-thumb-v2/plants/ficus-lyrata.png",
    "price": 30,
    "toxicity": false
  },
  {
    "id": 5,
    "name": "Bamboo",
    "sun": "low",
    "url": "https://storage.googleapis.com/front-br-challenges.appspot.com/green-thumb-v2/plants/lucky-bamboo.png",
    "water": "regularly",
    "price": 15,
    "toxicity": false
  },
  {
    "id": 6,
    "name": "Ponytail Palm",
    "sun": "low",
    "water": "regularly",
    "url": "https://storage.googleapis.com/front-br-challenges.appspot.com/green-thumb-v2/plants/ponytail-palm.png",
    "price": 50,
    "toxicity": false
  },
  {
    "id": 7,
    "name": "Pilea peperomioides",
    "sun": "no",
    "url": "https://storage.googleapis.com/front-br-challenges.appspot.com/green-thumb-v2/plants/pilea-peperomioides.png",
    "water": "regularly",
    "price": 50,
    "toxicity": true
  },
  {
    "id": 8,
    "name": "Calathea triostar",
    "sun": "no",
    "water": "daily",
    "url": "https://storage.googleapis.com/front-br-challenges.appspot.com/green-thumb-v2/plants/calathea-triostar.png",
    "price": 50,
    "toxicity": true
  },
  {
    "id": 9,
    "name": "Monstera deliciosa",
    "sun": "no",
    "url": "https://storage.googleapis.com/front-br-challenges.appspot.com/green-thumb-v2/plants/monstera-deliciosa.png",
    "water": "daily",
    "price": 50,
    "toxicity": true
  }
]

const getPlants = () => {
  return [...plants];
};

const setListener = (selector, event, calback) => {
  const element = document.querySelector(selector);

  element.addEventListener(event, calback);
};

class View {
  constructor(selector) {
    this.container = document.querySelector(selector);
  }

  template(data) {
    throw new Error('You must implements the "template" method.');
  }

  render(data) {
    this.container.innerHTML = this.template(data);
  }
}

class PlantsView extends View {
  template(plants) {
    return `
      <img
        class="results__image"
        src="assets/images/illustrations/pick.png"
        alt="hand getting plant"
      />

      <h2 class="h2-2">Our picks for you</h2>
      
      <ul id="plant-list" class="plant-list">
        ${plants.reduce((accumulator, plants) => {
          return `
            ${accumulator}
            <li class="card">
              <div class="card_image__wrapper">
                <img
                  class="card__image"
                  src="${plants.url}"
                  alt="Imagem ${plants.name}"
                />
              </div>
              
              <div class="card__info">
                <p>${plants.name}</p>
                
                <p>$${plants.price}</p>
              </div>
            </li>
          `;
        }, '')}
      </ul>
    `;
  }
}


class NoResults extends View {
  template() {
    return `
      <div class="no-results">
        <div class="no-results-text">
          <h2 class="h2-1">No results yet...</h2>

          <p class="p-1">
            Use the filters above to find the plant that best fits your
            environment :)
          </p>
        </div>
        
        <div class="no-results__img">
          <img
            src="assets/images/illustrations/no-results.png"
            alt="No results image"
          />
        </div>
      </div>
    `;
  }
}


class Main {
  constructor() {
    this.plantsView = new PlantsView('#results');
    this.noResults = new NoResults('#results');
    this.filters = {
      sunlight: "",
      water: "",
      pet: "",
    };

    this.init();
  }

  init() {
    this.initialRender();

    this.setListeners();

  }

  initialRender() {
    this.noResults.render();
  }

  setListeners() {
    setListener('#sunlight-field', 'change', this.handleSunlightFilter.bind(this));
    setListener('#water-field', 'change', this.handleWaterFilter.bind(this));
    setListener('#pet-field', 'change', this.handlePetFilter.bind(this));
  }

  handleSunlightFilter(event) {
    this.filters.sunlight = event.target.value;

    this.applyFilters();
  }

  filterBySunlight(plant) {
    if (this.filters.sunlight === '') {
      return true;
    }

    return plant.sun === this.filters.sunlight;
  }

  handleWaterFilter(event) {
    this.filters.water = event.target.value;

    this.applyFilters();
  }

  filterByWater(plant) {
    if (this.filters.water === '') {
      return true;
    }

    return plant.water === this.filters.water;
  }

  handlePetFilter(event) {
    this.filters.pet = event.target.value;

    this.applyFilters();
  }

  filterByPet(plant) {
    if (this.filters.pet === '' || this.filters.pet == false) {
      return true;
    }

    if (this.filters.pet == true) {
      return plant.toxicity == !this.filters.pet;
    }
  }


  applyFilters() {
    const filteredPlants = getPlants()
      .filter(this.filterBySunlight.bind(this))
      .filter(this.filterByWater.bind(this))
      .filter(this.filterByPet.bind(this));

    if (filteredPlants.length <= 0) {
      this.noResults.render();

    } else {
      this.plantsView.render(filteredPlants);
    }
  }
}

new Main();