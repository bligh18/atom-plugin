'use strict';

let Kite;
const {CompositeDisposable} = require('atom');
const {DisposableEvent} = require('../utils');

class KiteAutocorrectStatus extends HTMLElement {
  static initClass() {
    return document.registerElement('kite-autocorrect-status', {
      prototype: this.prototype,
    });
  }

  attachedCallback() {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(new DisposableEvent(this, 'click', () => {
      if (!Kite) { Kite = require('../kite'); }

      Kite.toggleAutocorrectSidebar();
    }));

    this.subscriptions.add(atom.workspace.onDidChangeActivePaneItem(() => {
      this.textContent = '';
    }));
  }

  detachedCallback() {
    this.subscriptions.dispose();
  }
}

module.exports = KiteAutocorrectStatus.initClass();