Feature: Add persons

  I want a new user to be able to be registered.

  Background: A running app
    Given a running app
    And a clean database

  Scenario: Register with valid data
    When I "post" a "{\"name\": \"John Doe\", \"email\": \"test@test.fr\", \"password\": \"newpassword1234\"}" object to '/register'
    Then the user "test@test.fr" is saved in the database
    And I should see a 200 status code
    And I should see a "application/json" content type
    And I should see a "token" field

  Scenario: Register with missing name should fail
    When I "post" a "{\"email\": \"test@test.fr\", \"password\": \"newpassword1234\"}" object to '/register'
    Then I should see a 400 status code
    And I should see a "message" field containing "Invalid request body."

  Scenario: Register with missing email should fail
    When I "post" a "{\"name\": \"John Doe\", \"password\": \"newpassword1234\"}" object to '/register'
    Then I should see a 400 status code
    And I should see a "message" field containing "Invalid request body."

  Scenario: Register with missing password should fail
    When I "post" a "{\"name\": \"John Doe\", \"email\": \"test@test.fr\"}" object to '/register'
    Then I should see a 400 status code
    And I should see a "message" field containing "Invalid request body."