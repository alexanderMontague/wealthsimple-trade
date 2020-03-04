# Wealthsimple Trade Desktop Client

WIP

Running:
- bootstrapped with Lerna
- run `lerna bootstrap` in the top level
- run `lerna run start` to start all services
- TODO: docs once its done

Story:
- I want a web application that can be viewed on a computer or mobile phone that instantly lets me see how my investments are doing
- I want to be able to view watch list, and holdings in every account
- I want visualizations showing how my investments are doing over time
- Using all information instantly pulled from WS Trade, I want a quick look into how I am doing and also how I can purchase options

Requirements:
- sign into WST account
- View current accounts
- view current balances
- graphically display account balances
- place an investment
- notifications when prices hit certain limits

Architecture:
- Typescript across the board (UI lib does not support TS :/ only on BE)
- React/Redux frontend with (GraphQL?) communicating to the backend
- Node/Express api
- Separate service for cron?
- Kafka communicating between services if needed
- PSQL to hold sanitized data about logged in users (we're not creating accounts)

Pages:
- /holdings
    - main view of portfolio
    - ability to select different accounts
    - charts with supported timelines from WST of account
    - show breakdown of options in portfolio 
- /watchlist
    - where you can search for a ticker
    - have graph on that option
    - show watchlist
    - also where you can purchase options?

