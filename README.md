# Car Rental Site

A full-featured Car Rental System built using Python and backend technologies to manage vehicle rentals, bookings, customers, authentication, and payments efficiently. This project simulates a real-world car rental platform where users can browse available cars, book vehicles, and manage rental operations.

---

# Features

## User Features
- User Registration & Login
- Secure Authentication
- Browse Available Cars
- Search & Filter Cars
- Book Cars for Specific Dates
- Rental History Tracking
- View Booking Details
- Profile Management

## Admin Features
- Add / Update / Delete Cars
- Manage Car Availability
- Manage Customers
- View All Bookings
- Rental Status Management
- Dashboard for Rental Operations
- Revenue & Booking Monitoring

---

# Tech Stack

## Backend
- Python
- Django REST Framework
- REST APIs

## Database
- MySQL

## Authentication
- JWT Authentication

## Tools & Libraries
- Django ORM
- Datetime Handling
- Docker (Optional)

---

# Project Structure

```bash
car-rental-system/
│
├── app/
│   ├── routes/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   ├── database/
│   ├── auth/
│   └── utils/
│
├── requirements.txt
├── main.py
├── .env
├── README.md
└── Dockerfile
```

---

# System Workflow

1. User registers and logs into the system.
2. User browses available cars.
3. User selects rental dates.
4. System checks car availability.
5. Booking is created successfully.
6. Admin manages bookings and car inventory.
7. User can view rental history and booking status.

---

# Database Design

## Main Tables

### Users
- id
- name
- email
- password
- role

### Cars
- id
- car_name
- model
- brand
- price_per_day
- availability_status

### Bookings
- id
- user_id
- car_id
- start_date
- end_date
- total_price
- booking_status

### Payments
- id
- booking_id
- payment_status
- amount

---

# API Endpoints

## Authentication
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/register` | Register user |
| POST | `/login` | User login |

## Cars
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/cars` | Get all cars |
| GET | `/cars/{id}` | Get car details |
| POST | `/cars` | Add new car |
| PUT | `/cars/{id}` | Update car |
| DELETE | `/cars/{id}` | Delete car |

## Bookings
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/bookings` | Create booking |
| GET | `/bookings` | Get all bookings |
| GET | `/bookings/{id}` | Booking details |

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/car_rental_site.git
```

## Move Into Project Directory

```bash
cd car_rental_site
```

## Create Virtual Environment

```bash
python -m venv venv
```

## Activate Virtual Environment

### Windows
```bash
venv\Scripts\activate
```

### Linux / Mac
```bash
source venv/bin/activate
```

---

# Install Dependencies

```bash
pip install -r requirements.txt
```

---

# Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL=mysql://username:password@localhost/car_rental_db
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

# Run the Project

## Django

```bash
python manage.py runserver
```

---
# API Documentation

-Done using Postman

# Authentication Flow

1. User logs in with email and password.
2. JWT token is generated.
3. Token is used for accessing protected routes.
4. Unauthorized users cannot access admin APIs.

---

# Challenges Faced

- Managing overlapping car bookings
- Handling date validations
- Preventing duplicate reservations
- Optimizing database queries
- Authentication and authorization handling

---

# Future Improvements

- Payment Gateway Integration
- Email Notifications
- AI-based Car Recommendation
- Real-Time Car Tracking
- Admin Analytics Dashboard
- Mobile Application Support
- Docker & Kubernetes Deployment
- Redis Caching

---

# Learning Outcomes

Through this project, I learned:

- Backend API development
- Database schema design
- Authentication using JWT
- REST API architecture
- Debugging and optimization
- Real-world booking logic
- Date and time handling
- Scalable backend structure

# Author

R. Debashish Das

- Python Developer
- Backend Developer
- AI/ML Enthusiast
