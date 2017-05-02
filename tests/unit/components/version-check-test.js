import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';

describe('Unit | Component | version check', () => {
  setupComponentTest('version-check', {
    unit: true
  })

  const version = {
    id: 'version',
    commit: '21e9779',
    commitsSinceTag: 65,
    full: '0.0.0-65-g21e9779',
    tag: '5.5.5'
  }

  describe('with a full description', () => {
    it("that matches the version's description is compatible", function() {
      // creates the component instance
      let component = this.subject({ version: version, versionConfig: {
        commit: null,
        commitsSinceTagMin: null,
        commitsSinceTagMax: null,
        full: version.full,
        tag: version.tag
      } })

      expect(component.get('isIncompatible')).to.eq(false)
    })

    it("that differs from the version's description is incompatible",
      function() {
      // creates the component instance
        let component = this.subject({ version: version, versionConfig: {
          commit: null,
          commitsSinceTagMin: null,
          commitsSinceTagMax: null,
          full: `${version.full}-differing`,
          tag: version.tag
        } })

        expect(component.get('isIncompatible')).to.eq(true)
      })
  })

  describe('with a commit', () => {
    it("that matches the version's commit is compatible", function() {
      // creates the component instance
      let component = this.subject({ version: version, versionConfig: {
        commit: version.commit,
        commitsSinceTagMin: null,
        commitsSinceTagMax: null,
        full: null,
        tag: version.tag
      } })

      expect(component.get('isIncompatible')).to.eq(false)
    })

    it("that differs from the version's commit is incompatible", function() {
      // creates the component instance
      let component = this.subject({ version: version, versionConfig: {
        commit: `${version.commit}-differing`,
        commitsSinceTagMin: null,
        commitsSinceTagMax: null,
        full: null,
        tag: version.tag
      } })

      expect(component.get('isIncompatible')).to.eq(true)
    })
  })

  describe('with commitsSinceTagMin', () => {
    it("that matches the version's commitsSinceTag is compatible", function() {
      // creates the component instance
      let component = this.subject({ version: version, versionConfig: {
        commit: null,
        commitsSinceTagMin: version.commitsSinceTag,
        commitsSinceTagMax: null,
        full: null,
        tag: version.tag
      } })

      expect(component.get('isIncompatible')).to.eq(false)
    })

    it("that is less than the version's commitsSinceTag is compatible",
      function() {
        // creates the component instance
        let component = this.subject({ version: version, versionConfig: {
          commit: null,
          commitsSinceTagMin: version.commitsSinceTag - 1,
          commitsSinceTagMax: null,
          full: null,
          tag: version.tag
        } })

        expect(component.get('isIncompatible')).to.eq(false)
      })

    it("that exceeds the version's commitsSinceTag is incompatible",
      function() {
        // creates the component instance
        let component = this.subject({ version: version, versionConfig: {
          commit: null,
          commitsSinceTagMin: version.commitsSinceTag + 1,
          commitsSinceTagMax: null,
          full: null,
          tag: version.tag
        } })

        expect(component.get('isIncompatible')).to.eq(true)
      })
  })

  describe('with commitsSinceTagMax', () => {
    it("that matches the version's commitsSinceTag is compatible", function() {
      // creates the component instance
      let component = this.subject({ version: version, versionConfig: {
        commit: null,
        commitsSinceTagMin: null,
        commitsSinceTagMax: version.commitsSinceTag,
        full: null,
        tag: version.tag
      } })

      expect(component.get('isIncompatible')).to.eq(false)
    })

    it("that is less than the version's commitsSinceTag is incompatible",
      function() {
        // creates the component instance
        let component = this.subject({ version: version, versionConfig: {
          commit: null,
          commitsSinceTagMin: null,
          commitsSinceTagMax: version.commitsSinceTag - 1,
          full: null,
          tag: version.tag
        } })

        expect(component.get('isIncompatible')).to.eq(true)
      })

    it("that exceeds the version's commitsSinceTag is compatible",
      function() {
        // creates the component instance
        let component = this.subject({ version: version, versionConfig: {
          commit: null,
          commitsSinceTagMin: null,
          commitsSinceTagMax: version.commitsSinceTag + 1,
          full: null,
          tag: version.tag
        } })

        expect(component.get('isIncompatible')).to.eq(false)
      })
  })

  describe('only with a tag', () => {
    it('requiring a matching version is compatible', function() {
      // creates the component instance
      let component = this.subject({ version: version, versionConfig: {
        commit: null,
        commitsSinceTagMin: null,
        commitsSinceTagMax: null,
        full: null,
        tag: version.tag
      } })

      expect(component.get('isIncompatible')).to.eq(false)
    })

    it('requiring a smaller patch version is compatible', function() {
      // creates the component instance
      let component = this.subject({ version: version, versionConfig: {
        commit: null,
        commitsSinceTagMin: null,
        commitsSinceTagMax: null,
        full: null,
        tag: '5.5.4'
      } })
      expect(component.get('isIncompatible')).to.eq(false)
    })

    it('requiring a greater patch version is compatible', function() {
      // creates the component instance
      let component = this.subject({ version: version, versionConfig: {
        commit: null,
        commitsSinceTagMin: null,
        commitsSinceTagMax: null,
        full: null,
        tag: '5.5.6'
      } })
      expect(component.get('isIncompatible')).to.eq(false)
    })

    it('requiring a smaller minor version is compatible', function() {
      // creates the component instance
      let component = this.subject({ version: version, versionConfig: {
        commit: null,
        commitsSinceTagMin: null,
        commitsSinceTagMax: null,
        full: null,
        tag: '5.4.5'
      } })
      expect(component.get('isIncompatible')).to.eq(false)
    })

    it('requiring a greater minor version is incompatible', function() {
      // creates the component instance
      let component = this.subject({ version: version, versionConfig: {
        commit: null,
        commitsSinceTagMin: null,
        commitsSinceTagMax: null,
        full: null,
        tag: '5.6.0'
      } })
      expect(component.get('isIncompatible')).to.eq(true)
    })

    it('requiring a smaller major version is incompatible', function() {
      // creates the component instance
      let component = this.subject({ version: version, versionConfig: {
        commit: null,
        commitsSinceTagMin: null,
        commitsSinceTagMax: null,
        full: null,
        tag: '4.5.5'
      } })
      expect(component.get('isIncompatible')).to.eq(true)
    })

    it('requiring a greater major version is incompatible', function() {
      // creates the component instance
      let component = this.subject({ version: version, versionConfig: {
        commit: null,
        commitsSinceTagMin: null,
        commitsSinceTagMax: null,
        full: null,
        tag: '6.5.5'
      } })
      expect(component.get('isIncompatible')).to.eq(true)
    })
  })
})
