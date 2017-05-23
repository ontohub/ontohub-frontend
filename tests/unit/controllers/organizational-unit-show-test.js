import { expect } from 'chai'
import { describe, it } from 'mocha'
import { setupTest } from 'ember-mocha'
import Ember from 'ember'

let authenticatedUserStub, destroyRecordCount, model, username,
    sessionInvalidateCount, sessionStub, subject

username = 'my-user'
authenticatedUserStub = Ember.Service.extend({
  authenticatedUser: { tokenData: { user_id: username } }
})
model = {
  id: username,
  destroyRecord() {
    destroyRecordCount = destroyRecordCount + 1
  }
}

sessionStub = Ember.Service.extend({
  invalidate() {
    sessionInvalidateCount = sessionInvalidateCount + 1
  }
})

describe('Unit | Controller | organizational-unit-new', () => {
  setupTest('controller:organizational-unit/show')

  beforeEach(function() {
    this.register('service:authenticated-user', authenticatedUserStub)
    this.register('service:session', sessionStub)
    subject = this.subject()
  })

  it('has the settingsMenu on "profile" by default', () => {
    expect(subject.get('settingsMenuProfile')).to.be.true
  })

  it('_setSettingsMenu changes the settingsMenu', () => {
    let otherMenu = 'otherMenu'
    subject._setSettingsMenu(otherMenu)
    expect(subject.get('settingsMenu')).to.eq(otherMenu)
  })

  describe('_validateUserName checks for username equality on the model',
    () => {
      beforeEach(() => {
        subject.set('model', model)
      })

      it('and is true when equal', () => {
        expect(subject._validateUserName(username)).to.be.true
      })

      it('and is false when inequal', () => {
        expect(subject._validateUserName(`other-${username}`)).to.be.false
      })
    })

  describe('_deleteUser', () => {
    let transitionTarget
    beforeEach(() => {
      subject.set('model', model)
      destroyRecordCount = 0
      sessionInvalidateCount = 0
      subject.transitionToRoute = function(target) {
        transitionTarget = target
      }
    })

    it('calls destroyRecord on the model', () => {
      subject._deleteUser()
      expect(destroyRecordCount).to.eq(1)
    })

    it('invalidates the session', () => {
      subject._deleteUser()
      expect(sessionInvalidateCount).to.eq(1)
    })

    it('transitions to the index', () => {
      subject._deleteUser()
      expect(transitionTarget).to.eq('index')
    })
  })
})
