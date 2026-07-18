# WORKFLOW.md — Vague vs Precise Prompting

## What I Built
A UserSettingsForm component in React with fields for name, 
email, bio, and notification toggle.

## Correctness
Round 1 produced a basic form using useState for field values. 
It had no proper schema and validation was minimal.
Round 2 produced a separate zod schema with specific rules for 
each field — for example, email format was validated at the 
type level, which Round 1 never checked properly.

## Accessibility
Round 1 had label elements but missing htmlFor attributes — 
meaning screen readers cannot link labels to inputs. Error 
messages were plain text with no role attribute.
Round 2 had htmlFor on every label and role="alert" on every 
error message because I listed both as explicit requirements.

## Edge Cases
Round 1 did not handle the bio character counter or disable 
the submit button during submission.
Round 2 handled both because I included exact example behavior 
in my prompt.

## Time Comparison
Round 1 prompt took 1 minute to write. But reviewing the output 
and noticing what was wrong or missing took around 20 minutes.
Round 2 prompt took 12 minutes to write carefully. Review took 
only 5 minutes because tests caught issues automatically.
Round 2 was faster end-to-end despite feeling slower at the start.

## AI Mistake I Caught
In Round 1, the AI used useState for all form fields instead of 
react-hook-form. This means validation does not trigger properly 
on submit and the form state is not managed correctly for our project.