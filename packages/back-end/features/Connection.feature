Feature: User authentification

  As a user
  I want to connect to the application
  so that I can securely access the app

  Background: An existing user
    Given a clean database
    And an existing user "{ \"id\": 1, \"name\": \"testuser\", \"email\": \"validemail@tdd.org\", \"password\": \"validpassword1234\"}"
    And a running app
  
  Scenario: Connecting using valid email + valid password
    When I "post" a "{\"email\": \"validemail@tdd.org\", \"password\": \"validpassword1234\"}" object to "/login"
    Then I should see a 200 status code
    And I should see a "application/json" content type
    And I should see a "token" field

  Scenario: Connecting using valid email + invalid password
    When I "post" a "{\"email\": \"validemail@tdd.org\", \"password\": \"invalidpassword1234\"}" object to "/login"
    Then I should see a 403 status code
    And I should see a "application/json" content type
    And I should see a "message" field containing "Invalid credentials"

  Scenario: Connecting using invalid email
    When I "post" a "{\"email\": \"invalidemail@tdd.org\", \"password\": \"validpassword1234\"}" object to "/login"
    Then I should see a 403 status code
    And I should see a "application/json" content type
    And I should see a "message" field containing "Invalid credentials"

  Scenario: Connecting with an invalid body
    When I "post" a "{\"email\": \"sth\"}" object to "/login"
    Then I should see a 400 status code
    And I should see a "application/json" content type
    And I should see a "message" field containing "Invalid request body"