Feature: User

  Scenario: Show user name
  Given there is a user
  When I visit a user page
  Then I should see the user name
