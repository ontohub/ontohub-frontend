Feature: Repository

  Scenario: Show repository name
  Given there is a user
  And there is a repository
  When I visit a repository page
  Then I should see the repository name "Freddy Fazbear / Bonnie Bunny"

  Scenario: Create a repository
  Given there is a user
  And I am logged in
  When I visit the new repository page
  And I fill in the form
  And I click on Save
  Then I should be redirected to /ada/some-repository
  And I should see the repository name "Ada / some-repository"
  And I should see the repository description "Ada / some-repository"