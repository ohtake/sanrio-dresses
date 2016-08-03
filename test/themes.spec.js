import { describe, it, after } from 'mocha';
import { expect } from 'chai';

import * as themes from '../src/themes.js';

describe('themes', function () {
  describe('getInitialTheme', function () {
    after(function () {
      themes.setTimeProviderForTest(null);
    });
    it('should return theme', function () {
      const theme = themes.getInitialTheme();
      expect(theme).to.have.property('palette');
    });
    it('should return theme based on time', function () {
      const dataset = [
        { time: new Date(2000, 1, 1, 0, 1), theme: themes.themeDark },
        { time: new Date(2000, 1, 1, 5, 1), theme: themes.themeDark },
        { time: new Date(2000, 1, 1, 6, 1), theme: themes.themeLight },
        { time: new Date(2000, 1, 1, 17, 1), theme: themes.themeLight },
        { time: new Date(2000, 1, 1, 18, 1), theme: themes.themeDark },
        { time: new Date(2000, 1, 1, 23, 1), theme: themes.themeDark },
      ];
      for (const d of dataset) {
        themes.setTimeProviderForTest(() => d.time);
        const actual = themes.getInitialTheme();
        expect(actual).to.equal(d.theme);
      }
    });
  });
});
