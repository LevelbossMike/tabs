import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  tabs: service(),
  tagName: '',

  onClick() {},

  actions: {
    handleClick() {
      // saveCurrentRoute
      // tell all other tabs to deactivate
      const { tabs, tabsContentName, onClick } = this;

      tabs.activateRoutableTabForContext(tabsContentName);

      return onClick();
      // use onClick()
    }
  }
});
