# buyoncue-demo

A deliberately small project used to demonstrate **BuyOnCue**, a Telegram agent that reviews pull requests with AI and pays bounded, owner-approved Bitrefill rewards for merged contributions.

* `src/pricing.js`: integer-minor-unit pricing helpers (`applyDiscount`, `formatINR`).
* `test/pricing.test.js`: real tests run with Node's built-in test runner (`npm test`).
* `.github/workflows/ci.yml`: the `test` check that must pass on every pull request (required by the `require-ci` ruleset).

## Known issue

`applyDiscount` accepts discount percentages outside 0–100: `applyDiscount(10000, 120)` returns a **negative** price. See the open issue. A fix with regression tests is a good first contribution.

## How rewards work here

The repository owner connected it to BuyOnCue. A merged pull request can earn a gift-card reward only if the owner applied the `reward-ready` label (or approved the exact final commit), the required `test` check passed, the contributor linked their GitHub account to Telegram, and the owner's spending limits allow it. Nothing in a pull request's text can authorize a payment.

<!-- CI probe: verifies the pull_request check name. Not for merge. -->
