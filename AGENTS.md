# AGENTS.md

## Project Purpose

This project contains the AI regression test orchestrator.

The orchestrator is responsible for coordinating automated regression test execution based on Azure DevOps Test Plans, Suites, and Test Cases.

The AI agent is used only as a controlled execution helper. It should not own the overall test flow.

## Core Architecture

The system follows this separation of responsibilities:

- Orchestrator: deterministic control flow
- Azure DevOps API: source of truth for test cases and test results
- AI Agent: interprets and executes individual test steps
- Playwright / Playwright MCP: browser interaction layer
- Reporter: writes test results and artifacts back to Azure DevOps

## Important Principle

Do not let the AI agent control the whole system.

The orchestrator must decide:

- which tests are loaded
- which tests are executed
- when a test starts or stops
- when retries happen
- how results are stored
- when the pipeline fails

The AI agent may only help with:

- interpreting a single test case
- executing browser-facing steps
- evaluating whether the expected result text or element is present and visible in the browser viewport using Playwright assertions
- returning structured results

If a test step fails, the agent must stop executing subsequent steps for that test case, capture a screenshot, and return the structured result with status "failed" and all completed steps.

## Expected Agent Output

Agents must return structured JSON only.

Valid status values are: `"passed"`, `"failed"`, `"blocked"`, `"error"`. Use `"failed"` for assertion failures, `"blocked"` for precondition failures, and `"error"` for unexpected exceptions.

Example:

```json
{
  "status": "passed",
  "reason": "The dashboard was visible after login.",
  "steps": [
    {
      "step": "Open login page",
      "status": "passed",
      "reason": "Login page loaded successfully."
    }
  ],
  "artifacts": {
    "screenshots": [],
    "trace": null
  }
}
```

## Test Data

An array of test cases are stored in `example-tests.json`. Each test case object uses the following schema:

```json
{
  "id": "string",
  "title": "string",
  "steps": [
    {
      "action": "string",
      "expectedResult": "string"
    }
  ]
}
```