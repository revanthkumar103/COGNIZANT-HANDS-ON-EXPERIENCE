# Cognizant Digital Nurture 5.0 — Java Full Stack Engineer

Hands-on lab solutions, mini-projects, and microservices built as part of Cognizant's **Digital Nurture 5.0 (DN 5.0)** Java Full Stack Engineer training program.

**Author:** Gurrammagari Revanth Kumar
**Program:** Cognizant DN 5.0 — Java Full Stack Engineer
**Institution:** R.M.K Engineering College, Tamil Nadu

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Language | Java 17/21, JavaScript |
| Backend | Spring Core, Spring Boot 3/4, Spring Data JPA, Spring Cloud (Eureka) |
| Database | Oracle PL/SQL, H2 (in-memory), Hibernate ORM |
| Testing | JUnit 5, Mockito |
| Logging | SLF4J, Logback |
| Frontend | React.js, Angular |
| Build Tools | Maven |
| Version Control | Git, GitHub |

---

## Repository Structure

MHO-COGNIZANT/
├── Week-1/
│ ├── Data_Structures_Algorithms/ # Search algorithms, recursion (financial forecasting)
│ ├── Design_Principles_Patterns/ # Singleton, Factory Method design patterns
│ ├── PLSQL_Programming/ # Control structures, stored procedures
│ └── SLF4J_Logging_Framework/ # Structured logging with SLF4J + Logback
│
├── Week-2/
│ ├── Spring_Core_and_Maven/ # IoC container, dependency injection (XML-based)
│ └── Spring_Data_JPA_Boot_Hibernate/ # JPA repositories, Hibernate ORM, H2 database
│
├── Week-3/
│ └── Spring_REST_Spring_Boot_3/ # REST APIs, JWT authentication
│
├── Week-4/
│ └── Microservices_Spring_Boot_3_Cloud/
│ ├── Account & Loan microservices # Independent Spring Boot REST services
│ └── Eureka Discovery Server # Service registry and discovery
│
├── Week-5/
│ └── React/ # Component-based SPA fundamentals
│
└── Week-6/
├── Angular/ # Angular fundamentals
└── GIT/ # Git version control hands-on labs

---

## Highlights

- **Design Patterns** — Singleton and Factory Method implemented with working test verification.
- **Algorithms** — Linear vs. Binary Search complexity analysis; recursive financial forecasting with Big-O breakdown.
- **PL/SQL** — Cursor-based control structures and stored procedures against a multi-table banking schema (Customers, Accounts, Loans, Transactions).
- **Spring Core** — Dependency Injection demonstrated via both constructor and setter injection, XML-based bean configuration.
- **Spring Data JPA** — CRUD operations via `JpaRepository`, with a written comparison of JPA vs. Hibernate vs. Spring Data JPA.
- **Microservices** — Independently deployable Account and Loan services registered with a Eureka Discovery Server, demonstrating service discovery over hardcoded URLs.

---

## Running the Projects

Each exercise is a self-contained Maven (or npm, for React) project.

**Java/Spring projects:**
```bash
cd <exercise-folder>
mvn clean install
mvn spring-boot:run    # for Spring Boot apps
```

**React projects:**
```bash
cd <exercise-folder>
npm install
npm start
```

---

## Notes

- PL/SQL exercises were executed and verified using Oracle FreeSQL (browser-based, zero-install Oracle DB).
- Microservices use an in-memory H2 database for simplicity; no external DB setup required.
- Build artifacts (`target/`, `node_modules/`) are excluded via `.gitignore`.
