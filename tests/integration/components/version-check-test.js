import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | version check', () => {
  setupComponentTest('version-check', {
    integration: true
  })

  const actualVersion = {
    id: 'version',
    commit: '21e9779',
    commitsSinceTag: 65,
    full: '0.0.0-65-g21e9779',
    tag: '5.5.5'
  }

  it('being compatible does not display the warning box', function() {
    this.set('version', actualVersion)
    this.set('versionConfig', {
      commit: null,
      commitsSinceTagMin: null,
      commitsSinceTagMax: null,
      full: actualVersion.full,
      tag: actualVersion.tag
    })
    this.render(hbs`{{version-check
      version = version
      versionConfig = versionConfig}}`)
    expect(this.$('#version-mismatch')).to.have.length(0)
  })

  it('being incompatible displays the warning box', function() {
    this.set('version', actualVersion)
    this.set('versionConfig', {
      commit: null,
      commitsSinceTagMin: null,
      commitsSinceTagMax: null,
      full: `${actualVersion.full}-differing`,
      tag: actualVersion.tag
    })
    this.render(hbs`{{version-check
      version = version
      versionConfig = versionConfig}}`)
    expect(this.$('#version-mismatch')).to.have.length(1)
  })
})
