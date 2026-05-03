# Sprint 3 Report (4/05/2026 - 5/02/2026)

## What's New (User Facing)
* Movies on the Home Page now load from the live backend API instead of hardcoded data
* Showtimes on the Booking Page pull dynamically from Supabase per selected date
* Seat availability on the Seat Selection Page reflects real data from the backend
* Booking confirmation is submitted to and stored in the database

## Work Summary (Developer Facing)
This sprint focused on connecting the React frontend to the Spring Boot backend API built in Sprint 2. Raj replaced hardcoded movie data in HomePage.js with live API calls to the movies endpoint, wired up dynamic showtimes on the Booking Page, and connected seat availability and booking confirmation to the backend. Sri populated the showtimes table in Supabase so the showtimes endpoint became usable. The frontend CI pipeline failure from Sprint 2 was resolved by fixing the package-lock.json sync issue. Git rebase was used consistently this sprint, keeping the branch history clean.
 
## Unfinished Work
N/A
 
## Completed Issues/User Stories
* [#30 Fix frontend CI failure: package-lock.json out of sync](https://github.com/WSU-CPTS322-SP26/TicketingWebProject/issues/30)

## Incomplete Issues/User Stories
* [#20 Merge all feature branches into main before API implementation](https://github.com/WSU-CPTS322-SP26/TicketingWebProject/issues/20) — We ran out of time to complete the full frontend to backend connection this sprint.
* [#7 Establish Initial Frontend Backend Connection](https://github.com/WSU-CPTS322-SP26/TicketingWebProject/issues/7) — This was the primary Sprint 3 goal but was not fully completed as some data remains hardcoded.
* [#6 Configure Test API Endpoints for Frontend Development](https://github.com/WSU-CPTS322-SP26/TicketingWebProject/issues/6) — Blocked, did not get to this issue as higher priority tasks took precedence.
* [#3 Project Initialization Checklist](https://github.com/WSU-CPTS322-SP26/TicketingWebProject/issues/3) — Blocked, carried over from Sprint 1 and not completed.

## Code Files for Review
* [HomePage.js](https://github.com/WSU-CPTS322-SP26/TicketingWebProject/blob/main/frontend/src/HomePage.js)
* [App.js](https://github.com/WSU-CPTS322-SP26/TicketingWebProject/blob/main/frontend/src/App.js)
* [AuthContext.js](https://github.com/WSU-CPTS322-SP26/TicketingWebProject/blob/main/frontend/src/context/AuthContext.js)
* [MovieController.java](https://github.com/WSU-CPTS322-SP26/TicketingWebProject/blob/main/backend/src/main/java/edu/wsu/cpts322/project/backend/controllers/movies/MovieController.java)

## Retrospective Summary
Here's what went well:
* Frontend successfully connected to the backend API for the first time
* CI pipeline fixed on day 1 with no recurring failures this sprint
* Git rebase kept branch history clean throughout
* Demo video covered the full application walkthrough clearly

Here's what we'd like to improve:
* API integration should have started earlier instead of carrying it from Sprint 2
* More consistent communication on who owns which endpoint connection
* Frontend CI should never be left broken across sprints

If the project were to continue, the team would focus on:
* Replacing remaining hardcoded data with live API calls across all pages
* Adding location based theater filtering so users see theaters near them
* Implementing role based access control so managers and regular users have different permissions
* Continuing UI improvements across the booking flow
 
