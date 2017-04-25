import yadda from "../../helpers/yadda";
import { expect } from 'chai';
import {
  authenticateSession
} from "ontohub-frontend/tests/helpers/ember-simple-auth";

const dictionary = new yadda.Dictionary()
  .define("url", /(.+)/)
  .define("repoName", /(.+ \/ .+)/)
  .define("string", /(.+)/);

export default function() {
  return yadda.localisation.English
    .library(dictionary)
    .given("there is a user", (next) => {
      next();
    })
    .given("I am not logged in", (next) => {
      next();
    })
    .given("I am logged in", (next) => {
      authenticateSession(Application, {
        data: {
          id: "authenticationtoken",
          type: "authentication_tokens",
          attributes: {
            // eslint-disable-next-line max-len
            token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJ1c2VyX2lkIjoiYWRhIiwiZXhwIjoxNDkzMTkyNjAyfQ._vLn9KCMOfhTls26mRW_3Z322UmxsIidzLiE7uPJGCpTf_NluBiWbXCe-6ifyloR61VKjJU4kwF4-4-zEasSPw"
          }
        },
        jsonapi: { version: "1.0" }
      });
      next();
    })
    .when("I visit the new repository page", (next) => {
      visit("/new");
      andThen(next);
    })
    .when("I fill in the form", (next) => {
      fillIn("#repository_new_name input", "some-repository");
      fillIn(
        "#repository_new_description input",
        "This is the repository description"
      );
      andThen(next);
    })
    .when("I click on Save", (next) => {
      click("#repository_new_submit button");
      andThen(next);
    })
    .then("I should be redirected to $url", (next, url) => {
      expect(currentURL()).to.equal(url());
      next();
    });
}
