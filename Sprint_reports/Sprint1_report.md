# Sprint 1 Report (1/12/2026 - 3/01/2026)

## What's New (User Facing)

- Built the whole UI and navigation
- Hooked up Supabase database
- Spring Boot API for ticket stuff
- Database schema for events and seats

## Work Summary

We got the core infrastructure working this sprint. Connected Spring Boot to Supabase, set up the database, and scaffolded the React frontend with Vite. Hit a wall early on with GitHub Actions - secrets were in the wrong place (Environment instead of repo-level), which tanked the CI pipeline. Once we fixed that, tests started passing. The frontend components are built but not actually talking to the backend yet. We're using mock data for now so the UI team could work independently.

## What Didn't Get Done

Two main things are still pending:

Issue #6 and #7 - Frontend and backend aren't connected yet. We need CORS setup and environment variables configured before we can wire everything together. Pushing that to Sprint 2 since database stability was the priority.

## Completed

- https://github.com/WSU-CPTS322-SP26/TicketingWebProject/issues/8 - Add JDBC Configuration for Supabase Data Access
- https://github.com/WSU-CPTS322-SP26/TicketingWebProject/issues/1 - Unable to connect to Supabase PostgreSQL Instance
- https://github.com/WSU-CPTS322-SP26/TicketingWebProject/issues/5 - Add README Documentation for Project Structure
- https://github.com/WSU-CPTS322-SP26/TicketingWebProject/issues/4 - Populate frontend/ with required React framework and libs
- https://github.com/WSU-CPTS322-SP26/TicketingWebProject/issues/11 - Debug frontend-ci and backend-ci failed tests
- https://github.com/WSU-CPTS322-SP26/TicketingWebProject/issues/2 - Populate secrets in Github for CI Pipeline
- https://github.com/WSU-CPTS322-SP26/TicketingWebProject/issues/9 - Rename "backend" and "frontend" branches to allow nested development branches

## Not Done

- https://github.com/WSU-CPTS322-SP26/TicketingWebProject/issues/6 - Configure Test API Endpoints for Frontend Development (blocked by CORS stuff)
- https://github.com/WSU-CPTS322-SP26/TicketingWebProject/issues/7 - Establish Initial Frontend-Backend Connection (environment variables and endpoint testing still needs work)

## Code to Review

- [BackendApplication.java](https://github.com/WSU-CPTS322-SP26/TicketingWebProject/blob/main/backend/src/main/java/edu/wsu/cpts322/project/backend/BackendApplication.java)
- [HomePage.jsx](https://github.com/WSU-CPTS322-SP26/TicketingWebProject/blob/main/frontend/src/pages/HomePage.jsx)
- [ci.yml](https://github.com/WSU-CPTS322-SP26/TicketingWebProject/blob/main/.github/workflows/ci.yml)

## Retrospective

What went well:
- GitHub Actions setup actually works once you figure out the secrets thing
- React + Vite is clean and responsive
- Database integration was smooth

What sucked:
- Spent way too much time debugging CI before realizing secrets were in the wrong place
- Underestimated how much work frontend-backend integration would be
- Should've planned environment config from day one

Next sprint:
- Actually connect frontend to backend
- Get the seat selection UI working
- Add email notifications for ticket purchases
- Set up proper auth on the API