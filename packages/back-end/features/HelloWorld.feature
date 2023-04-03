Feature: Hello World

  I want to be able to say "Hello World" to the world.

  Scenario: Default page
    Given a running app
    When I visit "/"
    Then I should see a 200 status code
    And I should see a "application/json" content type
    And I should see a "message" field containing "Hello World"