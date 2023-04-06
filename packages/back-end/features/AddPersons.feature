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
    When I post a person named "Jimmy Doe" to "/person/0/partner" as connected user with id 0
    Then "Jimmy Doe" is saved in the database
    And "Jimmy Doe" is the "partner" of the person of id 0
    And I should see a 200 status code


  Scenario: Add a father
    When I post a person named "John Doe" to "/person/0/father" as connected user with id 0
    Then "John Doe" is saved in the database
    And "John Doe" is the "father" of the person of id 0
    And I should see a 200 status code


  Scenario: Add a mother
    When I post a person named "Jimmy Doe" to "/person/0/mother" as connected user with id 0
    Then "Jimmy Doe" is saved in the database
    And "Jimmy Doe" is the "mother" of the person of id 0
    And I should see a 200 status code


  Scenario: Add a child
    When I post a person named "Timmy Doe" to "/person/0/child" as connected user with id 0
    Then "Timmy Doe" is saved in the database
    And "Timmy Doe" is the "child" of the person of id 0
    And I should see a 200 status code
