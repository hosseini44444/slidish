import '@testing-library/jest-dom';

class mockResizeObserver {
  constructor(cb) {
    // (entries) => setSlidesWidth(entries[0].contentRect.width
    cb([{ contentRect: { width: 100 } }]);
  }
  observe() {}
  disconnect() {}
}

global.ResizeObserver = mockResizeObserver;
global.React = require('react');
