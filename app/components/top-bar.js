import Ember from 'ember'

export default Ember.Component.extend({
  authenticatedUser: Ember.inject.service(),

  localClassNames: 'top-bar',

  isLoading: false,
  identification: "ada",
  password: "changeme",
  actions: {
    signin() {
      let { identification,
            password } = this.getProperties('identification', 'password')
      this.get('signInCallback')(identification, password,
          (promise) => this.send('loading', promise))
    },
    signout() {
      this.get('signOutCallback')(() => this.send('restoreDropDown'))
    },
    loading(data) {
      this.set('isLoading', true)
      data.finally(() => {
        this.set('isLoading', false)
        this.send('restoreDropDown')
      })
    },
    restoreDropDown() {
      let dropDownElement =
        Ember.$('.dropdown.menu > li.is-dropdown-submenu-parent.is-active')
      dropDownElement.attr('data-is-click', false)
      dropDownElement.removeClass('is-active')
    }
  }
})
