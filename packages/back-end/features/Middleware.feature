Feature: Authorization middleware

  As a user
  I want to be able to authorize my requests
  So that I can access the API securely

  Scenario: Authorization header is missing
    Given a "missing" Authorization header
    When the middleware processes the request
    Then the middleware should return a 401 response

  Scenario: Authorization header is invalid
    Given a "invalid" Authorization header
    When the middleware processes the request
    Then the middleware should return a 403 response

  Scenario: Authorization header is valid
    Given a "valid" Authorization header
    When the middleware processes the request
    Then the middleware should call the next handler
    And the middleware should set the user property on the request