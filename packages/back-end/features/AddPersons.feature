Feature: Add persons

  I want a connected user to be able to add a person, either related to another one in their tree or an unrelated one.

  Background: A running app and a user
    Given a running app
    And a user with id 0
    And a person with id 0

  Scenario: Add a person
    When I post a person named "John Doe" to "/person" as connected user with id 0
    Then "John Doe" is saved in the database
    And I should see a 200 status code

  Scenario: Add a partner
    When I post a person named "Jimmy Doe" whose "partner" is the person with id 0 to "/person" as connected user with id 0
    Then "Jimmy Doe" is saved in the database
    And "Jimmy Doe" is the "partner" of the person with id 0
    And I should see a 200 status code


  Scenario: Add a father
    When I post a person named "John Doe" whose "father" is the person with id 0 to "/person" as connected user with id 0
    Then "John Doe" is saved in the database
    And the person with id 0 is the "father" of "John Doe"
    And I should see a 200 status code


  Scenario: Add a mother
    When I post a person named "Jimmy Doe" whose "mother" is the person with id 0 to "/person" as connected user with id 0
    Then "Jimmy Doe" is saved in the database
    And the person with id 0 is the "mother" of "Jimmy Doe"
    And I should see a 200 status code


  Scenario: Add a child
    When I post a person named "Timmy Doe" whose "child" is the person with id 0 to "/person" as connected user with id 0
    Then "Timmy Doe" is saved in the database
    And the person with id 0 is the "child" of "Timmy Doe"
    And I should see a 200 status code
