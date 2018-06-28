import Component from '@ember/component';
import { ParentMixin } from 'ember-composability-tools';
import { computed, get, set } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import { inject as service } from '@ember/service';

export default Component.extend(ParentMixin, {
  tabs: service(),

  activeTabIndex: 0,

  contentComponent: computed('childComponents.[]', function() {
    let children = get(this, 'childComponents');

    return children.findBy('key', 'content');
  }),

  tabComponents: computed(function() {
    return [];
  }),

  name: computed(function() {
    return `tabs-content-${this.elementId}`;
  }),

  didInsertElement() {
    this._super(...arguments);

    get(this, 'tabs').registerTabContext(this);

    scheduleOnce('afterRender', this, 'determineTabStart');
  },

  willDestroyElement() {
    get(this, 'tabs').deregisterTabContext(this);

    this._super(...arguments);
  },

  // if we have routable tab activa we won't activate any of the other tabs
  // only when we click on a different tab we will activate the non-routable
  // tab
  //
  // if we don't have a routable tab active when rendering this component we
  // will fallback to considering the first one of the visible tabs to be
  // active
  //
  // if we want to improve this we can create a hook for this to determine
  // which one should be active
  //
  // set the first tab active unless we have specified an active tab
  // we need to do this after rendering the component so we schedule it via the
  // runloop
  determineTabStart() {
    // we could also do this based on a label
    const activeTabIndex = this.activeTabIndex || 0;

    if (this.activeTabComponent) {
      return;
    }

    const tabComponents = this.get('tabComponents');

    set(this, 'activeTabComponent', tabComponents[activeTabIndex]);
  },

  actions: {
    didInsertTab(tabComponent) {
      get(this, 'tabComponents').addObject(tabComponent);
    },

    // we need to be able to remove this as well most likely
    didDestroyTab(/*tabComponent*/) {},

    setTabActive(tabComponent) {
      set(this, 'activeTabComponent', tabComponent);
    },
  }
});
