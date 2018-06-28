import Component from '@ember/component';
import { ChildMixin } from 'ember-composability-tools';
import { computed, get } from '@ember/object';

export default Component.extend(ChildMixin, {
  isActive: computed('activeTabComponent', function() {
    const activeTabComponent = get(this, 'activeTabComponent');

    return activeTabComponent === this;
  }),
});

