# 🌍 Wanderlust — Client (Frontend)

Wanderlust is an immersive **travel and destination management platform** crafted for modern explorers. It offers seamless hotel and tour booking, intelligent destination filtering, dynamic search capabilities, and user-driven testimonials — all wrapped in a stunning, mobile-first user experience that simplifies travel planning and bridges the gap between travelers and their dream destinations.

This repository contains the **frontend client**, built with Next.js and React, which communicates with the [Wanderlust server](https://github.com/towfiq-dev/wandelust-server) via a secure REST API.

---

## 📖 Project Description

Wanderlust reimagines how travelers discover and book their next adventure. From intelligent destination search to a fully personalized booking dashboard, the platform is designed to feel premium, fast, and effortless. Admins get a dedicated control panel to manage listings and monitor platform performance, while travelers enjoy a polished, testimonial-driven browsing experience.

---

## ✨ Features

- **Advanced Destination Search:** Filter and sort destinations by category, price range, and rating/name for a tailored browsing experience.
- **Dynamic Booking Engine:** Reserve curated tour packages in real time, with full cancellation support.
- **Secure Authentication:** Session handling powered by BetterAuth with JWT/JWKS verification on the API side, keeping user data safe.
- **Admin Dashboard:** Live platform statistics — total destinations, total bookings, and aggregated revenue — visualized for quick insights.
- **Full CRUD Destination Management:** Admins can add, edit, and remove destination listings directly from the dashboard.
- **Personal Bookings Dashboard:** Users can track, manage, and cancel their own reservations in one place.
- **Featured Destinations Carousel:** An engaging homepage showcase of top destinations and real user testimonials.
- **Fully Responsive UI:** Built mobile-first, ensuring a seamless experience across all screen sizes.

---

## 🛠️ Technology Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js, React |
| **Styling** | Tailwind CSS |
| **UI Components** | HeroUI |
| **Animation** | Framer Motion |
| **Authentication** | BetterAuth (JWT/JWKS) |
| **Language** | JavaScript (ES6+) |
| **Backend Integration** | Express.js, MongoDB (via REST API) |

---

## 📂 Core Pages & Sections

- **Home:** Featured destinations carousel, testimonials, and platform highlights
- **Destinations:** Searchable and filterable destination listing page
- **Destination Details:** In-depth information with booking option
- **My Bookings:** Personal dashboard to view, manage, and cancel reservations
- **Admin Dashboard:** Live stats overview and full destination management (CRUD)
- **Authentication:** Sign up / Sign in powered by BetterAuth

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_API_URL=your_backend_server_url
BETTER_AUTH_SECRET=your_betterauth_secret
BETTER_AUTH_URL=your_app_url
```

> Adjust variable names to match your actual BetterAuth and API configuration.

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/towfiq-dev/wanderlust-express-js.git
   cd wanderlust-express-js
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file as described above.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. Open your browser and visit:
   ```
   http://localhost:3000
   ```

---

## 📌 Live & Related Links

- 🔗 **Live Site:** [wanderlust-express-js.vercel.app](https://wanderlust-express-js.vercel.app)
- 🔗 **Client Source Code:** [github.com/towfiq-dev/wanderlust-express-js](https://github.com/towfiq-dev/wanderlust-express-js)
- 🔗 **Server Source Code:** [github.com/towfiq-dev/wandelust-server](https://github.com/towfiq-dev/wandelust-server)

---

## 👨‍💻 Author

**Towfiqul Islam**
Junior Full Stack Web Developer | MERN Stack Specialist
📧 towfiqulislam017399@gmail.com
📍 Dhaka, Bangladesh
