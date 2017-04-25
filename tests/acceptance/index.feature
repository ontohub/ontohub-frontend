Feature: Index page

  Scenario: Display the welcome message
  When I visit the index page
  Then I should see the welcome message

  Scenario: Display the development note
  When I visit the index page
  Then I should see the development note
