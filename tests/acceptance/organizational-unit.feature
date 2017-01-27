Feature: OrganizationalUnit

  Scenario: Show organizational unit name
  Given there is an organizational unit
  When I visit an organizational unit page
  Then I should see the organizational unit name
