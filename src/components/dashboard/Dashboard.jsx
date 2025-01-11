import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { ChevronDown, ArrowUpRight, Bell, Menu, X, TrendingUp, Clock, Brain, Award } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const TestResultsDashboard = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedTimeFilter, setSelectedTimeFilter] = useState('15min');

    const accuracyData = [
        { slot: 1, accuracy: 90, subject: 'Geography' },
        { slot: 2, accuracy: 45, subject: 'History' },
        { slot: 3, accuracy: 35, subject: 'Science' },
        { slot: 4, accuracy: 60, subject: 'Math' },
        { slot: 5, accuracy: 55, subject: 'English' },
        { slot: 6, accuracy: 45, subject: 'Economics' },
        { slot: 7, accuracy: 65, subject: 'Politics' },
    ];

    const menuItems = [
        { label: 'Dashboard', active: false, icon: TrendingUp },
        { label: 'FirstGuru', active: false, icon: Brain },
        { label: 'TownHall', active: false, icon: Award },
        { label: 'AI Evaluation', active: false, icon: Brain },
        { label: 'Performance', active: false, icon: TrendingUp },
        { label: 'Mock Test', active: true, icon: Clock },
    ];

    const timeFilters = ['10min', '15min', '30min', '45min'];

    const approachData = [
        { type: 'Facts', percentage: 25, color: 'bg-purple-100 text-purple-700' },
        { type: 'Analysis', percentage: 32, color: 'bg-blue-100 text-blue-700' },
        { type: 'Elimination', percentage: 19, color: 'bg-green-100 text-green-700' },
        { type: 'Guess', percentage: 24, color: 'bg-orange-100 text-orange-700' },
    ];

    const timeCategories = [
        { time: '1-12', label: 'Easy', color: 'bg-green-100 text-green-600' },
        { time: '12-32', label: 'Medium', color: 'bg-yellow-100 text-yellow-600' },
        { time: '32-40', label: 'Hard', color: 'bg-red-100 text-red-600' },
    ];

    const TimeTaken = () => (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">Time Taken</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {/* First Timeline */}
                    <div className="relative">
                        <div className="h-2 bg-slate-100 rounded">
                            <div className="absolute h-2 bg-red-500 rounded" style={{ width: '60%' }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 mt-2">
                            {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((value) => (
                                <div key={value} className="relative">
                                    <div className="h-3 border-l border-slate-300"></div>
                                    <span>{value}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-slate-500 mt-2">
                            Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                        </p>
                    </div>

                    {/* Second Timeline */}
                    <div className="relative">
                        <div className="h-2 bg-slate-100 rounded">
                            <div className="absolute h-2 bg-green-500 rounded left-1/2" style={{ width: '20%' }}></div>
                            <div className="absolute h-2 bg-red-500 rounded" style={{ left: '70%', width: '30%' }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 mt-2">
                            {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((value) => (
                                <div key={value} className="relative">
                                    <div className="h-3 border-l border-slate-300"></div>
                                    <span>{Math.abs(value)}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-slate-500 mt-2">
                            Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-4 md:px-6 py-4 shadow-lg">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="text-cyan-400 text-xl font-semibold mr-8 tracking-tight">
                                Firstbench
                            </div>
                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex items-center space-x-8">
                                {menuItems.map((item, index) => (
                                    <button
                                        key={index}
                                        className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors
                                            ${item.active
                                                ? 'text-cyan-400 bg-slate-800/50'
                                                : 'text-gray-300 hover:text-cyan-400 hover:bg-slate-800/30'
                                            }`}
                                    >
                                        <item.icon className="w-4 h-4" />
                                        <span className="text-sm font-medium">{item.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                        <div className="flex items-center space-x-6">
                            <button className="text-gray-300 hover:text-white transition-colors relative">
                                <Bell className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <div className="flex items-center space-x-2 cursor-pointer group">
                                <div className="bg-gradient-to-br from-pink-500 to-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                                    P
                                </div>
                                <ChevronDown className="text-gray-300 w-4 h-4 group-hover:text-white transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <nav className="md:hidden mt-4 border-t border-slate-700/50">
                            {menuItems.map((item, index) => (
                                <button
                                    key={index}
                                    className={`flex items-center space-x-3 w-full py-3 px-2 ${item.active
                                        ? 'text-cyan-400 bg-slate-800/50'
                                        : 'text-gray-300'
                                        }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </button>
                            ))}
                        </nav>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto p-4 md:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {/* Results Card */}
                    <Card className="lg:row-span-2">
                        <CardHeader className="pb-2">
                            <div className="flex items-start space-x-4">
                                <div className="w-20 h-20 relative">
                                    <img
                                        src="/api/placeholder/80/80"
                                        alt="Results"
                                        className="rounded-lg shadow-md"
                                    />
                                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                                        ✓
                                    </div>
                                </div>
                                <div>
                                    <CardTitle className="text-xl text-purple-600">Your Result!</CardTitle>
                                    <p className="text-slate-500 text-sm mt-1">
                                        All your insights & details in one place
                                    </p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Score Section */}
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <span className="inline-flex items-center px-3 py-1 rounded-md bg-purple-100 text-purple-700 text-xs font-medium">
                                            YOU'VE PASSED! 🎉
                                        </span>
                                        <div className="mt-2 flex items-baseline">
                                            <span className="text-3xl font-bold">136</span>
                                            <span className="text-slate-500 text-lg">/240</span>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-teal-500 to-teal-400 text-white px-3 py-1 rounded-md text-sm font-medium shadow-sm">
                                        76% ACCURACY
                                    </div>
                                </div>
                            </div>

                            {/* Top Score */}
                            <div className="border-b border-slate-100 pb-6">
                                <div className="flex items-center space-x-4">
                                    <div className="relative">
                                        <img
                                            src="/api/placeholder/48/48"
                                            alt="Top scorer"
                                            className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                                        />
                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                                            <Award className="w-3 h-3 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-slate-500">Top Score</div>
                                        <div className="flex items-baseline">
                                            <span className="text-xl font-bold">230</span>
                                            <span className="text-slate-500 ml-1">/240</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Author Section */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-slate-500">By</span>
                                        <span className="font-medium">Parth Akotkar</span>
                                    </div>
                                    <span className="bg-gradient-to-r from-teal-500 to-teal-400 text-white px-3 py-1 rounded-md text-sm font-medium shadow-sm">
                                        92% ACCURACY
                                    </span>
                                </div>

                                <Alert className="bg-purple-50 border-purple-100 text-purple-800 mb-4">
                                    <AlertDescription>
                                        Improve your score by practicing more consistently.
                                    </AlertDescription>
                                </Alert>

                                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-6">
                                    Practice more
                                </Button>

                                <div className="border-t border-slate-100 pt-6">
                                    <h3 className="font-medium mb-2">Revisit Paper</h3>
                                    <p className="text-sm text-slate-500 mb-4">
                                        Challenge your friends by simply sharing a link to this test
                                    </p>
                                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                                        Visit
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Compare Cards */}
                    {[...Array(3)].map((_, index) => (
                        <Card key={index} className="hidden lg:block">
                            <CardContent className="p-4">
                                <button className="flex items-center text-slate-500 hover:text-slate-700 transition-colors float-right text-sm">
                                    Compare Accuracy
                                    <ChevronDown className="w-4 h-4 ml-1" />
                                </button>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Subject Understanding */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center">
                                <Brain className="w-5 h-5 mr-2 text-purple-500" />
                                Improvements
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { text: 'Geography', color: 'from-emerald-500 to-emerald-400' },
                                    { text: 'Politics', color: 'from-amber-500 to-amber-400' },
                                    { text: 'Current Affairs', color: 'from-cyan-500 to-cyan-400' },
                                    { text: 'General Studies', color: 'from-slate-500 to-slate-400' },
                                    { text: 'Mathematics', color: 'from-teal-500 to-teal-400' },
                                    { text: 'Social Studies', color: 'from-slate-400 to-slate-300' },
                                    { text: 'English Literature', color: 'from-red-500 to-red-400' },
                                    { text: 'Indian History', color: 'from-yellow-500 to-yellow-400' },
                                    { text: 'Economics', color: 'from-cyan-600 to-cyan-500' },
                                ].map((item, index) => (
                                    <span
                                        key={index}
                                        className={`bg-gradient-to-r ${item.color} text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm transition-transform hover:scale-105`}
                                    >
                                        {item.text}
                                    </span>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Response Time Card */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center">
                                <Clock className="w-5 h-5 mr-2 text-purple-500" />
                                Response Time
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <span className="inline-flex items-center px-3 py-1 rounded-md bg-purple-100 text-purple-700 text-sm font-medium mb-4">
                                Avg Time = 2min
                            </span>
                            <div className="flex items-baseline mb-4">
                                <span className="text-4xl font-bold">60</span>
                                <div className="ml-2">
                                    <span className="text-slate-600 text-sm">% Ans took</span>
                                    <div className="flex items-center text-red-500">
                                        <ArrowUpRight className="w-4 h-4" />
                                        <span>2min</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-red-500 font-medium flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                You are slow !
                            </div>
                        </CardContent>
                    </Card>

                    {/* Approach Data Card */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center">
                                <Brain className="w-5 h-5 mr-2 text-purple-500" />
                                Approach Data
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {approachData.map((item, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <span className={`px-2 py-1 rounded-md text-sm ${item.color}`}>
                                            {item.percentage}%
                                        </span>
                                        <span className="text-sm text-slate-600">Based on {item.type}</span>
                                    </div>
                                </div>
                            ))}
                            <div className="grid grid-cols-3 gap-2 mt-4">
                                {timeCategories.map((category, index) => (
                                    <div key={index} className="text-center">
                                        <div className={`rounded-md px-2 py-1 mb-1 ${category.color}`}>
                                            {category.time}
                                        </div>
                                        <span className="text-xs font-medium">{category.label}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Compare Accuracy Chart */}
                    <Card className="lg:col-span-2">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Compare Accuracy</CardTitle>
                        </CardHeader>
                        <CardContent className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={accuracyData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="slot" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="accuracy" fill="#818cf8" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Time Taken Visualization */}
                    <Card className="lg:col-span-2">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Time Taken</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8">
                                {/* First Timeline */}
                                <div className="relative">
                                    <div className="h-2 bg-slate-100 rounded">
                                        <div className="absolute h-2 bg-red-500 rounded" style={{ width: '60%' }}></div>
                                    </div>
                                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                                        {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((value) => (
                                            <div key={value} className="relative">
                                                <div className="h-3 border-l border-slate-300"></div>
                                                <span>{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-sm text-slate-500 mt-2">
                                        Lorem ipsum is simply dummy text of the printing and typesetting industry
                                    </p>
                                </div>

                                {/* Second Timeline */}
                                <div className="relative">
                                    <div className="h-2 bg-slate-100 rounded">
                                        <div className="absolute h-2 bg-green-500 rounded left-1/2" style={{ width: '20%' }}></div>
                                        <div className="absolute h-2 bg-red-500 rounded" style={{ left: '70%', width: '30%' }}></div>
                                    </div>
                                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                                        {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((value) => (
                                            <div key={value} className="relative">
                                                <div className="h-3 border-l border-slate-300"></div>
                                                <span>{Math.abs(value)}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-sm text-slate-500 mt-2">
                                        Lorem ipsum is simply dummy text of the printing and typesetting industry
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Time Filter Buttons */}
                <div className="flex space-x-2 mt-6">
                    {timeFilters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setSelectedTimeFilter(filter)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                                ${filter === selectedTimeFilter
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-slideDown {
                    animation: slideDown 0.2s ease-out;
                }
            `}</style>
        </div>
    );
};

export default TestResultsDashboard;