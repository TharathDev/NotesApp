# 📝 Notes App

A full-stack notes application built with .NET Core API backend and Nuxt.js frontend, featuring user authentication and real-time note management with Cambodia timezone support.

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **Note Management**: Create, read, update, and delete notes
- **Real-time Updates**: Instant note synchronization
- **Search Functionality**: Find notes quickly with search
- **Responsive Design**: Works on desktop and mobile devices
- **Cambodia Timezone**: Optimized for Cambodia/Phnom Penh timezone (UTC+7)
- **Docker Support**: Easy deployment with Docker containers

## 🛠️ Tech Stack

### Backend (NotesApi)

- **.NET 9.0**: Modern C# web API framework
- **MySQL**: Relational database for data storage
- **JWT Authentication**: Secure token-based authentication
- **Docker**: Containerized deployment

### Frontend (NotesUI)

- **Nuxt.js 3**: Vue.js framework with SSR support
- **TypeScript**: Type-safe JavaScript development
- **Tailwind CSS**: Utility-first CSS framework
- **Composables**: Reusable Vue composition functions

## 📋 Prerequisites

- **Docker & Docker Compose**: For containerized deployment
- **Node.js 20+**: For local frontend development
- **.NET 9.0 SDK**: For local backend development
- **MySQL 8.0+**: For local database setup

## 🚀 Quick Start with Docker

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd NotesApp
   ```

2. **Start the application**

   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5197
   - Database: localhost:3306

## 🔧 Local Development Setup

### Backend Setup

1. **Navigate to the API directory**

   ```bash
   cd NotesApi
   ```

2. **Install dependencies**

   ```bash
   dotnet restore
   ```

3. **Update database connection**

   - Edit `appsettings.Development.json`
   - Configure your MySQL connection string

4. **Run the API**
   ```bash
   dotnet run
   ```

### Frontend Setup

1. **Navigate to the UI directory**

   ```bash
   cd NotesUI
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**

   - Update `nuxt.config.ts` with your API base URL

4. **Run the development server**
   ```bash
   npm run dev
   ```

### Database Setup

1. **Create MySQL database**

   ```sql
   CREATE DATABASE notesapp;
   ```

2. **Run initialization script**
   ```bash
   mysql -u root -p notesapp < sql/init.sql
   ```

## 📁 Project Structure

```
NotesApp/
├── NotesApi/                 # .NET Core Web API
│   ├── Data/                 # Repository pattern implementation
│   ├── Models/               # Data models and DTOs
│   ├── Services/             # Business logic services
│   └── Program.cs            # API configuration and endpoints
├── NotesUI/                  # Nuxt.js Frontend
│   ├── components/           # Vue components
│   ├── composables/          # Reusable composition functions
│   ├── pages/                # Application pages
│   └── middleware/           # Route middleware
├── sql/                      # Database initialization
└── docker-compose.yml        # Docker orchestration
```

## 🔐 Authentication

The application uses JWT-based authentication:

1. **Register**: Create a new account at `/register`
2. **Login**: Sign in at `/login`
3. **Protected Routes**: Notes page requires authentication
4. **Token Storage**: JWT tokens are stored securely in browser

## 📝 API Endpoints

### Authentication

- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Notes

- `GET /notes` - Get user's notes
- `POST /notes` - Create new note
- `PUT /notes/{id}` - Update existing note
- `DELETE /notes/{id}` - Delete note

## 🌏 Timezone Configuration

The application is configured for Cambodia timezone (UTC+7):

- **Backend**: Uses `SE Asia Standard Time` timezone
- **Frontend**: Displays times in Cambodia/Phnom Penh timezone
- **Database**: Stores timestamps in UTC for consistency

## 🐳 Docker Configuration

The application includes multi-container Docker setup:

- **API Container**: .NET application on port 5000
- **Frontend Container**: Nuxt.js application on port 3000
- **Database Container**: MySQL 8.0 on port 3306

## 🔧 Environment Variables

### Backend (NotesApi)

```env
ConnectionStrings__DefaultConnection=Server=db;Database=notesapp;Uid=root;Pwd=rootpassword;
JwtSettings__SecretKey=your-secret-key
JwtSettings__Issuer=NotesApi
JwtSettings__Audience=NotesApp
```

### Frontend (NotesUI)

```env
NUXT_PUBLIC_API_BASE_URL=http://localhost:5197
```

## 🚀 Deployment

### Production Deployment

1. **Update environment variables** for production
2. **Build and deploy with Docker**
   ```bash
   docker-compose -f docker-compose.prod.yml up --build -d
   ```
3. **Configure reverse proxy** (nginx/Apache) if needed
4. **Set up SSL certificates** for HTTPS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Troubleshooting

### Common Issues

1. **Docker build fails**

   ```bash
   docker system prune -a
   docker-compose up --build
   ```

2. **Database connection issues**

   - Check MySQL container is running
   - Verify connection string in appsettings.json

3. **Frontend API calls fail**

   - Ensure API base URL is correct in nuxt.config.ts
   - Check CORS configuration in backend

4. **Timezone issues**
   - Verify system timezone settings
   - Check Cambodia timezone configuration in code

## 📞 Support

For support and questions:

- Create an issue in the GitHub repository
- Check existing issues for solutions
- Review the troubleshooting section above

---

**Happy Note Taking! 📝**
