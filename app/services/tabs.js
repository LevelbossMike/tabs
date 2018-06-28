import Service from '@ember/service';
import { get, computed } from '@ember/object';

export default Service.extend({
  availableTabContexts: computed(function() {
    return [];
  }),

  registerTabContext(uiTabsComponent) {
    get(this, 'availableTabContexts').pushObject({ name: uiTabsComponent.name, component: uiTabsComponent });
  },

  deregisterTabContext(uiTabsComponent) {
    get(this, 'availableTabContexts').removeObject(uiTabsComponent);
  },

  activateRoutableTabForContext(tabsContentName) {
    const { component } = get(this, 'availableTabContexts').findBy('name', tabsContentName);

    component.set('activeTabComponent', null);
  }
});
