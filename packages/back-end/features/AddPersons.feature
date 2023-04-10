Feature: Add persons

  I want a connected user to be able to add a person, either related to another one in their tree or an unrelated one.

  Background: A running app and a user
    Given a running app
    And an existing user "{ \"id\": 1, \"name\": \"testuser\", \"email\": \"validemail@tdd.org\", \"password\": \"validpassword1234\"}"
    And an existing person "{ \"id\": 0, \"name\": \"testuser\"}"

  Scenario: Add a person
    When I "post" a "{\"name\": \"John Doe\"}" object to "/person"
    Then "John Doe" is saved in the database
    And I should see a 200 status code

  Scenario: Add a partner
    When I "post" a "{\"name\": \"Jimmy Doe\", \"partner\": [{ \"id\" : 0 }] }" object to "/person"
    Then "Jimmy Doe" is saved in the database
    And "Jimmy Doe" is the "partner" of the person with id 0
    And I should see a 200 status code


  Scenario: Add a father
    When I "post" a "{ \"name\": \"John Doe\", \"father\": { \"id\": 0 } }" object to "/person"
    Then "John Doe" is saved in the database
    And the person with id 0 is the "father" of "John Doe"
    And I should see a 200 status code


  Scenario: Add a mother
    When I "post" a "{ \"name\": \"Jimmy Doe\", \"mother\": { \"id\": 0 } }" object to "/person"
    Then "Jimmy Doe" is saved in the database
    And the person with id 0 is the "mother" of "Jimmy Doe"
    And I should see a 200 status code


  Scenario: Add a child
    When I "post" a "{ \"name\": \"Timmy Doe\", children: [{ \"id\": 0 }] }" object to "/person"
    Then "Timmy Doe" is saved in the database
    And the person with id 0 is the "child" of "Timmy Doe"
    And I should see a 200 status code
