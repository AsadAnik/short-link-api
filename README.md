## 🔧 Project Overview
**TypeScript + Express + MySQL + Docker + Clean Architecture**.

### 🧠 **Features**
1. ✅ Public: Shorten URL (up to 2 times)
2. 🔐 Auth:
   - Register
   - Login (JWT)
3. 🧮 Track:
   - Credits left (start with 100 after login)
   - URLs shortened count
4. 📊 Stats (optional later):
   - URLs shortened by user
   - Analytics (clicks etc.)

---

## 🧱 Tech Stack & Patterns

- **Language**: TypeScript
- **Framework**: Express
- **DB**: MySQL (via Prisma ORM or raw)
- **Auth**: JWT
- **Validation**: Zod / class-validator
- **Structure**: Layered (clean-ish):
  ```
  src/
  ├── app.ts
  ├── server.ts
  ├── config/
  ├── routes/
  ├── controllers/
  ├── services/
  ├── repositories/
  ├── models/       ← MySQL schema (via Prisma or raw SQL)
  ├── middlewares/
  ├── utils/
  └── types/
  ```

---

## ✅ Step 1: Define Core Models

### `User` Table
```sql
id          INT (PK)
email       VARCHAR UNIQUE
password    VARCHAR
credits     INT DEFAULT 100
created_at  DATETIME
```

### `Url` Table
```sql
id          INT (PK)
original    TEXT
short       VARCHAR UNIQUE
user_id     INT (nullable for guest)
clicks      INT DEFAULT 0
created_at  DATETIME
```

---

## ✅ Step 2: Feature Flow Plan

| Feature           | Route                 | Auth Required | Notes |
|------------------|-----------------------|---------------|-------|
| Shorten (guest)  | `POST /api/shorten`   | ❌ (limit 2)  | Save IP to rate limit |
| Register         | `POST /api/auth/signup` | ❌          | Store hashed password |
| Login            | `POST /api/auth/login`  | ❌          | Return JWT token |
| Shorten (auth)   | `POST /api/shorten`   | ✅            | Check credits |
| Track credits    | `GET /api/user/stats` | ✅            | Show credits, url count |
| Redirect         | `GET /:short`         | ❌            | Lookup and redirect |

---

## ✅ Step 3: Suggested Next Steps to Implement

### 1. **Set up Docker + MySQL**  
Want me to generate a `docker-compose.yml` with MySQL + adminer?

### 2. **Set up DB & Models**  
We’ll use Prisma or MySQL schema (your choice). Prefer Prisma?

### 3. **Start with these API routes**
- [ ] `POST /api/shorten` (public)
- [ ] `POST /api/auth/signup`
- [ ] `POST /api/auth/login`
- [ ] `GET /:short`

---

