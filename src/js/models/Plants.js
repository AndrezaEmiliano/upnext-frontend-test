export default class PlantsModel {
  filters = {
    sunlight: "",
    water: "",
    pet: "",
  }

  filterBySunlight() {
    if (this.filters.sunlight === '') {
      return '';
    }

    return {
      sun: this.filters.sunlight
    }
  }

  filterByWater() {
    if (this.filters.water === '') {
      return '';
    }

    return {
      water: this.filters.water
    }
  }

  filterByPet() {
    if (this.filters.pet === '') {
      return '';
    }

    if (this.filters.pet == true) {
      return { toxicity: !this.filters.pet }
    }
  }

  buildFilters() {
    const filterBySunlight = this.filterBySunlight();
    const filterByWater = this.filterByWater();
    const filterByPet = this.filterByPet();

    return new URLSearchParams({
      ...(filterBySunlight ? filterBySunlight : {}),
      ...(filterByWater ? filterByWater : {}),
      ...(filterByPet ? filterByPet : {}),
    }).toString();
  }
}