import View from '../views/View.js';

export default class NoResults extends View {
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