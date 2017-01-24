import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate(controller, model) {
    if(model.constructor.modelName === 'user'){
      this.render('organizationalUnit/user/show');
      this.render('organizationalUnit/user/header', {
        into: 'application',
        outlet: 'top-route-header'
      });
    } else {
      this.render('organizationalUnit/organization/show');
      this.render('organizationalUnit/organization/header', {
        into: 'application',
        outlet: 'top-route-header'
      });
    }
  }
});
