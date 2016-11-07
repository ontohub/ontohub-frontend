Feature: Index page

  Scenario: Display the welcome message
  Given I am not logged in
  When I visit the index page
  Then I should see the welcome message

  Scenario: Display the development note
  Given I am not logged in
  When I visit the index page
  Then I should see the development note
