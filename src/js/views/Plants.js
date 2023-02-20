import View from '../views/View.js';

export default class PlantsView extends View {
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