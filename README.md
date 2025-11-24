# 1dv609 - Software Testing TDD

This assignment contains elements that can either be done by a single student or a group of maximum 2 students.

**Note:** If you are working in a pair, the work should be a team effort. A recommended structure is pair programming where you take turns in implementing test cases and implementation methods. It is not important which student makes the commits to Github, but it is important that both students are equally active in the work.

However, examination of the assignment is done individually. The grade is also set individually, this means the pair may be given different grades.

This is an optional assignment for higher grades **[F-A]**.

You can choose to do either **A1 part 1** or **A1 part 2**.

## Description

In A1 part two you are supposed to delve deeper into Unit-testing frameworks, Mocking frameworks, Code Coverage tools and also Test Driven Development. During this exercise, you will learn automated unit testing using Test Driven Development.

The assignment allows for much freedom in choosing how and what you would like to do, as long as you learn something along the way.

For example, you are to decide the following:

- Language of implementation (For example Java)
- Framework for unit-testing (For example JUnit 4)
- Framework for Mocking (For example Mockito)
- Code coverage tool (For example Code Cover)
- What sort of project you are going to code (For example a dice game)

## Minimum Requirements

There are however some minimum requirements that we want you to achieve. You should see these as guidelines to conduct a project of the right size and type. In order to get a higher grade you need to show that you have:

### Git-commit-history

Made commits to a git-repository using a specific pattern that shows that you have worked using TDD, (at least 20 commits.) Make sure you are working in "Test Driven Development" manner. Make a git-commit after each step:

1. **Red:** Write a test that fails. Make a commit with the word "RED" in commit message.
2. **Green:** Change the implementation so that the test-suite succeeds. Make a commit with the word "GREEN".
3. **Refactor:** Rewrite the code. Make a commit with the word "REFACTOR".

At some point do a coverage measurement. If you make a code-coverage measurement do a commit separately for that named "COVERAGE", make sure you save the measurement as a file in your GitHub repository. Could be a text file or a screenshot-image.

### Size and Complexity

Show a project of proper size and complexity that illustrates your proficiency in the techniques. The important part here is not that you choose some impressive implementation with loads of features, but rather that you understand and use TDD properly. And remember: don't go into this assignment thinking that you are going to finish the implementation. If you follow TDD properly, you won't.

Our minimum requirements are:

- In the final project show **at least 4 SUT-classes with dependencies**. The more classes the better
- You have used **dependency injection**
- You needed to **mock or isolate dependencies** so that only bugs in the class under test trigger a failing test and not a bug in other classes.
- **Dynamic object creation** (\`new SomeClassOrOther()\`) in several (2+) parts of the application (not only as initial setup). Remember to test those too!
- The project has a **UI** (Console, GUI, or web)

### Understand TDD, unit-testing, mocking and coverage

- Show expertise in the use of the XUnit framework, Mocking framework, coverage tool
- Test behaviour using mocks
- Show the use of different types of mocking
- Use a Code coverage tool

## Task: Write a small project using TDD

Write a small project and make sure you practice writing the test first! Also, make sure you use mocking and calculate coverage!

In order to do this you need to understand TDD first. Most failures on this assignment come from assuming TDD is something it is not.

## During the examination

### Artifacts that we want to see during examination

- Show a programming environment with a project that compiles with almost **100% unit test-coverage** (note that 100% is the goal but sometimes impossible)
- git-commit history that shows that you have worked following TDD principles (red, green, refactor).
- In that project show examples of how mocking is used to test behaviour and to isolate testing of dependent units
- Show that you can find code not covered by any test by code-coverage
- Show source-code for classes and test-classes in GIT

### Study Questions that we can ask you during the examination

The questions are examples of what can be asked during the individual examination.

- What is a unit?
- How does TDD differ from standard types of testing?
- What is an Oracle?
- How does an oracle know what is right?
- What might you need to change in the SUT in order to make good use of unit testing?, compared to when not doing unit testing
- Do all tests need to use asserts?
- What makes black box testing different from white box testing?
- Why might we want to use black box testing?
- What is the purpose of unit-testing?
- What are equivalence partitioning and boundary value analysis?
- Why do we use TDD? What is its purpose?
- If multiple tests are broken, which tests are most important to priorities fixing?
- Can we always have 100% code-coverage?
- What are the different types of coverage criteria?
- Why do we use mock objects?
- What is the difference between a mock, a stub, and a spy?
- Does 100% coverage mean we are bug-free?
- Does 100% MCDC coverage mean we are bug-free?
- Can we prove that we're 100% bug-free?
- In TDD, Why do we go for RED first?

## Examination Procedure

During the examination, you will have to show your code and also show proficiency in coding.

During the examination you will get a 0-4 value in the following:

- TDD usage, 0-4
- X-Unit usage, 0-4
- Complexity of the project, 0-4
- Code-Coverage, 0-4
- Mocking usage, 0-4
- Study Questions, 0-4

These values are then weighted into the final grade E-A:

| Grade | Criteria |
|-------|----------|
| A | All 4s |
| B | Some 3s and Some 4s |
| C | All 3s |
| D | Some 2s and Some 3+s |
| E | All 2s |
