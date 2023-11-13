# ToolManagement

### Short description:
The app will handle the tools inventory of a Carpentry Company.
The company's main problem is that tools keep disappearing, the owner has no idea who last used them, resulting in great financial loss.
The company needs a tool managment system, where the owner can assign each tool to employees. He should also be able to keep track of the available inventory.

### Backend
The backend of ToolManagement is build with ASP.NET. It provides essential functionalities for entity management and user authentication.

## Features
User authentication for secure login and registration.
Endpoints for creationg, editing and deleting tools and users.
Authentication middleware to ensure certain actions available only to logged-in users.

## Technologies used
ASP.NET Core.
Athentication using JWT tokens.
SQL server for database.

## Setup
Clone this repository.
Run dotnet restore to install dependencies.
Set up your SQL server database and update the connection string in appsettings.json.
Run dotnet ef database update to apply database migrations.

### Frontend
The frontend of ToolManagement is built with React.js. It offers an intuitive user interface for browsing and searching tools.

## Features
Listing tools and users.
User friendly filtering on tools and users as well.
Editing users based on user role(admin only).
Adding new tools(admin only).
Check ownership statuses.

## Technologies used
React.js.
React router for navigation.
Fetch for API communication.

## Setup
Clone this repository.
Run npm install to install dependencies.
Update API base URLs.
Run npm start.
