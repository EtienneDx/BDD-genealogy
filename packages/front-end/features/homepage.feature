Feature: Homepage

  The homepage is the first page that a user sees when they visit the app.

  Scenario: Homepage is displayed
    Given I am on the "homepage" route
    Then I should see "Welcome front-end"