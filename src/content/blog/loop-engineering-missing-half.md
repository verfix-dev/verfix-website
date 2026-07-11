---
title: "The missing half of loop engineering is verification"
description: "Loop engineering discourse is all about the act step — harnesses, planning, retries. The observe step gets a hand-wave: \"run the tests.\" For browser-facing work, that's not enough."
pubDate: 2026-07-11
author: "Jyotiraditya"
---

Last month the AI-coding world got a new name for what its best practitioners were already doing: **loop engineering**. Stop hand-prompting your coding agent; design the loop that prompts it — act, observe, decide, repeat, until the goal is met. Addy Osmani's writeup crystallized it, Boris Cherny compressed it into four words ("I don't prompt Claude anymore"), and suddenly everyone is publishing loop architectures.

Almost all of that discussion is about the *act* side of the loop: harnesses, planning, sub-agents, retries, context management. The *observe* side — how the loop knows whether the last action actually worked — mostly gets a single hand-wave: "run the tests."

Here's the problem, and if you use coding agents on web apps you've hit it this week: **for browser-facing work, agents observe by vibes.**

## "Fixed!" — the most expensive word in AI coding

A typical loop iteration on a web app looks like this. The agent edits a component. It runs the type checker: clean. It runs unit tests: green. It restarts the dev server: no errors. It declares: *"Fixed! The login flow now works correctly."*

The login flow does not work correctly. A modal is covering the submit button. The agent never opened a browser. Every signal it checked was real — and none of them measured the thing that mattered.

This isn't an intelligence failure; it's an instrumentation failure. The loop's termination condition is "no more errors in the signals I have," and the browser isn't one of its signals. An unverified loop doesn't converge on working software. It converges on *confidence*.

And "just let the agent drive a browser" doesn't fix it, for a subtler reason: if the agent improvises the check — different clicks, different waits, different judgment each iteration — then the agent is grading its own homework with a rubric it rewrites every time. Sometimes it passes a broken page. Sometimes it "fixes" a working one. The loop needs a *fixed* measurement, or the feedback is noise.

## What the observe step actually requires

Take loop engineering seriously and work backwards from "the loop must terminate on truth," and the observe step needs four properties:

1. **Deterministic.** The same check, byte-for-byte, every iteration. If the measurement changes between iterations, the agent can't attribute a delta to its own edit.
2. **Machine-legible.** Agents pattern-match. A stack of Playwright reporter output makes them guess; a stable typed failure — `selector_not_found`, `url_mismatch`, `network_failure` — with the selector and a fix hint makes them act. The failure format is an API, and it deserves the same stability guarantees as one.
3. **Cheap.** The inner loop runs dozens of times a day. It has to be seconds, local, and — ideally — zero tokens. Verification that costs an LLM call per iteration quietly becomes verification you skip.
4. **Cheat-resistant.** Given a failing check, an agent under pressure will sometimes fix the *check* — weaken the assertion, delete the test, edit whatever makes red go green. The observe step needs to at least notice: this iteration changed the measuring stick, not the code.

Notice that none of these properties call for more intelligence in the loop. They call for *less* — for a dumb, rigid, boring instrument the intelligent part can push against. Thermostats work because the thermometer doesn't negotiate.

## Measuring it: loop closure

If verification is the missing half, there should be a number. Ours is **loop-closure rate**: given a broken app and *only* the verifier's output as a failure signal, does an agent reach the intended fix without human help — and in how many iterations?

We built a [benchmark](https://github.com/verfix-dev/verfix/tree/main/benchmark) of 8 deliberately broken tiny apps covering a taxonomy of realistic front-end failures — drifted selectors, an occluding modal, a stale session, a console-error render cascade, a changed route, a slow endpoint, a broken API, changed copy. The harness is deliberately paranoid about its own honesty: every case declares invariants checked *after* the loop closes (deleting the assertion doesn't count as fixing the bug), a do-nothing agent must score 0% and a known-good-fix oracle must score 100% in CI, or the benchmark itself fails.

First public result: a real coding agent, fed nothing but the typed JSON, closed **6 of 8 cases autonomously, in a mean of 2 iterations**. The two failures are the most interesting part: in both, the agent made the flow pass *the wrong way* and the invariants caught it — which is exactly the cheat-resistance property doing its job.

Eight cases is a small benchmark, and we'd rather grow an honest one in public than ship an impressive one you can't check. It's reproducible in the [repo](https://github.com/verfix-dev/verfix) (`node benchmark/run.js`), and the adapter contract is "any shell command that reads JSON on stdin" — results from other agents are welcome as PRs.

## The instrument

This is the part where I tell you we built the thing, so I'll keep it short. **Verfix** is an open-source (Apache-2.0), local-first browser verification runtime for coding agents: flows in a JSON config, deterministic execution on Playwright, typed failures with fix hints, recorded traces, a guard that flags mid-loop edits to the measuring stick. `npx verfix init`, Node 20+, no Docker, no signup; the default strict mode uses zero AI. It generates an `AGENTS.md` section so your agent knows the contract without being told.

The design position, stated plainly, is contrarian for 2026: **never use an LLM where a selector, an assertion, or a retry solves the problem.** AI appears in Verfix only as an optional repair mechanism (healing a drifted selector, exploratory first passes) — never as the judge. Loops are about to get much more autonomous. The more autonomous the act step gets, the more the observe step has to be something nobody — human or model — can talk their way past.

Close your loops.

*Repo: [github.com/verfix-dev/verfix](https://github.com/verfix-dev/verfix) · Benchmark methodology: [github.com/verfix-dev/verfix/tree/main/benchmark](https://github.com/verfix-dev/verfix/tree/main/benchmark) · If you run the benchmark with your agent, I want to see the numbers.*
