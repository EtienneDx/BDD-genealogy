Feature: Functional database

  As a developper, I want to have a functional database, so that I can properly access and store data

  These tests are meant to be used to validate the database connection.

  Background: A clean database
    Given a clean database

  Scenario: Adding a person
    When I add a person with name "John Doe"
    Then I should be able to retrieve the person with name "John Doe"
