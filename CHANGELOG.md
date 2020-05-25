
## current master
* feat: add `hasLinkAccountCard` for account linking
* fix: correct standard card error messages to say "standard card"

## 2.4.0
* update libraries
* null check for `AudioPlayerValidatior`
* feat: add `withSlotConfirmation` to support slot confirmation
* feat: add `withIntentConfirmation` to support intent confirmation

## 2.3.0
* feat: add debug flag to TestSettings (add #9)
* feat: support integration testing with real Lambda functions (add #8)

## 2.2.0
* feat: add `elicitsForIntent` to support intent chaining
* feat: add `withUserAccessToken` to provide account linking (fix #6)
* update dependencies

## 2.1.0
* fix: throw correct error when slot elicitation fails
* update dependencies

## 2.0.5
* fix `nock` dependency

## 2.0.4
* fix default values for persistence keys to match ASK defaults

## 2.0.3
* add `withProfile` option to test ProfileAPI
* allow overriding of session attributes in `withSessionAttributes`

## 2.0.2
* add supportedInterfaces to request builder
* add missing feature `withSessionAttributes` (#3)
* add validator for video playback

## 2.0.1
* adding more supported types to attributes check
* fix typo in builder method

## 2.0.0
First release of rewritten version 