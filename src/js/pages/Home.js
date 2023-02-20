import PlantsController from '../controllers/Plants.js';

class Home {
  constructor() {
    this.plantsController = new PlantsController();
  }
}
export default new Home();