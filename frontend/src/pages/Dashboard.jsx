import React from 'react';
import { FaRegBell } from "react-icons/fa";
import { IoAlertCircleOutline } from "react-icons/io5";
import '../Dashboard.css'; // Import the CSS file
import SecurityDashboardBarChart from '../components/barchart.jsx'; // Import the Bar Chart component
import UserActivityBumpChart from '../components/linegraph.jsx'; // Import the Bump Chart component

export default function Dashboard() {
    const alerts = [
        { id: 1, message: "Protection component disabled", devices: 3 },
        { id: 2, message: "Dangerous URL", devices: 1 },
        { id: 3, message: "Suspicious user activity", devices: 1 },
        { id: 4, message: "Protection component disabled", devices: 3 },
        { id: 5, message: "Dangerous URL", devices: 1 },
        { id: 6, message: "Suspicious user activity", devices: 1 },
        { id: 7, message: "Protection component disabled", devices: 3 },
        { id: 8, message: "Dangerous URL", devices: 1 },
    ];

    const unresolvedAlerts = alerts.length; // Calculate unresolved alerts

    return (
        <>
            <div>
                <h1 className="text-xl">Good Morning Kim, you have {unresolvedAlerts} alerts to resolve</h1>
            </div>
            <div className="mt-4 flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 max-h-96 overflow-y-auto custom-scrollbar p-4">
                    <div className="flex flex-row items-center">
                        <div>
                            <FaRegBell fontSize={30} />
                        </div>
                        <div className="flex flex-col ml-3">
                            <h1 className="text-xl mt-4 text-gray-500">Alerts to resolve</h1>
                            <p className="text-2xl font-bold">{unresolvedAlerts}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        {alerts.length > 0 ? (
                            <ul className="list-none">
                                {alerts.map(alert => (
                                    <li key={alert.id} className="flex flex-row items-center text-lg text-gray-700 mb-2">
                                        <IoAlertCircleOutline className="text-red-500 mr-2" />
                                        <div className="flex-grow">
                                            <span>{alert.message}</span>
                                        </div>
                                        <span className="text-sm text-blue-500 mr-4">{alert.devices} devices</span>
                                        <select className="p-1 border border-gray-300 rounded" aria-label="Alert Action">
                                            <option value="resolve">Resolve</option>
                                            <option value="ignore">Ignore</option>
                                            <option value="snooze">Snooze</option>
                                        </select>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No alerts to display</p>
                        )}
                    </div>
                </div>
                <div className="w-full lg:w-1/2 max-h-96 overflow-y-auto custom-scrollbar p-4">
                    <SecurityDashboardBarChart />
                </div>
            </div>
            <div className="mt-4 p-4 max-h-96 overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl">User Activity</h1>
                    <button className="text-blue-500 hover:underline">View All</button>
                </div>
                <div className="h-96">
                    <UserActivityBumpChart />
                </div>
            </div>
        </>
    );
}
