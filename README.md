# GigFlow - Freelance Marketplace

A modern, full-stack freelance marketplace built with the MERN stack. Connect clients with talented freelancers through an intuitive platform featuring real-time notifications, atomic transactions, and a seamless user experience.

## 🚀 Features

### Core Features
- **User Authentication**: Secure JWT-based authentication with HttpOnly cookies
- **Dual Role System**: Users can act as both clients and freelancers
- **Gig Management**: Create, edit, and manage freelance projects
- **Bidding System**: Freelancers can submit competitive bids on open gigs
- **Atomic Hiring**: Thread-safe hiring process with MongoDB transactions
- **Real-time Notifications**: Socket.io powered instant updates

### Advanced Features
- **Smart Search & Filtering**: Find gigs by keyword, category, and budget
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Status Tracking**: Monitor gig and bid statuses in real-time
- **Optimistic UI Updates**: Smooth user experience with instant feedback
- **Error Handling**: Comprehensive error management with user-friendly messages

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Socket.io Client** - Real-time communication
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library
- **Date-fns** - Date utilities

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Socket.io** - Real-time events
- **Bcrypt** - Password hashing

## 📁 Project Structure
```
frontend-GIG/
├── public/
│   └── index.html
├── src/
│   ├── api/              # API service layer
│   │   ├── axios.js
│   │   ├── auth.api.js
│   │   ├── gig.api.js
│   │   ├── bid.api.js
│   │   └── notification.api.js
│   ├── components/       # React components
│   │   ├── layout/       # Layout components
│   │   ├── ui/           # Reusable UI components
│   │   ├── gigs/         # Gig-specific components
│   │   └── bids/         # Bid-specific components
│   ├── pages/            # Page components
│   │   ├── Auth/
│   │   ├── Dashboard.jsx
│   │   ├── BrowseGigs.jsx
│   │   ├── GigDetailPage.jsx
│   │   ├── MyGigs.jsx
│   │   ├── MyBids.jsx
│   │   ├── CreateGig.jsx
│   │   └── NotFound.jsx
│   ├── store/            # Redux store
│   │   ├── slices/
│   │   └── store.js
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Root component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── .env                  # Environment variables
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (running instance)
- Backend server running on `http://localhost:5000`

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd frontend-GIG
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

4. **Start the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

The production build will be created in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

## 🔑 Key Features Explained

### Authentication Flow
1. User registers with email, password, and role (client/freelancer)
2. JWT token stored in HttpOnly cookie for security
3. Token automatically included in all API requests
4. Auto-logout on token expiration

### Gig Lifecycle
1. **Open** - Accepting bids from freelancers
2. **Assigned** - Freelancer hired, work in progress
3. **Completed** - Project finished
4. **Cancelled** - Gig cancelled by client

### Bid Lifecycle
1. **Pending** - Awaiting client review
2. **Hired** - Accepted by client
3. **Rejected** - Not selected

### Atomic Hiring Process
When a client hires a freelancer:
1. Verify gig is still open (race condition check)
2. Start MongoDB transaction
3. Update gig status to "assigned"
4. Set freelancer on gig
5. Update hired bid status to "hired"
6. Reject all other bids automatically
7. Commit transaction or rollback on error
8. Emit real-time notifications via Socket.io

## 📡 Real-time Features

### Socket.io Events

**Client → Server**
- `join` - Join user-specific room

**Server → Client**
- `new-bid` - New bid received on your gig
- `hired` - You've been hired for a gig
- `bid-rejected` - Your bid was rejected

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Loading States**: Skeleton loaders and spinners for better UX
- **Toast Notifications**: Instant feedback for user actions
- **Optimistic Updates**: UI updates before server confirmation
- **Error Boundaries**: Graceful error handling
- **Accessibility**: Keyboard navigation and screen reader support

## 📊 State Management

Redux Toolkit slices:
- **authSlice**: User authentication and profile
- **gigSlice**: Gig CRUD operations and listings
- **bidSlice**: Bid submission and management
- **notificationSlice**: Real-time notifications

## 🔒 Security Features

- JWT authentication with HttpOnly cookies
- CORS configuration
- Input validation and sanitization
- Protected routes
- XSS protection
- Rate limiting (backend)

## 🧪 Testing
```bash
# Run tests (when implemented)
npm test

# Run with coverage
npm run test:coverage
```

## 📈 Performance Optimizations

- Code splitting with React.lazy
- Image optimization
- Debounced search
- Pagination for large lists
- Memoization with React.memo
- Virtual scrolling for long lists (future enhancement)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Code Style

- ESLint configuration included
- Prettier for code formatting
- Follow React best practices
- Use functional components with hooks
- PropTypes for type checking (optional)

## 🐛 Known Issues

- Socket connection may require refresh on network change
- Large file uploads not yet supported
- Email verification not implemented

## 🗺️ Roadmap

- [ ] Email verification
- [ ] Password reset functionality
- [ ] File upload for gig attachments
- [ ] User profiles and ratings
- [ ] Payment integration
- [ ] Chat system between clients and freelancers
- [ ] Advanced analytics dashboard
- [ ] Admin panel
- [ ] Mobile app (React Native)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgments

- Backend API: [backend-GIG](https://github.com/Sanskar225/backend-GIG)
- Icons: Lucide React
- UI Components: Custom components with Tailwind CSS

## 📞 Support

For support, email support@gigflow.com or create an issue in the repository.

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

Built with ❤️ by the GigFlow Team