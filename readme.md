# 🚀 Ascend – Campus Placement & Drive Management System

Ascend is a role-based web application designed to streamline and digitize the campus placement process.

Traditional placement management often relies on spreadsheets, emails, and WhatsApp groups, leading to missed deadlines, poor tracking, and inefficient workflows. Ascend solves this by providing a centralized platform where students can request participation in placement drives and placement officers can manage the entire hiring workflow.

---

## 📌 Features

### 👨‍🎓 Student Features

- User Registration & Login
- Student Profile Management
- Resume Upload
- View Available Placement Drives
- View Detailed Job Information
- Request Participation in Drives
- Track Application Status
- View All Applications

### 👨‍💼 Admin Features

- Create Placement Drives
- Edit Placement Drives
- Delete Placement Drives
- View All Drives
- View Drives Posted by Admin
- Manage Student Requests
- Approve / Reject Applications
- Shortlist Candidates
- Update Hiring Status
- Dashboard Overview

---

## 🔄 Application Workflow

```text
Student
   │
   ▼
Request to Join Drive
   │
   ▼
Admin Reviews Request
   │
   ├── Approve
   │       │
   │       ▼
   │  Student Enters Process
   │       │
   │       ▼
   │  Shortlisted / Rejected
   │       │
   │       ▼
   │     Selected
   │
   └── Reject
```

---

## 📊 Application Statuses

| Status | Description |
|----------|-------------|
| Requested | Student requested participation |
| Approved | Admin approved request |
| Shortlisted | Student cleared a round |
| Rejected | Student eliminated |
| Selected | Final selection |

---

## 🏗️ System Architecture

### User Roles

#### Student

- Complete profile
- Upload resume
- Browse drives
- Request participation
- Track application status

#### Admin (Placement Officer)

- Manage drives
- Manage applicants
- Approve / reject requests
- Track hiring rounds
- Update student status

---

## 🗄️ Database Design

### User

| Field | Type |
|---------|---------|
| id | PK |
| name | String |
| email | Unique |
| password | String |
| role | student/admin |
| created_at | DateTime |

---

### StudentProfile

| Field | Type |
|---------|---------|
| id | PK |
| user_id | FK |
| studentname | String |
| phone | String |
| department | String |
| cgpa | Float |
| skills | Text |
| resume | File |
| year_of_study | Integer |

---

### Job

| Field | Type |
|---------|---------|
| id | PK |
| title | String |
| company_name | String |
| description | Text |
| skills_required | Text |
| stipend | String |
| location | String |
| deadline | Date |
| posted_by | FK |
| created_at | DateTime |

---

### Application

| Field | Type |
|---------|---------|
| id | PK |
| student_id | FK |
| job_id | FK |
| status | Enum |
| applied_at | DateTime |

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router
- Axios
- CSS3

### Backend

- Django
- Django REST Framework

### Database

- SQLite (Development)


### Authentication

- JWT Authentication


## 📂 Project Structure

```text
ascend/
│
├── backend/
│   ├── users/
│   ├── jobs/
│   ├── applications/
│   └── manage.py
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── styles/
│   │   ├── services/
│   │   └── api.js
│
└── README.md
```

---

## 🚀 Installation

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## 🔐 Key Concepts

- Students cannot directly apply to drives.
- Every participation request must be approved by an admin.
- Application records are never deleted.
- Status updates represent the entire hiring journey.
- Admin has full control over drive participation.

---



## 🎯 Project Goal

Ascend aims to provide a structured, transparent, and efficient placement management system where administrators maintain control over participation while students receive clear visibility into their application progress.

---

## 👨‍💻 Author

**Raghul Krishna**

Electronics & Communication Engineering Graduate  
Aspiring Software Developer

---

