import { describe, it, beforeEach, afterEach } from 'mocha'
import _ from 'lodash'
import { expect } from 'chai'
import startApp from '../helpers/start-app'
import destroyApp from '../helpers/destroy-app'
import { signIn } from '../helpers/session'

describe('Acceptance | user', () => {
  let application

  beforeEach(() => {
    application = startApp()
  })

  afterEach(() => {
    destroyApp(application)
  })

  describe('User page', () => {
    beforeEach(function() {
      const organizationCount = 1,
            repositoryCount = 2,
            user = server.create('user'),
            otherUser = server.create('user'),
            organizations = server.createList(
              'organization',
              organizationCount,
              { memberIds: [user.id] }),
            repositories = server.createList(
              'repository',
              repositoryCount,
              { ownerUserId: user.id }),
            testData = {
              user,
              otherUser,
              organizations,
              organizationCount,
              repositories,
              repositoryCount
            }
      Object.assign(this.currentTest, testData)
      visit(`/${user.id}`)
    })

    it('displays general user information', function() {
      const header = find('.top-route-header'),
            realname = find('h1', header),
            username = find('h2', header)

      expect(username.text()).to.equal(this.test.user.id)
      expect(realname.text()).to.equal(this.test.user.real_name)
    })

    it('displays the number of repositories and organizations', function() {
      const tabs = find('.top-route-header .tabs'),
            repositoryTab = find('li:contains(Repositories)', tabs),
            organizationsTab = find('li:contains(Organizations)', tabs)

      expect(repositoryTab.text()).to.contain(this.test.repositoryCount)
      expect(organizationsTab.text()).to.contain(this.test.organizationCount)
    })

    it('displays the repositories', function() {
      const container = find('.page-content')

      expect(container.children()).to.have.length(this.test.repositoryCount)
      _.map(_.zip(container.children(), this.test.repositories), (e) => {
        expect(find('h1', e[0]).text()).to.contain(e[1].name)
        expect(find('p.help-text', e[0]).text()).to.contain(e[1].description)
      })
    })

    it('displays the organizations', function() {
      const organizationsTab = find(
        '.top-route-header .tabs a:contains(Organizations)'
      )
      click(organizationsTab)
      andThen(() => {
        const container = find('.page-content')

        expect(container.children()).to.have.length(
          this.test.organizationCount
        )
        _.map(_.zip(container.children(), this.test.organizations), (e) => {
          expect(find('h1', e[0]).text()).to.contain(e[1].id)
        })
      })
    })

    it('resets the tabs correctly upon re-entering page', function() {
      const organizationsTab = find(
        '.top-route-header .tabs a:contains(Organizations)'
      )
      click(organizationsTab)
      click(`.page-content a:contains(${this.test.organizations[0].id})`)
      click('a:contains(Members)')
      click(`.page-content a:contains(${this.test.user.id})`)
      andThen(() => {
        expect(currentURL()).to.equal(`/${this.test.user.id}`)
      })
    })

    describe('the settings tab while logged in', () => {
      const settingsTabSelector = '.top-route-header .tabs a:contains(Settings)'
      beforeEach(function () {
        signIn(application, this.currentTest.user.id)
      })

      describe('when viewing the profile of another user', () => {
        beforeEach(function () {
          visit(`/${this.currentTest.otherUser.id}`)
        })

        it('is not displayed for other users', function() {
          visit(`/${this.test.otherUser.id}`)
          expect(find(settingsTabSelector)).to.have.length(0)
        })
      })

      describe('when viewing the own profile', () => {
        beforeEach(function () {
          visit(`/${this.currentTest.user.id}`)
        })

        it('is displayed for the current user', () => {
          expect(find(settingsTabSelector)).to.have.length(1)
        })

        describe('inside the settings tab', () => {
          const profileContainerSelector = '#settings-menu-profile-container',
                deleteProfileContainerSelector =
                  '#settings-menu-delete-profile-container'
          beforeEach(() => {
            click(find(settingsTabSelector))
          })

          it('changes the url correctly', function() {
            andThen(() => {
              expect(currentURL()).
                to.eq(`/${this.test.user.id}?tab=settings`)
            })
          })

          it('defaults to the profile menu', () => {
            expect(find(profileContainerSelector).is(':visible')).
              to.be.true
          })

          it('does not show the delete profile menu', () => {
            expect(find(deleteProfileContainerSelector).is(':visible')).
              to.be.false
          })

          describe('inside the delete profile menu', () => {
            it('changes the url correctly', function() {
              click('#settings-menu-delete-profile')
              andThen(() => {
                const queryString = 'settingsMenu=deleteProfile&tab=settings'
                expect(currentURL()).
                  to.eq(`/${this.test.user.id}?${queryString}`)
              })
            })
          })
        })
      })
    })
  })
})
