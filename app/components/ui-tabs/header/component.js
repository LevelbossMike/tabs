import Component from '@ember/component';
import { ChildMixin } from 'ember-composability-tools';
import { computed, get } from '@ember/object';

export default Component.extend(ChildMixin, {
  tabs: computed('tabComponents.[]', function() {
    return get(this, 'tabComponents').map((tabComponent) => {
      const { label, elementId } = tabComponent;

      return { label, elementId, tabComponent };
    });
  }),
});
