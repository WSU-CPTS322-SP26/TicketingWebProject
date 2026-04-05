# Tickr

A full-stack web application for managing event tickets and bookings. Built with Spring Boot, React, and PostgreSQL (Supabase).

> Note: The project is in active development. See [Known Issues](#known-issues) for current limitations.

## Tech Stack

Backend
- Framework: Spring Boot 4.0.3
- Language: Java 21
- Database: PostgreSQL (Supabase)
- ORM: Hibernate / Spring Data JPA

Frontend
- Framework: React 18
- Build Tool: Vite
- Node Version: 20

## Prerequisites

| Tool | Version |
|------|---------|
| [Git](https://git-scm.com/) | any |
| [Java](https://www.oracle.com/java/technologies/downloads/) | 21+ |
| [Node](https://nodejs.org/) | 20+ |

## Installation

Clone the repository

```bash
git clone https://github.com/WSU-CPTS322-SP26/TicketingWebProject.git
cd TicketingWebProject
```

Backend Setup

```bash
cd backend
```

Configure environment variables:

```bash
export SUPABASE_DB_URL=jdbc:postgresql://your-host:5432/your-db?sslmode=require
export SUPABASE_DB_USERNAME=your_username
export SUPABASE_DB_PASSWORD=your_password
```

Run the backend:

```bash
./mvnw clean install
./mvnw spring-boot:run
```

Backend runs on the local development server

Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs on the local development server

### Seed the Database

Run these SQL scripts in your Supabase SQL Editor to populate test data:

```sql
-- Insert theaters
INSERT INTO theaters (name, location, pin_code, is_active) VALUES
('Tickr Cinema Downtown', 'Pullman, WA', '99163', true),
('Tickr Cinema Eastside', 'Moscow, ID', '83843', true);

-- Insert screens (use your actual theater IDs)
INSERT INTO screens (theater_id, screen_name, total_seats) VALUES
(1, 'Screen 1', 120), (1, 'Screen 2', 80), (1, 'IMAX', 200),
(2, 'Screen 1', 100), (2, 'Screen 2', 60);

-- Insert movies
INSERT INTO movies (title, description, genre, duration_minutes, rating, poster_url) VALUES
('Crime 101', 'A master thief and an insurance broker join forces for a big heist.', 'Crime', 112, 'PG-13', '/crime101.jpg'),
('Hamnet', 'William Shakespeare and his wife celebrate the birth of their son Hamnet.', 'Drama', 98, 'PG', '/hamnet.jpg'),
('Send Help', 'A woman and her overbearing boss become stranded on a deserted island.', 'Comedy', 105, 'PG-13', '/sendhelp.jpg'),
('Wuthering Heights', 'Heathcliff falls in love with Catherine Earnshaw in 18th-century England.', 'Romance', 120, 'PG', '/wuthering.jpg'),
('Mercy', 'An advanced AI judge puts a detective on trial for the murder of his wife.', 'Thriller', 95, 'R', '/mercy.jpg'),
('Scream 7', 'A new Ghostface killer emerges targeting Sidney''s daughter.', 'Horror', 110, 'R', '/scream7.jpg');

-- Insert a test user (password is BCrypt hash of 'manager123')
INSERT INTO users (name, phone, email_id, password, role) VALUES
('Admin Manager', '9999999999', 'manager@cinema.com',
'$2a$12$tqhHw4ngeuHxETb5VXrGsu1bNLuCxFdObp.E0n3DAMqyW3oevfmum', 'manager');
```

## Development

```bash
# Terminal 1 - Backend
cd backend && ./mvnw spring-boot:run

# Terminal 2 - Frontend
cd frontend && npm run dev
```

## Functionality

**Browse Movies** — The homepage displays currently showing movies in a scrollable carousel. Each movie card shows the poster, title, description, and a Book Now button.

**Booking Page** — Clicking Book Now on any movie takes you to the Booking Page, which shows movie details, a date selector (Friday through Wednesday), theaters with showtimes that update per selected date, and navigation to Seat Selection on clicking a showtime.

**Seat Selection** — A 10 x 14 seat grid with seat types (Available, Unavailable, Selected, Wheelchair). Click to select or deselect seats. A booking panel on the right shows cinema, date, time, selected seats, and total price. The Confirm Booking button activates once seats are selected.

**Offers & Promotions** — The homepage includes a promotions section with current deals including Student Saturdays, Group Bookings, and Snack & Save Combo.

**Sign In** — Click the user icon in the navbar to open the sign-in modal and authenticate with your email and password.

## CI/CD

The project uses GitHub Actions for automated testing and building.

Required Secrets (GitHub Settings → Environments → Production):
- `SUPABASE_DB_URL` - PostgreSQL JDBC URL
- `SUPABASE_DB_USERNAME` - Database username
- `SUPABASE_DB_PASSWORD` - Database password

## Known Issues

1. Frontend is not fully integrated - React tests need initialization configuration
2. Frontend not connected to backend - movie data is currently hardcoded in the frontend. Will be addressed in Sprint 3.
3. Showtimes table empty - no showtime data has been seeded yet. Will be addressed in Sprint 3.
4. Frontend CI failing - `package-lock.json` is out of sync with `package.json` (missing `yaml@2.8.3`). Run `npm install` in the frontend folder to fix.
5. CORS and BCrypt PRs pending - pull requests #29 (CORS) and #32 (BCrypt) are open but not yet merged into main.

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add feature'`
3. Push and submit a pull request

**Branch naming convention:** `sri/feature-name`, `param/feature-name`, etc.
**Never push directly to main.** All changes must go through a pull request and be reviewed before merging.

## Troubleshooting (Supabase Connection)

If you encounter a database connection error such as "max clients reached", this is due to Supabase connection pooling limits. To run the backend locally for testing, you can start the application without database auto-configuration:

```bash
./mvnw spring-boot:run \
-Dspring.autoconfigure.exclude=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration
```

This allows the backend to start and be tested without requiring a live database connection.

## Additional Documentation

* [Sprint 1 Report](Sprint_reports/Sprint1_report.md)


## Youtube Link
- Sprint 1: https://youtu.be/IIk4GXUgsiA
- Sprint 2: 

## License

This project is licensed under the MIT License.
