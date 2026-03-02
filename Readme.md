# Tickr

A full-stack web application for managing event tickets and bookings. Built with Spring Boot, React, and PostgreSQL (Supabase).

> **Note:** The project is in active development. See [Known Issues](#known-issues) for current limitations.

---

## Tech Stack

### Backend
- **Framework:** Spring Boot 4.0.3
- **Language:** Java 21
- **Database:** PostgreSQL (Supabase)
- **ORM:** Hibernate / Spring Data JPA

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Node Version:** 20

---

## Prerequisites

| Tool | Version |
|------|---------|
| [Git](https://git-scm.com/) | any |
| [Java](https://www.oracle.com/java/technologies/downloads/) | 21+ |
| [Node](https://nodejs.org/) | 20+ |

---

## Installation

### 1. Clone the repository

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

Backend runs at `http://localhost:8080`

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## Development

```bash
# Terminal 1 - Backend
cd backend && ./mvnw spring-boot:run

# Terminal 2 - Frontend
cd frontend && npm run dev
```

---

## CI/CD

The project uses GitHub Actions for automated testing and building.

**Required Secrets** (GitHub Settings → Environments → Production):
- `SUPABASE_DB_URL` - PostgreSQL JDBC URL
- `SUPABASE_DB_USERNAME` - Database username
- `SUPABASE_DB_PASSWORD` - Database password

---

## Known Issues

1. **Frontend is not fully integrated** - React tests need initialization configuration
2. **Backend API endpoints** - Not all endpoints are connected to the frontend UI yet
3. **Database integration** - Schema initialization in progress

---

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add feature'`
3. Push and submit a pull request

---

## License

This project is licensed under the MIT License.