"use client";
import React, { useState } from "react";
export default function Dashboard() {
    const [openDashboard, setOpenDashboard] = useState(true);
    const [openAI, setOpenAI] = useState(false);
    const [inputText, setInputText] = useState("");
    const [result, setResult] = useState(null);
    const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
  const handleAnalyze = async () => {
  const response = await fetch("http://localhost:5000/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: inputText }),
  });

  const data = await response.json();
  setResult(data);
};
  return (
    <div className="flex min-h-screen bg-white text-black">

      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white p-5 flex flex-col">
        <h1 className="text-xl font-bold">Guardian AI</h1>
        <p className="text-sm text-gray-400">
          AI Safety • Intelligence • Control
        </p>
    <div className="mt-6 space-y-4">

          {/* Dashboard Dropdown */}
        <div>
            <div
          className="cursor-pointer font-semibold flex justify-between items-center"
          onClick={() => setOpenDashboard(!openDashboard)}>
          Dashboard
          <span>{openDashboard ? "▲" : "▼"}</span>
         </div>

         {openDashboard && (
         <div className="ml-4 mt-2 space-y-2 text-sm text-gray-300">

           <div onClick={() => scrollToSection("Overview")}
           className="hover:text-white cursor-pointer">Overview</div>
           <div onClick={() => scrollToSection("Core Modules")}
            className="hover:text-white cursor-pointer">Core Modules</div>
           <div className="hover:text-white cursor-pointer">Content Moderation</div>
           <div className="hover:text-white cursor-pointer">Policy Enforcement</div>
           <div className="hover:text-white cursor-pointer">Threat Detection</div>
           <div className="hover:text-white cursor-pointer">Research & Analytics</div>

         </div>
         )}
        </div>

         {/* AI Intelligence Suite Dropdown */}
        <div>
            <div
             className="cursor-pointer font-semibold flex justify-between items-center"
             onClick={() => setOpenAI(!openAI)}>
      
             AI Intelligence Suite
             <span>{openAI ? "▲" : "▼"}</span>
             </div>

           {openAI && (
            <div className="ml-4 mt-2 space-y-2 text-sm text-gray-300">

              <div className="hover:text-white cursor-pointer">Financial Fraud Bot</div>
              <div className="hover:text-white cursor-pointer">AI Verification Bot</div>
              <div className="hover:text-white cursor-pointer">Adult Content Guard</div>
              <div className="hover:text-white cursor-pointer">Unified AI Log Center</div>

            </div>
           )}
        </div>
    </div>
        
          {/* AI Integration Strip */}
     <div className="mt-8 space-y-3">
        <p className="text-xs text-gray-400">AI MODULES</p>

        <div className="bg-slate-700 p-3 rounded-lg text-sm">
        Deepfake Detection
        </div>

        <div className="bg-slate-700 p-3 rounded-lg text-sm">
        Fraud Detection
        </div>

        <div className="bg-slate-700 p-3 rounded-lg text-sm">
        Content Restriction
        </div>

        <div className="bg-slate-700 p-3 rounded-lg text-sm">
        Unified Logs
        </div>
     </div>
         {/* Bottom Section */}
     <div className="mt-10 border-t border-gray-700 pt-4 space-y-3 text-sm">

        <div>Settings</div>
        <div>Access Control</div>
        <div>Logs & Reports</div>
     </div>
    </div>
  


      {/* Main Content */}
      <div className="flex-1 p-6">

        {/* Navbar */}
        <div className="flex justify-between items-center mb-6 bg-slate-800 p-4 rounded-lg shadow">
          <input
            placeholder="Search..."
            className="bg-gray-100 p-2 rounded w-1/3 text-black"
          />

          <div className="flex text-white gap-4">
            <span>Notifications</span>
            <span>Active</span>
            <span>Profile</span>
          </div>
        </div>

        {/* Welcome Panel */}
         <div id="Overview" className="bg-slate-800 p-5 rounded-lg">
          <h2 className="text-white font-semibold">Welcome Back 👋</h2>
          <p className="text-white mt-2">
            System running smoothly. AI monitoring all modules.
          </p>

          <div className="grid grid-cols-4 gap-4 mt-4 text-white">
            <div>Active Models: 6</div>
            <div>Alerts Today: 3</div>
            <div>Actions Taken: 124</div>
            <div>System Health: 98.2%</div>
          </div>
        </div>

       
        {/* Core Modules */}
       <div id="Core Modules" className="grid grid-cols-3 gap-4 mt-6">

        <div className="bg-slate-800 p-4 rounded-lg hover:bg-slate-900 transition cursor-pointer">
          <h3 className="font-semibold text-white">Content Moderation</h3>
          <p className="text-sm text-gray-400 mt-2">Flagged Content: 1240</p>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg hover:bg-slate-900 transition cursor-pointer">
         <h3 className="font-semibold text-white">Policy Enforcement</h3>
         <p className="text-sm text-gray-400 mt-2">Violations: 320</p>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg hover:bg-slate-900 transition cursor-pointer">
         <h3 className="font-semibold text-white">Threat Detection</h3>
         <p className="text-sm text-gray-400 mt-2">Active Threats: 2</p>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg hover:bg-slate-900 transition cursor-pointer">
         <h3 className="font-semibold text-white">Analytics</h3>
         <p className="text-sm text-gray-400 mt-2">Daily Reports Generated</p>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg hover:bg-slate-900 transition cursor-pointer">
         <h3 className="font-semibold text-white">AI Marketing</h3>
         <p className="text-sm text-gray-400 mt-2">Engagement Insights Active</p>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg hover:bg-slate-900 transition cursor-pointer">
         <h3 className="font-semibold text-white">AI Insights</h3>
        <p className="text-sm text-gray-400 mt-2">Smart Recommendations Running</p>
        </div>
       </div>
        {/* Content Moderation Section */}
        <div className="mt-8 bg-slate-800 text-white p-5 rounded-lg">

         <h2 className="text-lg font-semibold mb-4">
          🛡 Content Moderation
         </h2>

         {/* Input */}
         <input
          type="text"
          value={inputText}
         onChange={(e) => setInputText(e.target.value)}
         placeholder="Enter text to analyze..."
          className="w-full p-2 rounded text-white"
         />

         {/* Button */}
          <button
          onClick={handleAnalyze}
          className="mt-3 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-white"
          >
          Analyze
          </button>

         {/* Result */}
         {result && (
         <div className="mt-4 p-4 bg-slate-800 rounded-lg">
          <p><strong>Risk:</strong> {result.risk}</p>
          <p><strong>Category:</strong> {result.category}</p>
          <p><strong>Explanation:</strong> {result.explanation}</p>
        </div>
         )}

        </div>


       {/* Module Details Table */}
   <div className="mt-8 bg-slate-800 text-white p-4 rounded-lg">

      <h2 className="text-lg font-semibold mb-4">
        Module Insights
      </h2>

      <table className="w-full text-sm">

      {/* Table Header */}
     <thead>
      <tr className="text-left text-gray-400 border-b border-gray-700">
        <th className="pb-2">Module</th>
        <th className="pb-2">Key Metrics</th>
        <th className="pb-2">Action</th>
      </tr>
     </thead>

      {/* Table Body */}
     <tbody className="space-y-4">

      <tr className="border-b border-gray-700">
        <td className="py-3">Content Moderation</td>
        <td>
          Flagged: 1240 <br />
          Accuracy: 99.1%
        </td>
        <td className="text-blue-400 cursor-pointer hover:underline">
          View Details
        </td>
      </tr>

      <tr className="border-b border-gray-700">
        <td className="py-3">Policy Enforcement</td>
        <td>
          Violations: 320 <br />
          Rules Active: 45
        </td>
        <td className="text-blue-400 cursor-pointer hover:underline">
          Manage Policies
        </td>
      </tr>

      <tr className="border-b border-gray-700">
        <td className="py-3">Research & Analytics</td>
        <td>
          Health Score: 87% <br />
          Trends Detected: 12
        </td>
        <td className="text-blue-400 cursor-pointer hover:underline">
          View Insights
        </td>
      </tr>

      <tr className="border-b border-gray-700">
        <td className="py-3">Ad & Brand Safety</td>
        <td>
          Ads Scanned: 8230 <br />
          Risk Score: Low
        </td>
        <td className="text-blue-400 cursor-pointer hover:underline">
          Analyze Ads
        </td>
      </tr>

      <tr className="border-b border-gray-700">
        <td className="py-3">Threat Response</td>
        <td>
          Active Threats: 2 <br />
          Resolved Today: 18
        </td>
        <td className="text-blue-400 cursor-pointer hover:underline">
          Open Threat Map
        </td>
      </tr>

      <tr>
        <td className="py-3">AI Integration Suite</td>
        <td>
          Models Active: 6 <br />
          Last Update: 2 mins ago
        </td>
        <td className="text-blue-400 cursor-pointer hover:underline">
          Manage Models
        </td>
      </tr>

      </tbody>
      </table>

    </div>
        <h2 className="text-lg font-semibold mt-8 mb-4">
        AI Models Status
        </h2>
        <div className="bg-slate-800 text-white p-4 rounded-lg">

         <table className="w-full text-sm">

           {/* Header */}
          <thead>
          <tr className="text-left text-gray-400 border-b border-gray-700">
          <th className="pb-2">Model</th>
          <th>Status</th>
          <th>Accuracy</th>
          <th>Last Updated</th>
          <th>Action</th>
          </tr>
         </thead>

         {/* Body */}
          <tbody>

          <tr className="border-b border-gray-700">
          <td className="py-3">Deepfake Detection Model</td>
          <td className="text-green-400">Active</td>
          <td>98.7%</td>
          <td>2 mins ago</td>
          <td className="text-blue-400 cursor-pointer hover:underline">View Logs</td>
          </tr>
          <tr className="border-b border-gray-700">
          <td className="py-3">Fraud & Scam Detection Chatbot</td>
          <td className="text-green-400">Active</td>
          <td>97.9%</td>
          <td>5 mins ago</td>
          <td className="text-blue-400 cursor-pointer hover:underline">View Logs</td>
          </tr>
          <tr className="border-b border-gray-700">
          <td className="py-3">Pornography and Restriction AI</td>
          <td className="text-green-400">Training</td>
          <td>95.4%</td>
          <td>10 mins ago</td>
          <td className="text-blue-400 cursor-pointer hover:underline">View Logs</td>
          </tr>
          <tr className="border-b border-gray-700">
          <td className="py-3">Content Moderation NLP Model</td>
          <td className="text-green-400">Active</td>
          <td>99.1%</td>
          <td>1 min ago</td>
          <td className="text-blue-400 cursor-pointer hover:underline">View Logs</td>
          </tr>
          <tr className="border-b border-gray-700">
          <td className="py-3">Behavioral Threat Detection AI</td>
          <td className="text-green-400">Error</td>
          <td>92.3%</td>
          <td>15 mins ago</td>
          <td className="text-blue-400 cursor-pointer hover:underline">View Logs</td>
          </tr>
          <tr className="border-b border-gray-700">
          <td className="py-3">Ad Safety Intelligence Model</td>
          <td className="text-green-400">Active</td>
          <td>98.5%</td>
          <td>3 mins ago</td>
          <td className="text-blue-400 cursor-pointer hover:underline">View Logs</td>
          </tr>
          </tbody>

         </table>

        </div>

        {/* Live AI Activity Feed */}
        <div className="bg-slate-800 text-white mt-6 p-4 rounded-lg h-52 overflow-y-auto">

         <div className="flex justify-between items-center mb-3">

           {/* Left side */}
          <h3 className="text-sm text-gray-400">
           Live AI Activity Feed
          </h3>

           {/* Right side (Legend) */}
         <div className="flex gap-3 text-xs items-center">

           <span className="flex items-center gap-1 text-red-400">
             ● Critical
           </span>

           <span className="flex items-center gap-1 text-yellow-400">
              ● Warning
           </span>

           <span className="flex items-center gap-1 text-blue-400">
              ● Info
           </span>
         </div>
         </div>

          <div className="space-y-2 text-sm font-mono">

           <p className="text-blue-400">
           [10:45 AM] INFO: Model initialized successfully
           </p>

           <p className="text-yellow-400">
           [10:47 AM] WARNING: Spam detected in user message
           </p>

           <p className="text-red-400">
           [10:48 AM] CRITICAL: Fraud pattern detected in chatbot
           </p>

           <p className="text-yellow-400">
           [10:50 AM] WARNING: Policy violation (Hate Speech)
           </p>

           <p className="text-blue-400">
           [10:52 AM] INFO: Ad blocked due to unsafe content
           </p>

           <p className="text-red-400">
           [10:55 AM] CRITICAL: Deepfake detected in uploaded video
           </p>

         </div>
        </div>
        {/* Analytics Section */}
             <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">
             📊 Analytics Dashboard
             </h2>

              {/* Top Stats */}
         <div className="grid grid-cols-3 gap-4 mb-6">

             <div className="bg-slate-800 text-white p-4 rounded-lg">
             <p className="text-sm text-gray-400">Total Users</p>
             <h3 className="text-xl font-bold">12,430</h3>
             </div>

            <div className="bg-slate-800 text-white p-4 rounded-lg">
            <p className="text-sm text-gray-400">Total Reports</p>
            <h3 className="text-xl font-bold">3,210</h3>
            </div>

            <div className="bg-slate-800 text-white p-4 rounded-lg">
            <p className="text-sm text-gray-400">Risk Level</p>
            <h3 className="text-xl font-bold text-red-400">Medium</h3>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}