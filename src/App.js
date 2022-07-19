import React from 'react';
import Primer from './Primer';
import Display from './Display';
import TwoWayDisplay from './TwoWay';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './css/App.css';

export default function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Primer/>
                        }
                    />
                    <Route
                        path="/display"
                        element={
                            <Display/>
                        }
                    />
                    <Route
                        path="/twoWayDisplay"
                        element={
                            <TwoWayDisplay/>
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}
