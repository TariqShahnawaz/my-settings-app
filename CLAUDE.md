# CLAUDE.md — Project Rules

1. Forms always use react-hook-form + zod. Never use useState
   for form fields. The zod schema lives in src/schemas/ and
   is always exported separately.
   → A PR using useState for form inputs will be rejected.
2. Every input must have a label with htmlFor matching the
   input id. Error messages must use role="alert".
   → A PR missing htmlFor on any label will be rejected.
3. Every prompt asking for a component must end with:
   "Write tests and run them. Do not stop until all tests pass."
   → A component without passing tests will not be accepted.
