Feature: get person information from the database


  As an identified user I want to get a person So that I can display and modify his informations


  Background:
    Given a running app
    And a clean database
    And an existing person "{ \"id\": 1, \"name\": \"John Doe\" }"
    And I am an authenticated user 1

  Scenario: getting an existing person information by id
    When I visit '/person/id/1'
    Then I should see a 200 status code
    And I should see a "person" field containing the object "{ \"id\":1, \"name\": \"John Doe\" }"

  Scenario: getting an invalid person information by id
    When I visit '/person/id/2'
    Then I should see a 404 status code
    And I should see a "message" field containing "Person not found"

  Scenario: getting an existing person information by name
    When I visit '/person/name/John Doe'
    Then I should see a 200 status code
    And I should see a "persons" field including the object "{ \"id\":1, \"name\": \"John Doe\" }"

  Scenario: getting an invalid person information by name
    When I visit '/person/name/Not John Doe'
    Then I should see a 200 status code
    And I should see a "persons" field containing the object "[]"

