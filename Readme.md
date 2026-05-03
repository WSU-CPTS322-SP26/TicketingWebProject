# Tickr

A full-stack web application for browsing movies and booking cinema tickets. Built with Spring Boot, React, and PostgreSQL (Supabase).

> **Note:** The project is in active development. See [Known Issues](#known-issues) for current limitations.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
   - [Clone the Repository](#1-clone-the-repository)
   - [Backend Setup](#2-backend-setup)
   - [Frontend Setup](#3-frontend-setup)
   - [Seed the Database](#4-seed-the-database)
4. [Development](#development)
5. [Functionality](#functionality)
6. [CI/CD](#cicd)
7. [Known Issues](#known-issues)
8. [Contributing](#contributing)
9. [Troubleshooting](#troubleshooting)
10. [Additional Documentation](#additional-documentation)
11. [License](#license)

---

## Tech Stack

**Backend**
- Framework: Spring Boot 4.0.3
- Language: Java 21
- Database: PostgreSQL (Supabase)
- ORM: Hibernate / Spring Data JPA

**Frontend**
- Framework: React 18
- Build Tool: Vite
- Node Version: 20

---

## Prerequisites

| Tool | Version |
|------|---------|
| Git  | any     |
| Java | 21+     |
| Node | 20+     |

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/WSU-CPTS322-SP26/TicketingWebProject.git
cd TicketingWebProject
```

### 2. Backend Setup

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

Backend runs on the local development server.

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs on the local development server.

### 4. Seed the Database

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

---

## Development

Run both servers simultaneously in two terminals:

```bash
# Terminal 1 Backend
cd backend && ./mvnw spring-boot:run

# Terminal 2 Frontend
cd frontend && npm run dev
```

---

## Functionality

**Browse Movies** The homepage displays currently showing movies in a scrollable carousel. Each card shows the poster, title, description, and a Book Now button.

**Booking Page** Clicking Book Now takes you to the Booking Page with movie details, a date selector (Friday through Wednesday), and theaters with showtimes that update per selected date.

**Seat Selection** A 10x14 seat grid with four seat types: Available, Unavailable, Selected, and Wheelchair. Click to select or deselect. A booking panel on the right shows cinema, date, time, seats, and total price. Confirm Booking activates once seats are selected.

**Offers and Promotions** The homepage includes current deals: Student Saturdays, Group Bookings, and Snack and Save Combo.

**Sign In** Click the user icon in the navbar to open the sign in modal and authenticate with email and password.

---

## CI/CD

The project uses GitHub Actions for automated testing and building.

Required Secrets (GitHub Settings > Environments > Production):

| Secret | Description |
|--------|-------------|
| `SUPABASE_DB_URL` | PostgreSQL JDBC URL |
| `SUPABASE_DB_USERNAME` | Database username |
| `SUPABASE_DB_PASSWORD` | Database password |

---

## Known Issues

* React tests need initialization configuration as the frontend is not fully tested
* Frontend CI was failing due to package-lock.json being out of sync (missing yaml@2.8.3). Run npm install in the frontend folder if this occurs

---

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -m 'Add feature'`
3. Push and submit a pull request

Branch naming convention: sri/feature-name, param/feature-name, raj/feature-name

Never push directly to main. All changes must go through a pull request and be reviewed before merging.

---

## Troubleshooting

**Supabase "max clients reached" error**

This is caused by Supabase connection pooling limits. To run the backend without a live database connection:

```bash
./mvnw spring-boot:run \
-Dspring.autoconfigure.exclude=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration
```

---

## Additional Documentation

| Resource | Link |
|----------|------|
| Sprint 1 Report | [View](https://github.com/WSU-CPTS322-SP26/TicketingWebProject/blob/main/Sprint_reports/Sprint1_report.md) |
| Sprint 2 Report | [View](https://github.com/WSU-CPTS322-SP26/TicketingWebProject/blob/main/Sprint_reports/Sprint2_report.md) |
| Sprint 3 Report | [View](URL) |
| Sprint 1 Demo | https://youtu.be/IIk4GXUgsiA |
| Sprint 2 Demo | https://youtu.be/Jx_9C3aeXBg |
| Sprint 3 Demo | https://www.youtube.com/watch?v=aU3PJTz6XEg |

---

## License

This project is licensed under the [MIT License](LICENSE.txt).
