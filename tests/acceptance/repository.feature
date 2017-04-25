Feature: Repository

  Scenario: Show repository name
  Given there is a user named "Freddy Fazbear"
  And the user owns a repository named "Bonnie Bunny" with the description "Some awesome repository"
  When I visit /freddy-fazbear/bonnie-bunny
  Then I should see the repository name "Freddy Fazbear / Bonnie Bunny"
  And I should see the repository description "Some awesome repository"

  Scenario: Create a repository
  Given there is a user named "Ada"
  And the user is logged in
  When I visit /new
  And I fill in the form
  And I click on Save
  Then I should be redirected to /ada/some-repository
  And I should see the repository name "Ada Lovelace / some-repository"
  And I should see the repository description "This is the repository description"

  Scenario: Change repository description
  Given there is a user named "Freddy Fazbear"
  And the user owns a repository named "Bonnie Bunny" with the description "Some awesome repository"
  When I visit /freddy-fazbear/bonnie-bunny
  And I click on the description
  And I fill in the field with "This is the new repository description"
  And I click on the save button
  Then I should see the repository description "This is the new repository description"