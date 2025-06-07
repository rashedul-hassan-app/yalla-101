# yalla-101
A small starter template having front end and backend


📱 Frontend
Checkout the correct Backend branch to work with your project

```
cd backend
git checkout frontend-exam 
npm i && npm start
```

Task 1: Patient List with Search & Infinite Scroll
<details>
- Screen: searchable list.

- Features:
    - Infinite scroll (append pages): already implemented, inspect code for bugs, refactor, improve
    - (extra) Add Loading / empty / error states
</details>

Task 2: Offline-First Cache & Background Sync

<details>
Enhancement: wrap Q1 list with caching layer:

- Load last-cached results immediately from AsyncStorage.

- Fetch fresh in background → update UI + cache.

- Display “Last updated … ago.”
- </details>




<br />
🧮 BACKEND 🧮
<details>
**Task 1 (20 min): Paginated Patient Search**
What to build

- Endpoint: GET /patients

- Query args:

    - q (string, min length 2)
    
    - page (integer ≥1, default 1)
    
    - limit (1–50, default 10)
    
    - dobBefore (optional ISO date)

- Behavior:

    1. Validate inputs, return 400 on error.

    2. Filter an in-memory array of 50 patients by name substring and, if given, only those born before dobBefore.

    3. Paginate the results and return JSON:

    ```
    { "total": 123, "page": 2, "limit": 10, "data": [ /* patients */ ] }
    ```
**Deliverables**

- A validation schema (Joi/Zod) for the query.

- A service function searchPatients(q, page, limit, dobBefore).

- The Express route wiring it all up.

</details>

**Task 2 (20 min): Appointment Scheduling with Conflict**

<details>
What to build

- Endpoint: POST /appointments

- Body:
    ```
    {
      "patientId": "…",
      "doctorId":  "…",
      "start":     "2025-05-10T14:00:00Z",
      "end":       "2025-05-10T15:00:00Z"
    }
    ```
- Behavior:

    1. Parse and validate that both timestamps are ISO and end > start. Return 400 on invalid.
    
    2. Check an in-memory list of appointments for the same doctor—reject (409) if any overlap.
    
    3. Otherwise, store the new appointment and return 201 + the record.

**Deliverables**

- A small time-parsing util (e.g. Luxon or new Date).

- A service scheduleAppointment(raw) that throws { status, message } on errors.

- The Express route handling those errors and sending correct HTTP codes.
</details>