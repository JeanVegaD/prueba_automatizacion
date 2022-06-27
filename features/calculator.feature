Feature: Calculator

  Background:
    Given I open calculator page

  Scenario: Execute operations with "prototype" build
    Given A JSON file named testData
    And Use Prototype build
    Then Execute file operations

  Scenario: Execute operations with 1 build
    Given A JSON file named testData
    And Use 1 build
    Then Execute file operations

  Scenario: Execute operations with 2 build
    Given A JSON file named testData
    And Use 2 build
    Then Execute file operations