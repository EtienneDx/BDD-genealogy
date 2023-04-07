Feature: get personn information from the database


  As an indentified person I want to get a person


  Background:
    Given a running app
    And a clean database
    And a person with data
      """
      {
      id:1,
      name: "John Doe"
      }
      """
    And an authenticated user

  Scenario: getting an existing personn information by id
    When I visit 'getPerson/id/1'
    Then I should see a 200 status code
    And I should see a "person" field containing
      """
      {
      id:1,
      name: "John Doe"
      }
      """

  Scenario: getting an invalid personn information by id
    When I visit 'getPerson/id/2'
    Then I should see a 404 status code
    And I should see a "error" field containing "Person not found"




  Scenario: getting an existing personn information by name
    When I visit 'getPerson/name/John Doe'
    Then I should see a 200 status code
    And I should see a "person" field containing
      """
      {
      id:1,
      name: "John Doe"
      }
      """

  Scenario: getting an invalid personn information by name
    When I visit 'getPerson/name/John Doe'
    Then I should see a 404 status code
    And I should see a "error" field containing "Person not found"

