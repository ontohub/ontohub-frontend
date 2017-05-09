import Ember from 'ember'

export default Ember.Component.extend({
  isIncompatible: Ember.computed('version', 'versionConfig', function() {
    let compatible = true,
        tagParts = this.get('version.tag').split('.'),
        tagPartsConfig = this.get('versionConfig.tag').split('.')

    if (this.get('versionConfig.full')) {
      return this.get('versionConfig.full') != this.get('version.full')
    } else if (this.get('versionConfig.commit')) {
      return this.get('versionConfig.commit') != this.get('version.commit')
    }

    if (this.get('versionConfig.commitsSinceTagMax')) {
      compatible = compatible &&
        this.get('versionConfig.commitsSinceTagMax') >=
          this.get('version.commitsSinceTag')
    }
    if (this.get('versionConfig.commitsSinceTagMin')) {
      compatible = compatible &&
        this.get('versionConfig.commitsSinceTagMin') <=
          this.get('version.commitsSinceTag')
    }

    compatible = compatible && tagParts[0] == tagPartsConfig[0]
    compatible = compatible && tagParts[1] >= tagPartsConfig[1]
    // patch version is not checked because of its semantics in semver

    return !compatible
  })
})
