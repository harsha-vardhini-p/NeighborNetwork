# NeighbourNet

<div align="center">

**A Private Network for Residential Communities**

*Structured communication for apartments and gated societies — without noise.*

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [Key Features](#-key-features)
- [Technical Implementation](#-technical-implementation)
- [Technology Stack](#-technology-stack)
- [Database Architecture](#-database-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Usage Guide](#-usage-guide)
- [Demo Credentials](#-demo-credentials)

---

## 🏠 Overview

NeighbourNet is a privacy-first community management platform designed specifically for residential apartments and gated societies. It provides a structured communication channel that eliminates the chaos of traditional group chats while ensuring verified, secure interactions between community members.

The platform serves two primary user roles:
- **Residents**: Community members who can access notices, book amenities, report issues, and communicate with neighbors
- **Administrators**: Society management personnel who verify residents, manage community operations, and oversee emergency responses

---

## ❓ Problem Statement

Modern residential communities face significant communication challenges:

| Challenge | Impact |
|-----------|--------|
| **Unstructured WhatsApp Groups** | Important notices get buried in casual conversations |
| **Privacy Concerns** | Personal phone numbers exposed to all group members |
| **No Verification System** | Anyone with the group link can join and access community information |
| **Information Overload** | Irrelevant messages cause residents to mute essential communication channels |
| **Accessibility Barriers** | Senior citizens struggle with complex messaging apps |
| **No Emergency Protocol** | No streamlined process for reporting and responding to emergencies |
| **Amenity Booking Conflicts** | Manual, uncoordinated booking of common facilities |

---

## 💡 Solution

NeighbourNet addresses these challenges through:

1. **Verified Communities**: Admin-controlled access ensures only legitimate residents can participate
2. **Categorized Communication**: Structured feeds with notices, events, help requests, and lost & found sections
3. **Privacy by Design**: No personal data exposed; flat-based identification protects resident privacy
4. **Senior-Friendly Interface**: Toggle between Standard and Simple views with larger text and simplified navigation
5. **Emergency SOS System**: One-tap emergency reporting with instant alerts to all residents and management
6. **Smart Amenity Booking**: Calendar-based reservation system for badminton courts, clubhouse, and other facilities
7. **Issue Tracking**: Dedicated modules for parking issues, maintenance requests, and community concerns

---

## ✨ Key Features

### For Residents

| Feature | Description |
|---------|-------------|
| 📢 **Notices Without Noise** | Important updates from admins reach everyone instantly |
| 🧳 **Lost & Found Board** | Report lost items or help neighbors find what they've misplaced |
| 🚨 **Emergency SOS** | One-tap alert to notify neighbors and security in critical moments |
| 🏸 **Amenity Booking** | Reserve badminton courts, clubhouse, or common areas with ease |
| 🏠 **House Rentals** | Browse and post listings within the community |
| 🚗 **Parking Issues** | Report or view parking violations and concerns |
| 🧓 **Accessibility Mode** | Senior-friendly view with larger text and simplified navigation |

### For Administrators

| Feature | Description |
|---------|-------------|
| ✅ **Resident Verification** | Review and approve new member registrations |
| 📊 **Dashboard Analytics** | Overview of pending verifications and community activity |
| 👥 **Member Management** | Manage resident access and permissions |
| 🔔 **Emergency Response** | Receive and coordinate emergency alerts |

---

## 🔧 Technical Implementation

### Authentication Flow

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────────┐
│   Landing   │────▶│ Login (OTP)  │────▶│ Verification Check  │
└─────────────┘     └──────────────┘     └─────────────────────┘
                                                    │
                     ┌──────────────────────────────┼──────────────────┐
                     ▼                              ▼                  ▼
              ┌─────────────┐            ┌─────────────────┐   ┌──────────────┐
              │  Dashboard  │            │ Pending Review  │   │ Admin Panel  │
              │ (Resident)  │            │     Page        │   │              │
              └─────────────┘            └─────────────────┘   └──────────────┘
```

### State Management

The application employs a centralized state management system using the browser's `localStorage` API:

```javascript
// Data Schema (neighbornet-db.js)
{
  currentUser: {
    role: 'resident' | 'admin',
    phone: string,
    flat: string,
    name: string,
    verificationStatus: 'pending' | 'approved' | 'rejected',
  },
  isLoggedIn: boolean,
  residents: [...],      // Registered community members
  posts: [...],          // Community feed posts
  bookings: [...],       // Facility reservations
  alerts: [...],         // Emergency alert history
  viewMode: 'standard' | 'simple',
  society: {...}         // Society metadata
}
```

### Session Management

- **Authentication Guards**: All protected pages implement `requireAuth()` checks
- **Role-Based Access**: Separate authentication flows for residents and administrators
- **Verification Status**: Pending users are routed to a waiting page until admin approval
- **Persistent Sessions**: Login state survives page refreshes and browser restarts

---

## 🛠 Technology Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic markup and structure |
| **CSS3** | Modern styling with Flexbox/Grid, custom properties, and animations |
| **JavaScript (ES6+)** | Client-side logic, DOM manipulation, and state management |
| **Google Fonts (Inter)** | Clean, professional typography |

### Data Persistence

| Technology | Purpose |
|------------|---------|
| **localStorage API** | Browser-based data persistence for demo functionality |
| **JSON** | Data serialization format |

### Design Approach

| Aspect | Implementation |
|--------|----------------|
| **Responsive Design** | Mobile-first approach with adaptive layouts |
| **Accessibility** | ARIA attributes, keyboard navigation, screen reader support |
| **Progressive Enhancement** | Core functionality works without advanced features |
| **Modular CSS** | Page-specific stylesheets for maintainability |

---

## 🗄 Database Architecture

### localStorage-Based Persistence Layer

The application uses a custom database simulation module (`neighbornet-db.js`) that provides:

```
┌─────────────────────────────────────────────────────────────┐
│                    NeighborNetDB Module                     │
├─────────────────────────────────────────────────────────────┤
│  Storage Key: 'neighbornet-state'                           │
│                                                             │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │   Session   │  │   Residents  │  │   Community Data  │  │
│  │  Management │  │   Registry   │  │                   │  │
│  ├─────────────┤  ├──────────────┤  ├───────────────────┤  │
│  │ currentUser │  │ id           │  │ posts[]           │  │
│  │ isLoggedIn  │  │ flat         │  │ bookings[]        │  │
│  │ viewMode    │  │ name         │  │ alerts[]          │  │
│  │             │  │ phone        │  │ society{}         │  │
│  │             │  │ status       │  │                   │  │
│  └─────────────┘  └──────────────┘  └───────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### API Methods

| Method | Description |
|--------|-------------|
| `init()` | Initialize database with seed data |
| `login(role, userData)` | Create user session |
| `logout(redirectUrl)` | Clear session and redirect |
| `getCurrentUser()` | Retrieve current user data |
| `isLoggedIn()` | Check login status |
| `requireAuth(role, redirectUrl)` | Enforce authentication |
| `checkVerification()` | Validate user verification status |
| `approveResident(id)` | Admin: Approve pending resident |
| `rejectResident(id)` | Admin: Remove pending request |
| `getViewMode() / setViewMode()` | Manage accessibility preferences |
| `getPosts() / getBookings()` | Retrieve community data |
| `reset()` | Reset to default state (demo utility) |

---

## 📁 Project Structure

```
NeighborNetwork/
├── index.html                # Resident login page
├── landing.html              # Public landing page
├── dashboard.html            # Resident dashboard
├── dashboard.css
├── pending-verification.html # Verification waiting page
├── pending-verification.css
├── booking.html              # Badminton court booking
├── booking.css
├── item-detail.html          # Lost & found item view
├── item-detail.css
├── rent-detail.html          # House rental details
├── rent-detail.css
├── parking-issue.html        # Parking issue reporting
├── parking-issue.css
├── admin-login.html          # Administrator login
├── admin-login.css
├── admin-dashboard.html      # Admin control panel
├── admin-dashboard.css
├── admin-residents.html      # Resident management
├── admin-residents.css
├── neighbornet-db.js         # Database simulation module
├── styles.css                # Common styles
├── landing.css               # Landing page styles
└── assets/                   # Images and media
    └── hero-bg.png
```

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No server or build tools required

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/NeighborNetwork.git
   cd NeighborNetwork
   ```

2. **Open in browser**
   ```bash
   # macOS
   open landing.html

   # Windows
   start landing.html

   # Linux
   xdg-open landing.html
   ```

   Or simply double-click `landing.html` in your file explorer.

3. **For development with live reload** (optional)
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve .
   ```

---

## 📖 Usage Guide

### Resident Flow

1. Open **landing.html** and click "Get Started"
2. Enter your phone number, flat number, and society code
3. Complete OTP verification (any 4-digit code for demo)
4. Wait for admin approval on the verification page
5. Once approved, access the full resident dashboard

### Admin Flow

1. Navigate to **admin-login.html**
2. Enter admin credentials
3. Access the admin dashboard to:
   - View pending verification requests
   - Approve or reject residents
   - Monitor community activity

### Demo Reset

To reset all demo data:
```javascript
// Open browser console and run:
localStorage.removeItem('neighbornet-state');
location.reload();
```

---

## 🔑 Demo Credentials

### Resident Login
| Field | Value |
|-------|-------|
| Phone | Any 10-digit number |
| Flat | Any flat number (e.g., A-304) |
| Society Code | `SUN2024` |
| OTP | Any 4-digit code |

### Admin Login
| Field | Value |
|-------|-------|
| Admin ID | Any value |
| Phone | Any 10-digit number |
| OTP | Any 4-digit code |

---

## 📄 License

This project is developed for demonstration and educational purposes.

---

<div align="center">

**Built with 💚 for residential communities**

*NeighbourNet — Because good neighbors deserve good communication.*

</div>
