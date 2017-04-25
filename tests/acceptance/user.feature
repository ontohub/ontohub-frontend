Feature: User

  Scenario: Show user name
  Given there is a user named "Freddy fazbear"
  When I visit /freddy-fazbear
  Then I should see the user name
