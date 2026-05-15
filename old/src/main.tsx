import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom'

import { App } from './App.tsx'
import { Splash } from './pages/Splash.tsx'
import { Setup } from './pages/Setup.tsx'
import { SuperInvictusEntertainmentSysteem } from './pages/SuperInvictusEntertainmentSysteem.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<App />}>
                    <Route path="setup" element={<Setup />} />
                    <Route
                        path="game"
                        element={<SuperInvictusEntertainmentSysteem />}
                    />
                    <Route index element={<Splash />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)