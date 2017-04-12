import yadda from '../../helpers/yadda';

export default function() {
  return yadda.localisation.English.library()
    .given('there is a user', (next) => {
      next();
    })
    .given('I am not logged in', (next) => {
      next();
    })
    .given('I type "Ember g feature make-feature"', (next) => {
      visit('/');
      andThen(() => next());
    })
    .when('I look in the folder', (next) => {
      next();
    });
}
