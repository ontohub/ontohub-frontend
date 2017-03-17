Feature: Repository

  Scenario: Show repository name
  Given there is a user
  And there is a repository
  When I visit a repository page
  Then I should see the repository name
