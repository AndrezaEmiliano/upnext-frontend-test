import PlantsView from '../views/Plants.js';
import NoResults from '../views/NoResults.js';
import PlantsModel from '../models/Plants.js';
import { getPlants } from '../services/plants.js';
import { setListener } from '../utils/dom.js';

export default class PlantsController {
  constructor() {
    this.plantsView = new PlantsView('#results');
    this.noResults = new NoResults('#results');
    this.plantsModel = new PlantsModel();

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
    this.applyFilters({ sunlight: event.target.value });
  }

  handleWaterFilter(event) {
    this.applyFilters({ water: event.target.value });
  }

  handlePetFilter(event) {
    this.applyFilters({ pet: event.target.value });
  }

  async applyFilters({
    sunlight = this.plantsModel.filters.sunlight,
    water = this.plantsModel.filters.water,
    pet = this.plantsModel.filters.pet,
  }) {
    this.plantsModel.filters = {
      sunlight,
      water,
      pet,
    };

    const filters = this.plantsModel.buildFilters();

    const plants = await getPlants(filters);

    if (plants.length <= 0) {
      this.noResults.render();

    } else {
      this.plantsView.render(plants);
    }
  }
}