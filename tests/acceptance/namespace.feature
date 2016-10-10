Feature: Namespace

  Scenario: Show namespace name
  Given there is a namespace
  When I visit a namespace page
  Then I should see the namespace name
