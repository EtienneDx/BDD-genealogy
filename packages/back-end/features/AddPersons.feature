Feature: Add persons

  I want a connected user to be able to add a person, either related to another one in their tree or an unrelated one.

  Background: A running app and a user
    Given a running app
    And a clean database
    And an existing user "{ \"id\": 1, \"name\": \"testuser\", \"email\": \"validemail@tdd.org\", \"password\": \"validpassword1234\"}"
    And an existing person "{ \"id\": 0, \"name\": \"testuser\"}"

  Scenario: Add a person
    Given I am an authenticated user 1
    When I "post" a "{\"name\": \"John Doe\"}" object to "/person"
    Then the person "John Doe" is saved in the database
    And I should see a 200 status code

  Scenario: Add a partner
    Given I am an authenticated user 1
    When I "post" a "{\"name\": \"Jimmy Doe\", \"partner\": [{ \"id\" : 0 }] }" object to "/person"
    Then the person "Jimmy Doe" is saved in the database
    And "Jimmy Doe" is the "partner" of the person with id 0
    And I should see a 200 status code


  Scenario: Add a father
    Given I am an authenticated user 1
    When I "post" a "{ \"name\": \"John Doe\", \"father\": { \"id\": 0 } }" object to "/person"
    Then the person "John Doe" is saved in the database
    And the person with id 0 is the "father" of "John Doe"
    And I should see a 200 status code


  Scenario: Add a mother
    Given I am an authenticated user 1
    When I "post" a "{ \"name\": \"Jimmy Doe\", \"mother\": { \"id\": 0 } }" object to "/person"
    Then the person "Jimmy Doe" is saved in the database
    And the person with id 0 is the "mother" of "Jimmy Doe"
    And I should see a 200 status code

  # TODO : Add children
  # Scenario: Add a child
  #   Given I am an authenticated user 1#   
  #   When I "post" a "{ \"name\": \"Timmy Doe\", \"children\": [{ \"id\": 0 }] }" object to "/person"
  #   Then the person "Timmy Doe" is saved in the database
  #   And the person with id 0 is the "child" of "Timmy Doe"
  #   And I should see a 200 status code

  Scenario: Add a person if not authenticated should fail
    When I "post" a "{ \"name\": \"Jimmy Doe\", \"mother\": { \"id\": 0 } }" object to "/person"
    Then I should see a 401 status code

  Scenario: Add a person with unknown relative should fail
    Given I am an authenticated user 1
    When I "post" a "{ \"name\": \"Jimmy Doe\", \"mother\": { \"id\": 5 } }" object to "/person"
    Then I should see a 404 status code

  Scenario: Add a person with missing name should fail
    Given I am an authenticated user 1
    When I "post" a "{ \"birthDate\": \"1950/02/06\", \"mother\": { \"id\": 0 } }" object to "/person"
    Then I should see a 500 status code
    And I should see a "message" field containing "Invalid request: Name is required."