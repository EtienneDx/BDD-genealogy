Feature: User authentification

  As a user
  I want to connect to the application
  so that I can securely access the app

  Background: An existing user
    Given an existing user
    And a running app
  
  Scenario: Connecting using valid email + valid password
    When I post a valid email and valid password at "/login"
    Then I should see a 200 status code
    And I should see a "application/json" content type
    And I should see a "message" field containing "Valid login"
    And I should see a "token" field

  Scenario: Connecting using valid email + invalid password
    When I post a valid email and wrong password at "/login"
    Then I should see a 403 status code
    And I should see a "application/json" content type
    And I should see a "message" field containing "Invalid password"

  Scenario: Connecting using invalid email
    When I post a wrong email at "/login"
    Then I should see a 403 status code
    And I should see a "application/json" content type
    And I should see a "message" field containing "Invalid email"