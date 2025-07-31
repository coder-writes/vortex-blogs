# Blog Application

A full-stack blog application built with React (Vite) frontend and Node.js/Express backend with MongoDB database. Features include blog creation, management, commenting system, and admin dashboard.

## 🚀 Features

### Frontend (Client)
- **Modern React Application** - Built with React 19 and Vite for fast development
- **Responsive Design** - Styled with Tailwind CSS for mobile-first responsive design
- **Rich Text Editor** - Quill.js integration for creating and editing blog posts
- **Admin Dashboard** - Complete admin interface for managing blogs and comments
- **User Authentication** - JWT-based authentication system
- **Blog Management** - Create, read, update, and delete blog posts
- **Comment System** - Interactive commenting on blog posts
- **Image Handling** - Support for blog images and media
- **Newsletter Subscription** - Email subscription functionality
- **SEO Friendly** - Optimized for search engines

### Backend (Server)
- **Express.js API** - RESTful API server with Express.js
- **MongoDB Database** - Document-based storage with Mongoose ODM
- **JWT Authentication** - Secure token-based authentication
- **Image Upload** - ImageKit integration for image storage and optimization
- **AI Integration** - Google Generative AI for content enhancement
- **File Upload** - Multer middleware for handling file uploads
- **CORS Support** - Cross-origin resource sharing enabled
- **Environment Configuration** - Secure environment variable management

## 📁 Project Structure

```
blog-app/
├── client/                     # Frontend React application
│   ├── public/                 # Static assets
│   │   ├── favicon.svg
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/            # Images, icons, and static files
│   │   ├── components/        # Reusable React components
│   │   │   ├── admin/         # Admin-specific components
│   │   │   ├── BlogCard.jsx
│   │   │   ├── BlogList.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Newsletter.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── admin/         # Admin pages
│   │   │   ├── Blog.jsx
│   │   │   └── Home.jsx
│   │   ├── App.jsx           # Main App component
│   │   ├── main.jsx          # React entry point
│   │   └── index.css         # Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
└── server/                    # Backend Node.js application
    ├── configs/
    │   └── db.js             # Database connection
    ├── controllers/
    │   └── adminController.js # Admin route handlers
    ├── middlewares/          # Custom middleware
    ├── models/               # MongoDB schemas
    ├── routes/
    │   └── adminRoutes.js    # API routes
    ├── server.js             # Main server file
    └── package.json
```

## 🛠️ Technologies Used

### Frontend
- **React 19** - Frontend JavaScript library
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **Quill.js** - Rich text editor
- **React Hot Toast** - Toast notifications
- **Moment.js** - Date manipulation
- **Motion** - Animation library
- **Marked** - Markdown parser

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Multer** - File upload middleware
- **ImageKit** - Image storage and optimization
- **Google Generative AI** - AI content generation
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

## ⚙️ Installation and Setup

### Prerequisites
- Node.js (version 18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password

# Server
PORT=3000

# ImageKit (optional)
IMAGEKIT_ENDPOINT_URL=your_imagekit_endpoint
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key

# Google AI (optional)
GOOGLE_AI_API_KEY=your_google_ai_api_key
```

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create your `.env` file with the required environment variables

4. Start the development server:
```bash
npm run server
```

The server will start on `http://localhost:3000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The client will start on `http://localhost:5173`

## 📝 API Endpoints

### Admin Routes (`/api/admin`)
- `POST /login` - Admin authentication

### Blog Routes (`/api/blog`)
- `GET /` - Get all blog posts
- `POST /` - Create new blog post
- `GET /:id` - Get single blog post
- `PUT /:id` - Update blog post
- `DELETE /:id` - Delete blog post

## 🔧 Development Scripts

### Client Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Server Scripts
```bash
npm run server   # Start development server with nodemon
npm start        # Start production server
```

## 🚀 Deployment

### Frontend Deployment
1. Build the client:
```bash
cd client
npm run build
```

2. Deploy the `dist` folder to your hosting service (Vercel, Netlify, etc.)

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Deploy the server directory to your hosting service (Railway, Render, Heroku, etc.)
3. Ensure MongoDB connection is configured for production

## 🔐 Security Features

- JWT-based authentication
- Environment variable protection
- CORS configuration
- Input validation and sanitization
- Secure file upload handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues or have questions, please open an issue in the repository.

## 🔮 Future Enhancements

- User registration and profiles
- Social media integration
- Advanced search functionality
- Blog categories and tags
- Email notifications
- Comment moderation
- SEO optimization
- Performance analytics
- Multi-language support
- Dark mode theme

---
## ⭐️ Support Us

If you find this project helpful, please consider starring the repository to show your support!

**Happy Blogging ! 📝✨**