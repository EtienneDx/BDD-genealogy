Feature: User authentification

  As a user
  I want to connect to the application
  so that I can securely access the app

  Background: An existing user
    Given a clean database
    And an existing user { id: 1, name: "testuser", email: "validemail@tdd.org", password: "validpassword1234"}
    And a running app
  
  Scenario: Connecting using valid email + valid password
    When I post a valid email and valid password at "/login"
    Then I should see a 200 status code
    And I should see a "application/json" content type
    And I should see a "user" field containing { id: 1, name: "testuser", email: "validemail@tdd.org", password: "validpassword1234"}
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