# WORKFLOW.md — Vague vs Precise Prompting

## What I Built

A UserSettingsForm component in React + TypeScript with fields
for name, email, bio, and notification toggle — built twice
using two different prompting approaches.

## Correctness

Round 1 used useState for all form state and plain JavaScript
functions for validation. It had no zod schema and no
react-hook-form. The form was missing entire fields — bio and
notification toggle were never generated. There was also no
submit button, meaning the form could never actually be submitted.
Round 2 used react-hook-form with a separate exported zod schema.
All four required fields were present and each had type-level
validation rules enforced by zod.

## Accessibility

Round 1 used aria-live="polite" on error containers instead of
role="alert" — this means errors are announced with a delay
rather than immediately, which is incorrect for form validation
errors that need instant feedback.
Round 2 used role="alert" on every error message because I
specified it explicitly as a requirement in my prompt.

## Edge Cases

Round 1 had no bio field at all, so the 300-character limit and
character counter were never implemented. The submit button did
not exist, so the disabled-during-submission requirement was
never handled. No onSuccess or onError props were included.
Round 2 handled all of these because I described exact expected
behavior with examples in my prompt.

## Time Comparison

Round 1 prompt took about 1 minute to write. But reviewing it
and discovering that entire fields were missing, there was no
submit button, and no react-hook-form was used took around
15-20 minutes of manual checking.
Round 2 prompt took about 12 minutes to write carefully.
Because I included a verification step with tests, issues were
caught automatically. Review took around 5 minutes.
Round 2 was faster end-to-end despite feeling slower at first.

## AI Mistake I Caught

Round 1 was missing a submit button entirely — the form had
profile and security sections but no way to actually submit
the data. This is a fundamental functionality gap that would
only be noticed by manually using the form. Round 1 also
generated only 2 of the 4 required fields because the vague
prompt gave the AI no field list to follow.
