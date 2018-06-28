import Component from '@ember/component';
import { scheduleOnce } from '@ember/runloop';
import { inject as service } from '@ember/service';

export default Component.extend({
  tabs: service(),

  didInsertElement() {
    this._super(...arguments);

    scheduleOnce('afterRender', this, 'activateTab');
  },

  activateTab() {
    // tell tabs service that this is the active tab now for the tabs component
    // with the given name
    const { tabs, named: tabsContentName } = this;

    tabs.activateRoutableTabForContext(tabsContentName);
  }
});
