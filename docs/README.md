# Project Documentation

## Folder Structure Overview

### `/lib` Folder
The `/lib` folder is used for reusable utility functions, API clients, and configuration files. This helps keep the codebase organized and modular.

#### **Common Use Cases for `/lib`**:
1. **API Clients** - Example: A pre-configured Axios instance for making API calls to the backend.
2. **Database Connection** - If the frontend interacts with a database directly (not the case here, since the backend handles DB operations).
3. **Helper Functions** - Utilities for authentication, data formatting, or other common operations.
4. **Middleware or Fetchers** - Abstractions to handle API requests more efficiently.

For this project, the `lib/api.ts` file contains an Axios instance configured to interact with the NestJS backend, ensuring all API requests use a consistent base URL.

