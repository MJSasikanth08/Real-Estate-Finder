# 🏡Real Estate Finder Web Application

A full-stack web application that allows users to **search for properties** (plots or apartments) by **location** and check their availability. Built with **React (frontend)** and **Node.js/Express (backend)**.

---

## 📌 Features

- 🔍 **Location-Based Property Search** – Find available plots or apartments in a specific location.
- 🏠 **Property Types** – Displays whether the selected location has a **plot** or **apartment** available.
- 👤 **User Authentication** – Includes user **login** and **registration**.
- 🖼️ **Image Uploads** – Images of countries/places are uploaded and stored on the backend.
- 📸 **UI Screenshots** – Included for Login, Home, Search, and Register pages.

---

## 📁 Folder Structure

```
property-finder-app/
│
├── backend/
│   ├── uploads/                  # Stores uploaded images (countries, places)
│   ├── app.js / server.js        # Node.js backend server
│   └── ...                       # Additional backend files (routes, models, etc.)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PropertySearch.js  # Search properties by location
│   │   │   ├── Login.js           # User login component
│   │   │   ├── Register.js        # User registration component
│   │   └── assets/
│   │       ├── login.png
│   │       ├── home.png
│   │       ├── search.png
│   │       └── register.png
│   └── ...                       # Other frontend files (App.js, index.js, etc.)
```

### 🔧 Prerequisites

- Node.js & npm
- (Optional) MySQL or MongoDB (if your backend uses a database)

### 📦 Backend Setup

cd backend
npm install
node server.js


Make sure your backend server is configured to serve static files from the `uploads/` directory.

### 💻 Frontend Setup
cd frontend
npm install 
npm start

This will run the React app locally at `http://localhost:3000`.

## 🧪 How to Use

1. Open the application in your browser.
2. **Register** or **log in** as a user.
3. Use the **search bar** to enter a location.
4. View available property types (**plot/apartment**) for the selected location.
5. Images will be shown if available for that location.

---

## 📸 UI Screenshots

![home page](https://github.com/user-attachments/assets/810a1c32-65e8-4092-a877-b96bb1bf14a3)
![login page](https://github.com/user-attachments/assets/f330f931-a73a-41bb-a218-76df7e764ead)
![register page](https://github.com/user-attachments/assets/bde587cc-4f4c-473e-93e7-3e439a588130)
![search_location](https://github.com/user-attachments/assets/5b032221-94ed-4ced-a064-cc5f7486ac87)
![sale](https://github.com/user-attachments/assets/c393047e-946e-4786-804e-d3832ec4133b)
![sold](https://github.com/user-attachments/assets/6bb2520d-e351-41d7-9ce0-e5af9ce25d43)


## 🛠️ Tech Stack

| Frontend  | Backend   | Database | Other     |
|-----------|-----------|----------|-----------|
| React     | Node.js   | MySQL    | Express.js |
| HTML/CSS  |           |          | File Uploads |
