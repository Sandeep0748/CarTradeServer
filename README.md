# CarTrade Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

CarTrade is a robust backend system for a modern car trading platform. It allows seamless management of car listings, user accounts, bookings, and transactions, providing a secure and efficient experience for both car owners and buyers.  

The backend is built with **Node.js, Express.js, and MongoDB**, following RESTful API principles and modern authentication standards.

---

## Features

- **User Authentication & Authorization**
  - Secure registration and login with JWT.
  - Role-based access: Buyer, Seller, Admin.
  - Password hashing with bcrypt.

- **Car Management**
  - Create, Read, Update, Delete (CRUD) operations for cars.
  - Filter cars by category, features, and availability.
  - Support for image uploads for car listings.

- **Bookings & Transactions**
  - Users can book cars directly on the platform.
  - Owners can manage bookings (approve/reject/view).
  - Payment integration-ready endpoints.

- **Favorites & Wishlist**
  - Users can save favorite cars for easy access.
  - Owners can view interested buyers.

- **Robust API Structure**
  - Organized routes, controllers, and models.
  - Input validation and comprehensive error handling.
  - Swagger API documentation.

- **Database & Security**
  - MongoDB with Mongoose for scalable data storage.
  - Secure access to sensitive endpoints with JWT.
  - Data validation for reliable operations.

---

## Technologies Used

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB, Mongoose  
- **Authentication:** JWT, bcrypt  
- **API Documentation:** Swagger  
- **Hosting:** Vercel / Render  
- **Testing:** Postman / Insomnia  

---

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cartrade-backend.git
   cd cartrade-backend
