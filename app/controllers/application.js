import Controller from '@ember/controller';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  router: service(),

  actions: {
    linkToNested() {
      get(this, 'router').transitionTo('nested');
    }
  }
});
