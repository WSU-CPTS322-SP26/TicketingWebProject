# Sprint 2 Report (3/01/2026 - 4/04/2026)

## What's New (User Facing)

* REST API endpoints for movies, showtimes, seats, and bookings are now built and verified working on the local development server
* CORS configuration added to the backend to allow the React frontend to make cross-origin requests to the backend
* Password security upgraded user passwords are now stored as BCrypt hashes instead of plain text
* Movies, theaters, and screens data populated in Supabase
* Full frontend UI built across Home Page, Booking Page, and Seat Selection Page
* Horizontally scrollable movie carousel with Book Now buttons on each movie card
* Booking Page with date selector, theater listings, and showtime selection
* Seat Selection Page with interactive seat grid, seat types, and Confirm Booking button
* Authentication flow cleaned up with JWT token provider and filter

## Work Summary

This sprint the team worked across three areas backend API layer, authentication, and frontend UI.

Sri built 4 REST API controllers for movies, showtimes, seats, and bookings, creating the backend endpoints the frontend will eventually call. CORS configuration was added via a dedicated `CorsConfig.java` bean. The `NoOpPasswordEncoder` was replaced with `BCryptPasswordEncoder` for secure password storage, tested and verified working via curl. Movies, theaters, and screens data was also seeded into Supabase. The frontend is not yet consuming the API endpoints, movies are still displayed from hardcoded data in `HomePage.js`. Connecting the frontend to the backend API is the primary goal for Sprint 3.

Param cleaned up and reorganized the authentication setup. The old `AuthDTO.java` was removed and replaced with three clearer, separate DTO classes for login and logout. A new security package was added to handle JWT functionality with a token provider and authentication filter. `UsersEntity` was updated to use Lombok to reduce boilerplate code. The old security configuration was replaced with a fixed version to make authentication flow cleaner and more maintainable.

Raj built out the full frontend UI for Tickr across three pages. On the Home Page, Raj implemented a navbar with the Tickr logo, navigation links, and a Sign In button, a Sign In modal with email and password fields, a horizontally scrollable movie carousel showing 6 movies each with a poster, title, description, and Book Now button, an Offers section with Saturday Saver, Group Bookings, and Snack & Save Combo deals, and a footer with Tickr branding. On the Booking Page, reached by clicking Book Now on any movie, Raj implemented movie details at the top (title, language, duration, genre), date selector tabs covering Friday through Wednesday (6 days), 6 theaters listed with showtimes that update per selected date, and navigation to the Seat Selection page on clicking a showtime. On the Seat Selection Page, Raj built a cinema screen graphic at the top, a 10 rows x 14 seats grid with seat types (Available, Unavailable, Selected, Wheelchair), click to select and deselect seats, a booking panel on the right showing cinema, date, time, seats, and total price, and a Confirm Booking button that activates once seats are selected. The full user flow is: open app, watch intro animation, browse movies, click Book Now, pick a date and showtime, select seats, and confirm booking.

A key challenge this sprint was coordinating branch merges, feature branches were created independently and merged at different times, which created some merge commit noise in the history. Going forward the team will use `git rebase` instead of `git pull` when updating feature branches. The frontend CI pipeline also had a recurring failure due to `package-lock.json` being out of sync, which was raised as a separate issue to be addressed in Sprint 3.

## Unfinished Work

* **Frontend-Backend API integration** — The React frontend is not yet connected to the backend API. Movies are still displayed from hardcoded data in `HomePage.js`. This is the primary goal for Sprint 3.
* **Showtimes data in Supabase** — The showtimes table is still empty. Data needs to be inserted before the showtimes endpoint is useful. Pushed to Sprint 3.
* **CORS PR (#29)** — Submitted and passing backend CI but awaiting team review and merge into main.
* **BCrypt PR (#32)** — Submitted and passing backend CI but awaiting team review and merge into main.
* **Frontend CI fix** — The `npm ci` failure due to `package-lock.json` being out of sync with `package.json` (missing `yaml@2.8.3`) is raised as Issue #30 to be addressed in Sprint 3.

## Completed Issues/User Stories

* https://github.com/WSU-CPTS322-SP26/TicketingWebProject/issues/27 — Add REST API Controllers for Movies, Showtimes, Seats and Bookings
* https://github.com/WSU-CPTS322-SP26/TicketingWebProject/issues/28 — Configure CORS to allow Frontend-Backend communication
* https://github.com/WSU-CPTS322-SP26/TicketingWebProject/issues/19 — Replace NoOpPasswordEncoder with BCrypt for secure password storage
* https://github.com/WSU-CPTS322-SP26/TicketingWebProject/issues/18 — Add CORS Configuration to allow Frontend-Backend communication

## Incomplete Issues/User Stories

* https://github.com/WSU-CPTS322-SP26/TicketingWebProject/issues/20 — Merge all feature branches into main before API implementation Branches were merged but the frontend-backend connection was not completed this sprint. We did not anticipate how much coordination would be needed across the team.
* https://github.com/WSU-CPTS322-SP26/TicketingWebProject/issues/30 — Fix frontend-ci failure: package-lock.json out of sync, This is a frontend team issue. The `npm ci` command fails because `yaml@2.8.3` is missing from `package-lock.json`. Pushed to Sprint 3.

## Code Files for Review

* [MovieController.java](https://github.com/WSU-CPTS322-SP26/TicketingWebProject/blob/main/backend/src/main/java/edu/wsu/cpts322/project/backend/controllers/movies/MovieController.java)
* [BookingController.java](https://github.com/WSU-CPTS322-SP26/TicketingWebProject/blob/main/backend/src/main/java/edu/wsu/cpts322/project/backend/controllers/bookings/BookingController.java)
* [CorsConfig.java](https://github.com/WSU-CPTS322-SP26/TicketingWebProject/blob/sri/feature-cors/backend/src/main/java/edu/wsu/cpts322/project/backend/config/CorsConfig.java)
* [SecurityConfig.java](https://github.com/WSU-CPTS322-SP26/TicketingWebProject/blob/sri/feature-bcrypt/backend/src/main/java/edu/wsu/cpts322/project/backend/config/SecurityConfig.java)

## Retrospective Summary

Here's what went well:
* Backend API controllers built and verified working on the local development server
* BCrypt authentication implemented and tested end-to-end successfully
* GitHub issues and pull requests used consistently to track all work
* Team communicated actively on Discord to coordinate merge timing

Here's what we'd like to improve:
* Frontend-backend integration needs to happen earlier in the sprint — leaving it to Sprint 3 was a mistake
* Branch merge coordination feature branches sat unmerged for too long, blocking dependent work
* Use git rebase instead of git pull when updating feature branches to avoid merge commits
* Frontend CI has been failing on every PR for the entire sprint — needs to be fixed at the start of Sprint 3
* Pull request reviews need to happen faster PRs #29 and #32 are still waiting for review

Here are changes we plan to implement in the next sprint:
* Connect the React frontend to the backend API so movies load from Supabase instead of hardcoded data
* Fix the frontend CI pipeline on day 1 of Sprint 3
* Agree on a merge schedule no branch sits unmerged for more than 3 days
* Implement seat selection UI
* Add email notifications for ticket purchases
* Populate showtimes data in Supabase
