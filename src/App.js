import React, { useState } from 'react';
import Primer from './Primer';
import Display from './Display';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

export default function App() {
    const [allRules, setAllRules] = useState([]);
    const [acceptedState, setAcceptedState] = useState('');

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Primer
                                rules={[allRules, setAllRules]}
                                state={[acceptedState, setAcceptedState]}
                            />
                        }
                    />
                    <Route
                        path="/display"
                        element={
                            <Display
                                rules={[allRules, setAllRules]}
                                state={[acceptedState, setAcceptedState]}
                            />
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}
