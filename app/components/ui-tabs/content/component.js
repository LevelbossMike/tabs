import Component from '@ember/component';
import { ParentMixin, ChildMixin } from 'ember-composability-tools';
import { schedule } from '@ember/runloop';
import { computed } from '@ember/object';

export default Component.extend(ChildMixin, ParentMixin, {
  didInsertTab(/* tabComponent */) {},

  registerChild(childComponent) {
    this._super(...arguments);

    // tell parent about new tab after render
    // bindings won't work as we receive multiple render assertion errors
    schedule('afterRender', this, 'didInsertTab', childComponent);
  },

  tabsContentName: computed(function() {
    return `tabs-content-${this.elementId}`;
  })
});
