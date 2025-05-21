import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Agents from './pages/Agents';
import ConversationEditor from './pages/ConversationEditor';
import PromptBuilder from './pages/PromptBuilder';
import Presentation from './pages/Presentation';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="presentation" element={<Presentation />} />
          <Route path="agents" element={<Agents />} />
          <Route path="conversations" element={<ConversationEditor />} />
          <Route path="prompts" element={<PromptBuilder />} />
        </Route>
      </Routes>
    </Router>
  );
}
