# Wind-forecasting-frontend Development Tutorial

## Phase 1: Initialize the Project

### Step 1.1: Create Project

```bash
npm create vite@latest wind-forecasting-frontend
```

When prompted:

- **Project name**: `wind-forecasting-frontend`
- **Framework**: `React`
- **Variant**: `TypeScript`

```bash
cd wind-forecasting-frontend
npm install
npm run dev
```

### Step 1.2: Clean Up Starter Template

Delete:

- `src/assets/react.svg`

Update `App.tsx` to this:

```bash
// src/App.tsx
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>Wind Forecast Dashboard</h1>
      <p>Welcome! Forecast data will be shown here soon.</p>
    </div>
  );
}

export default App;
```

### Step 1.3: Project Structure

We'll organize the code like this:

```plaintext
src/
├── components/         → Reusable UI parts (charts, tables)
├── pages/              → Route pages (Dashboard, Turbine)
├── services/           → API calls
├── store/
├── assets/
├── hooks/
├── types/              → TypeScript interfaces
├── App.tsx             → Main UI
├── main.tsx            → Entry point
```

Let’s start by creating these folders:

```bash
mkdir src/components src/pages src/services src/store src/assets src/hooks src/types
```

## Phase 2: Add Pages and Routing (React Router)

Set up the basic routing system so we can navigate between multiple pages.

### Step 2.1: Install React Router

```bash
npm install --save-dev react-router-dom @types/react-router-dom
```

### Step 2.2: Create Page Components

Inside the `src/pages` folder, create three basic page components:

**src/pages/Home.tsx**

```bash
export default function Home() {
  return <h1>Home Page</h1>;
}
```

**src/pages/Forecast.tsx**

```tsx
export default function Forecast() {
  return <h1>Forecast Page</h1>;
}
```

**src/pages/ModelManagement.tsx**

```tsx
export default function ModelManagement() {
  return <h1>Model Management Page</h1>;
}
```

### Step 2.3: Create Router Configuration

Create a `src/router.tsx` file:

```tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Forecast from './pages/Forecast';
import ModelManagement from './pages/ModelManagement';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forecast" element={<Forecast />} />
        <Route path="/models" element={<ModelManagement />} />
      </Routes>
    </Router>
  );
}
```

### Step 2.4: Use Router in Main App

Open `src/App.tsx` and replace the content with:

```tsx
import AppRouter from './router';

function App() {
  return <AppRouter />;
}

export default App;
```

### Step 2.5: Run the App

Run the app again:

```bash
npm run dev
```

Now try visiting:

- http://localhost:5173/
- http://localhost:5173/forecast
- http://localhost:5173/models

You should see the respective page headings.

## Phase 3: Add a Navigation Bar & UI Styling

* Add a navigation bar (menu)
* Use a UI library (e.g., Tailwind CSS or ShadCN UI)
* Style pages

### Step 3.1: Install Tailwind CSS

Installing Tailwind CSS as a Vite plugin:

```bash
npm install tailwindcss @tailwindcss/vite
```

### Step 3.2: Configure Tailwind

Add the `@tailwindcss/vite` plugin to your Vite configuration.

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
  	react(),
  	tailwindcss(),
  ],
})
```

Then, create a Tailwind base CSS file.

**src/index.css** (create this file if it doesn’t exist):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Finally, update `main.tsx` to import it:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css'; // import Tailwind

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Step 3.3: Add a Navigation Bar

Create a new component:

**src/components/Navbar.tsx**

```tsx
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const linkClass = (path: string) =>
    `px-4 py-2 rounded hover:bg-blue-100 ${
      location.pathname === path ? 'text-blue-600 font-bold' : 'text-gray-700'
    }`;

  return (
    <nav className="bg-white shadow p-4 flex justify-between">
      <h1 className="text-xl font-semibold text-blue-600">Wind Forecast</h1>
      <div className="space-x-4">
        <Link to="/" className={linkClass('/')}>Home</Link>
        <Link to="/forecast" className={linkClass('/forecast')}>Forecast</Link>
        <Link to="/models" className={linkClass('/models')}>Models</Link>
      </div>
    </nav>
  );
}
```

### Step 3.4: Show Navbar on All Pages

Update `router.tsx` to include the navbar:

```tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Forecast from './pages/Forecast';
import ModelManagement from './pages/ModelManagement';
import Navbar from './components/Navbar';

export default function AppRouter() {
  return (
    <Router>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/models" element={<ModelManagement />} />
        </Routes>
      </div>
    </Router>
  );
}
```

## Phase 4: Fetch Data from Backend (Mock API First)

* Connect to the backend
* Use **Axios** to fetch data (mock API for now)
* Display simple JSON on the Forecast page (before visualizing it)
* Use loading and error states

### Step 4.1: Install Axios

Run this in your terminal:

```bash
npm install axios
```

### Step 4.2: Define `ForecastPoint` in a Central Type File

Create a dedicated file for shared types.

Create `src/types/forecast.ts`:

```tsx
// src/types/forecast.ts
export type ForecastPoint = {
  timestamp: string;
  predictedPower: number;
  actualPower?: number;
};
```

### Step 4.3: Create a Mock API Service

Create a folder called `services` and add this file:

**src/services/forecastService.ts**

```tsx
// Simulate fetching forecast data
export type ForecastPoint = {
  timestamp: string;
  actual_power: number;
  predicted_power: number;
};

export async function getMockForecastData(): Promise<ForecastPoint[]> {
  // Simulated delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock data (next 6 timestamps)
  return [
    {
      timestamp: '2025-07-23 08:00',
      actual_power: 1200,
      predicted_power: 1150,
    },
    {
      timestamp: '2025-07-23 09:00',
      actual_power: 1300,
      predicted_power: 1280,
    },
    {
      timestamp: '2025-07-23 10:00',
      actual_power: 1400,
      predicted_power: 1370,
    },
    {
      timestamp: '2025-07-23 11:00',
      actual_power: 1500,
      predicted_power: 1495,
    },
    {
      timestamp: '2025-07-23 12:00',
      actual_power: 1600,
      predicted_power: 1580,
    },
    {
      timestamp: '2025-07-23 13:00',
      actual_power: 1550,
      predicted_power: 1575,
    },
  ];
}
```

------

### Step 4.3: Display Data on the Forecast Page

Now update your **Forecast** page:

**src/pages/Forecast.tsx**

```tsx
import { useEffect, useState } from 'react';
import { getMockForecastData, ForecastPoint } from '../services/forecastService';

export default function Forecast() {
  const [data, setData] = useState<ForecastPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMockForecastData()
      .then((forecast) => {
        setData(forecast);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load forecast data.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading forecast data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Forecast Data</h2>
      <table className="table-auto w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Timestamp</th>
            <th className="border px-4 py-2">Actual Power</th>
            <th className="border px-4 py-2">Predicted Power</th>
          </tr>
        </thead>
        <tbody>
          {data.map((point, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{point.timestamp}</td>
              <td className="border px-4 py-2">{point.actual_power}</td>
              <td className="border px-4 py-2">{point.predicted_power}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

## Phase 5: Visualize the forecast with charts

* Replace the table with a **line chart** using Recharts
* Plot `actual_power` vs `predicted_power` over time

### Step 5.1: Install Recharts

Run this in your terminal:

```bash
npm install recharts
```

------

### Step 5.2: Update the Forecast Page with a Line Chart

We’ll keep the loading and data fetching logic from before, and **add a line chart** for visualization.

Update your **`src/pages/Forecast.tsx`**:

```tsx
import { useEffect, useState } from 'react';
import type { ForecastPoint } from '../types/forecast';
import { getMockForecastData } from '../services/forecastService';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function Forecast() {
  const [data, setData] = useState<ForecastPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMockForecastData()
      .then((forecast) => {
        setData(forecast);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load forecast data.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading forecast data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Forecast Chart</h2>

      <div className="bg-white p-4 rounded shadow">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="actual_power" stroke="#8884d8" name="Actual Power" />
            <Line type="monotone" dataKey="predicted_power" stroke="#82ca9d" name="Predicted Power" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
```

> Optional: You can also keep the table below the chart if you want both.

## Phase 6: State Management

Learning how to use **Zustand**, a lightweight and beginner-friendly state management library, to:

- Store your forecast data globally
- Share it across components/pages
- Avoid re-fetching data when returning to a page

### Why Zustand?

Compared to Redux or Context API:

- 🔋 Simple API (no boilerplate)
- ⚡ Fast and minimal
- 🧠 Perfect for small/medium projects

### Step 6.1: Install Zustand

Run the following:

```bash
npm install zustand
```

------

### Step 6.2: Create a Global Store

Create a new file:

**`src/store/forecastStore.ts`**

```tsx
import { create } from 'zustand';
import type { ForecastPoint } from '../types/forecast';
import { getMockForecastData } from '../services/forecastService';

type ForecastStore = {
  data: ForecastPoint[];
  loading: boolean;
  error: string | null;
  fetchForecast: () => Promise<void>;
};

export const useForecastStore = create<ForecastStore>((set) => ({
  data: [],
  loading: false,
  error: null,

  fetchForecast: async () => {
    set({ loading: true, error: null });

    try {
      const data = await getMockForecastData();
      set({ data, loading: false });
    } catch (err) {
      set({ error: 'Failed to load forecast data', loading: false });
    }
  },
}));
```

------

### Step 6.3: Use the Store in the Forecast Page

Update your **`src/pages/Forecast.tsx`** to use Zustand:

```tsx
import { useEffect } from 'react';
import type { ForecastPoint } from '../types/forecast';
import { useForecastStore } from '../store/forecastStore';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function Forecast() {
  const { data, loading, error, fetchForecast } = useForecastStore();

  useEffect(() => {
    if (data.length === 0) {
      fetchForecast();
    }
  }, [fetchForecast, data]);

  if (loading) return <div>Loading forecast data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Forecast Chart (with Zustand)</h2>

      <div className="bg-white p-4 rounded shadow">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="actual_power" stroke="#8884d8" name="Actual Power" />
            <Line type="monotone" dataKey="predicted_power" stroke="#82ca9d" name="Predicted Power" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
```

> ✅ Now the forecast data will stay in memory across page changes — no need to re-fetch!

## Phase 7: Real backend integration + deployment

* Connect to a **real backend endpoint** instead of mock data
* Configure `.env` to manage your backend URL
* (Optional) Build & deploy to **Vercel / Netlify**

### Step 7.1: Replace Mock with Real API

Let’s assume your backend endpoint looks like:

```bash
http://localhost:8000/api/forecast
```

Update your forecast service:

**`src/services/forecastService.ts`**

```tsx
export type ForecastPoint = {
  timestamp: string;
  actual_power: number;
  predicted_power: number;
};

import axios from 'axios';

export async function getForecastData(): Promise<ForecastPoint[]> {
  const response = await axios.get<ForecastPoint[]>(`${import.meta.env.VITE_API_URL}/forecast`);
  return response.data;
}
```

> This version uses **Vite's environment variable system** to avoid hardcoding the API URL.

------

### Step 7.2: Set Up Environment Variables

Create a `.env` file in your project root:

```bash
VITE_API_URL=http://localhost:8000/api
```

> Restart the dev server after changing `.env`.

------

### Step 7.3: Update Store to Use Real API

Open `src/store/forecastStore.ts` and replace `getMockForecastData` with the real `getForecastData`:

```tsx
import { create } from 'zustand';
import { ForecastPoint, getForecastData } from '../services/forecastService';

type ForecastStore = {
  data: ForecastPoint[];
  loading: boolean;
  error: string | null;
  fetchForecast: () => Promise<void>;
};

export const useForecastStore = create<ForecastStore>((set) => ({
  data: [],
  loading: false,
  error: null,

  fetchForecast: async () => {
    set({ loading: true, error: null });

    try {
      const data = await getForecastData();
      set({ data, loading: false });
    } catch (err) {
      set({ error: 'Failed to load forecast data', loading: false });
    }
  },
}));
```

### Step 7.4: Test it

Test it by starting your frontend (`npm run dev`) and ensuring your backend (`localhost:8000`) returns proper JSON from `/api/forecast`.

## Bonus: Deploy Your Frontend (Vercel/Netlify)

### Option A: Vercel (recommended for React + Vite)

1. Push your project to GitHub

2. Go to https://vercel.com

3. Click **“Add New Project”**

4. Import your GitHub repo

5. In **Build Settings**, set:

   ```yaml
   Framework: Vite
   Environment Variables:
     VITE_API_URL=https://your-api-domain.com/api
   ```

6. Deploy!

------

### Option B: Netlify

Similar steps:

1. Push code to GitHub
2. Go to https://netlify.com
3. Add a new site from Git
4. Set build command: `npm run build`
5. Set publish directory: `dist`
6. Add `VITE_API_URL` in environment variables
7. Deploy

Great! Let’s extend your app with two powerful features:

## Phase 8: Add Authentication (Token-based login)

1. Add a **login page** (Token-based authentication with login page)
2. Call a fake or real login API (returns a token)
3. Store the token in Zustand (Global auth state with Zustand)
4. Protect pages that require login (Protected routes with `ProtectedRoute`)

### Step 8.1: Update the Store

**`src/store/authStore.ts`**

```ts
import { create } from 'zustand';

type AuthStore = {
  token: string | null;
  setToken: (token: string | null) => void;
  isLoggedIn: boolean;
};

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  isLoggedIn: false,
  setToken: (token) => set({ token, isLoggedIn: !!token }),
}));
```

------

### Step 8.2: Create a Fake Login API

**`src/services/authService.ts`**

```ts
export async function login(username: string, password: string): Promise<string> {
  // Simulate an API call and return a fake token
  await new Promise((res) => setTimeout(res, 800));

  if (username === 'admin' && password === '123456') {
    return 'mock-jwt-token';
  } else {
    throw new Error('Invalid credentials');
  }
}
```

------

### Step 8.3: Create a Login Page

**`src/pages/Login.tsx`**

```tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { useAuthStore } from '../store/authStore';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);

  const handleLogin = async () => {
    try {
      const token = await login(username, password);
      setToken(token);
      navigate('/');
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full mb-3 p-2 border"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-3 p-2 border"
      />
      <button onClick={handleLogin} className="w-full bg-blue-500 text-white p-2 rounded">
        Login
      </button>
    </div>
  );
}
```

------

### Step 8.4: Protect Pages (Require Login)

Wrap routes with a check:

**`src/router.tsx`**

```tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Forecast from './pages/Forecast';
import ModelManagement from './pages/ModelManagement';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { useAuthStore } from './store/authStore';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
}

export default function AppRouter() {
  return (
    <Router>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/forecast" element={<ProtectedRoute><Forecast /></ProtectedRoute>} />
          <Route path="/models" element={<ProtectedRoute><ModelManagement /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}
```

## Phase 9: Model Switching UI

- View available models (A model list & selector UI)
- Select one to activate (Zustand store for active model)
- Show selected model in UI (Dynamic display of selected model)

### Step 8.5: Add Model Store

**`src/store/modelStore.ts`**

```ts
import { create } from 'zustand';

export type Model = {
  id: string;
  name: string;
  accuracy: number;
};

type ModelStore = {
  models: Model[];
  activeModelId: string | null;
  setActiveModel: (id: string) => void;
  setModels: (models: Model[]) => void;
};

export const useModelStore = create<ModelStore>((set) => ({
  models: [],
  activeModelId: null,
  setActiveModel: (id) => set({ activeModelId: id }),
  setModels: (models) => set({ models }),
}));
```

### Step 8.6: Simulate Model List

**`src/services/modelService.ts`**

```ts
import { Model } from '../store/modelStore';

export async function getAvailableModels(): Promise<Model[]> {
  await new Promise((r) => setTimeout(r, 500));
  return [
    { id: 'model_v1', name: 'LSTM Model V1', accuracy: 0.85 },
    { id: 'model_v2', name: 'Transformer Model V2', accuracy: 0.91 },
    { id: 'model_v3', name: 'Hybrid CNN+LSTM V3', accuracy: 0.88 },
  ];
}
```

### Step 8.7: Build Model Management Page

**`src/pages/ModelManagement.tsx`**

```tsx
import { useEffect } from 'react';
import { useModelStore } from '../store/modelStore';
import { getAvailableModels } from '../services/modelService';

export default function ModelManagement() {
  const { models, activeModelId, setModels, setActiveModel } = useModelStore();

  useEffect(() => {
    getAvailableModels().then(setModels);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Model Management</h2>
      <div className="space-y-4">
        {models.map((model) => (
          <div
            key={model.id}
            className={`p-4 border rounded flex justify-between items-center ${
              activeModelId === model.id ? 'bg-green-100' : ''
            }`}
          >
            <div>
              <div className="font-bold">{model.name}</div>
              <div className="text-sm text-gray-600">Accuracy: {model.accuracy}</div>
            </div>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => setActiveModel(model.id)}
            >
              {activeModelId === model.id ? 'Active' : 'Activate'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Bonus: Show Selected Model in Navbar

**`src/components/Navbar.tsx`** (add inside the nav bar)

```tsx
import { useModelStore } from '../store/modelStore';

const activeModelName = useModelStore((state) =>
  state.models.find((m) => m.id === state.activeModelId)?.name || 'None'
);

// Inside return JSX
<span className="text-sm text-gray-500">Model: {activeModelName}</span>
```

Great! Let's **connect model selection to the forecast chart**, so the chart updates dynamically based on the currently active model.

## Phase 10: Connect Model Selection to Forecast Chart

* Fetch predictions by model (When user selects a model, load its forecast data from API (or mock it))
* Store forecast per model  (Cache/store predictions in Zustand)
* Auto-update chart (When model changes, the Forecast chart will auto-refresh)

### Step 10.1: Update Forecast Store

Update your Zustand store to support multiple model-based forecasts.

**`src/store/forecastStore.ts`**

```ts
import { create } from 'zustand';

type ForecastPoint = {
  timestamp: string;
  predictedPower: number;
};

type ForecastStore = {
  forecasts: Record<string, ForecastPoint[]>; // modelId -> forecast data
  setForecast: (modelId: string, data: ForecastPoint[]) => void;
};

export const useForecastStore = create<ForecastStore>((set) => ({
  forecasts: {},
  setForecast: (modelId, data) =>
    set((state) => ({
      forecasts: {
        ...state.forecasts,
        [modelId]: data,
      },
    })),
}));
```

------

### Step 10.2: Create `getForecastByModel`

Mocked forecast service based on model ID.

**`src/services/forecastService.ts`**

```ts
import { ForecastPoint } from '../store/forecastStore';

export async function getForecastByModel(modelId: string): Promise<ForecastPoint[]> {
  // Simulate a real API delay
  await new Promise((res) => setTimeout(res, 500));

  // Generate mock forecast
  const base = Math.random() * 50;
  return Array.from({ length: 24 }, (_, i) => ({
    timestamp: new Date(Date.now() + i * 3600 * 1000).toISOString(),
    predictedPower: parseFloat((base + Math.random() * 20).toFixed(2)),
  }));
}
```

------

### Step 10.3: Update `Forecast.tsx`

Make the chart re-render when:

- The **active model** changes
- The **forecast data** is updated

**`src/pages/Forecast.tsx`**

```tsx
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useModelStore } from '../store/modelStore';
import { useForecastStore } from '../store/forecastStore';
import { getForecastByModel } from '../services/forecastService';

export default function Forecast() {
  const activeModelId = useModelStore((s) => s.activeModelId);
  const forecasts = useForecastStore((s) => s.forecasts);
  const setForecast = useForecastStore((s) => s.setForecast);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeModelId && !forecasts[activeModelId]) {
      setLoading(true);
      getForecastByModel(activeModelId)
        .then((data) => setForecast(activeModelId, data))
        .finally(() => setLoading(false));
    }
  }, [activeModelId]);

  if (!activeModelId) {
    return <div className="text-gray-500">Please select a model to view forecast.</div>;
  }

  if (loading) {
    return <div className="text-blue-500">Loading forecast for {activeModelId}...</div>;
  }

  const data = forecasts[activeModelId] || [];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Forecast Chart</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <XAxis dataKey="timestamp" tickFormatter={(t) => new Date(t).getHours() + ':00'} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="predictedPower" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
```

### Bonus (Optional)

- You can allow **switching model directly from chart page** by placing a dropdown or link.
- Cache invalidation: Let users "Refresh" the forecast manually.

## Phase 11: Add historical data comparison in the chart

* Update Zustand store (Add a new state field for `historicalData`)
* Create mock historical API (Provide mock actual power data)
* Fetch & store historical data (Load this once when chart page mounts)
* Update Recharts to draw 2 lines (One for `predictedPower`, one for `actualPower`)

### Step 11.1: Update Zustand Store

Modify `forecastStore.ts` to support `historicalData`:

```ts
import { create } from 'zustand';

export type ForecastPoint = {
  timestamp: string;
  predictedPower: number;
  actualPower?: number; // optional for historical data
};

type ForecastStore = {
  forecasts: Record<string, ForecastPoint[]>;
  historicalData: ForecastPoint[];
  setForecast: (modelId: string, data: ForecastPoint[]) => void;
  setHistoricalData: (data: ForecastPoint[]) => void;
};

export const useForecastStore = create<ForecastStore>((set) => ({
  forecasts: {},
  historicalData: [],
  setForecast: (modelId, data) =>
    set((state) => ({
      forecasts: { ...state.forecasts, [modelId]: data },
    })),
  setHistoricalData: (data) => set({ historicalData: data }),
}));
```

### Step 11.2: Mock Historical Data API

Add this to `src/services/forecastService.ts`:

```ts
export async function getHistoricalData(): Promise<ForecastPoint[]> {
  await new Promise((res) => setTimeout(res, 300));

  const base = Math.random() * 50;
  return Array.from({ length: 24 }, (_, i) => ({
    timestamp: new Date(Date.now() - (24 - i) * 3600 * 1000).toISOString(), // past 24h
    actualPower: parseFloat((base + Math.random() * 25).toFixed(2)),
    predictedPower: 0, // not needed here
  }));
}
```

### Step 11.3: Fetch Historical Data

In `Forecast.tsx`, update `useEffect` to fetch both model and historical data:

```tsx
import { getForecastByModel, getHistoricalData } from '../services/forecastService';
import { useForecastStore } from '../store/forecastStore';

useEffect(() => {
  if (!historicalData.length) {
    getHistoricalData().then(setHistoricalData);
  }

  if (activeModelId && !forecasts[activeModelId]) {
    setLoading(true);
    getForecastByModel(activeModelId)
      .then((data) => setForecast(activeModelId, data))
      .finally(() => setLoading(false));
  }
}, [activeModelId]);
```

### Step 11.4: Update Chart to Show 2 Lines

```tsx
<ResponsiveContainer width="100%" height={400}>
  <LineChart>
    <XAxis dataKey="timestamp" tickFormatter={(t) => new Date(t).getHours() + ':00'} />
    <YAxis />
    <Tooltip />
    <Line dataKey="predictedPower" data={forecastData} stroke="#8884d8" name="Predicted Power" />
    <Line dataKey="actualPower" data={historicalData} stroke="#82ca9d" name="Actual Power" />
  </LineChart>
</ResponsiveContainer>
```

Make sure `forecastData` and `historicalData` are imported from Zustand:

```ts
const forecastData = forecasts[activeModelId] || [];
const historicalData = useForecastStore((s) => s.historicalData);
```

### Done!

You’ll now see:

- Predicted power (from selected model)
- Historical actual power (past 24h)

### Optional Enhancements

| Feature                | Benefit                                          |
| ---------------------- | ------------------------------------------------ |
| 🕓 Align timestamps     | Adjust prediction & historical to same time axis |
| 🔍 Zoom/pan             | Allow users to explore larger time ranges        |
| ⏳ Add loading spinners | Show status while fetching data                  |

## Phase 12: Save model & forecast selection to localStorage (persist across reload)

Let’s make your **model selection and forecast result persistent across page reloads** using `localStorage`. This enhances UX by remembering user preferences.

### What We’ll Persist

| Item              | Where it lives now           | Persist it to…                                 |
| ----------------- | ---------------------------- | ---------------------------------------------- |
| Selected model ID | `useForecastStore`           | `localStorage.modelId`                         |
| Forecast data     | `useForecastStore.forecasts` | `localStorage.forecasts` (optional, if needed) |

### Step 1: Add LocalStorage Logic to Zustand Store

Update `forecastStore.ts`:

```ts
import { create } from 'zustand';

export type ForecastPoint = {
  timestamp: string;
  predictedPower: number;
  actualPower?: number;
};

type ForecastStore = {
  forecasts: Record<string, ForecastPoint[]>;
  historicalData: ForecastPoint[];
  selectedModelId: string | null;

  setForecast: (modelId: string, data: ForecastPoint[]) => void;
  setHistoricalData: (data: ForecastPoint[]) => void;
  setSelectedModelId: (modelId: string) => void;
};

const savedModelId = localStorage.getItem('modelId');

export const useForecastStore = create<ForecastStore>((set) => ({
  forecasts: {},
  historicalData: [],
  selectedModelId: savedModelId,

  setForecast: (modelId, data) =>
    set((state) => {
      const updated = { ...state.forecasts, [modelId]: data };
      localStorage.setItem(`forecast_${modelId}`, JSON.stringify(data)); // optional
      return { forecasts: updated };
    }),

  setHistoricalData: (data) => set({ historicalData: data }),

  setSelectedModelId: (modelId) => {
    localStorage.setItem('modelId', modelId);
    set({ selectedModelId: modelId });
  },
}));
```

### Step 2: Update Component to Use `selectedModelId`

In `Forecast.tsx`:

```tsx
const selectedModelId = useForecastStore((s) => s.selectedModelId);
const setSelectedModelId = useForecastStore((s) => s.setSelectedModelId);

useEffect(() => {
  if (!historicalData.length) {
    getHistoricalData().then(setHistoricalData);
  }

  if (selectedModelId && !forecasts[selectedModelId]) {
    setLoading(true);
    getForecastByModel(selectedModelId)
      .then((data) => setForecast(selectedModelId, data))
      .finally(() => setLoading(false));
  }
}, [selectedModelId]);
```

### Step 3: Update UI Interaction

Wherever you change model (dropdown or buttons):

```tsx
<select value={selectedModelId || ''} onChange={(e) => setSelectedModelId(e.target.value)}>
  {modelOptions.map((m) => (
    <option key={m.id} value={m.id}>
      {m.name}
    </option>
  ))}
</select>
```

### Step 4: Test

1. Run the app
2. Select a model
3. Refresh the page  — it should remember the selected model
4. Optional: Open DevTools → Application → Local Storage → Confirm it’s saved

### Optional

You can expand to cache forecast results per model with `forecast_<modelId>` keys too.

