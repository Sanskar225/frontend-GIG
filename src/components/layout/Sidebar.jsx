import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Briefcase, FileText, DollarSign, Settings, HelpCircle, 
  TrendingUp, Zap, Users, BarChart3, Target, MessageSquare, 
  ChevronRight, Shield, Star, Rocket
} from 'lucide-react';

export const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { 
      to: '/dashboard', 
      label: 'Dashboard', 
      icon: Home,
      badge: 'AI-Powered',
      badgeColor: 'from-cyan-500 to-blue-500'
    },
    { 
      to: '/gigs', 
      label: 'Browse Gigs', 
      icon: TrendingUp,
      badge: 'Hot',
      badgeColor: 'from-orange-500 to-red-500'
    },
    { 
      to: '/my-gigs', 
      label: 'My Gigs', 
      icon: Briefcase,
      count: 3,
      countColor: 'bg-cyan-500'
    },
    { 
      to: '/my-bids', 
      label: 'My Bids', 
      icon: FileText,
      count: 5,
      countColor: 'bg-blue-500'
    },
    { 
      to: '/earnings', 
      label: 'Earnings', 
      icon: DollarSign,
      premium: true
    },
  ];

  const statsItems = [
    { label: 'Response Rate', value: '98%', icon: Target, color: 'text-green-500' },
    { label: 'Avg. Rating', value: '4.9', icon: Star, color: 'text-yellow-500' },
    { label: 'Active Projects', value: '3', icon: Rocket, color: 'text-cyan-500' },
  ];

  return (
    <aside className={`hidden lg:flex flex-col bg-gradient-to-b from-white to-gray-50/50 border-r border-gray-200/70 min-h-screen transition-all duration-300 ${collapsed ? 'w-20' : 'w-72'}`}>
      {/* Sidebar Header */}
      <div className="p-5 border-b border-gray-200/50">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Briefcase className="text-white" size={22} />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  GigFlow
                </span>
                <p className="text-xs text-cyan-600 font-medium -mt-1">Freelance Pro</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Briefcase className="text-white" size={22} />
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${collapsed ? 'mx-auto' : ''}`}
          >
            <ChevronRight className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} size={18} />
          </button>
        </div>
        
        {/* Trust Badge - Inspired by ServiceHive */}
        {!collapsed && (
          <div className="mt-4 p-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-200/50">
            <div className="flex items-center space-x-2">
              <Shield size={16} className="text-cyan-600" />
              <span className="text-sm font-semibold text-cyan-800">TRUSTED PARTNER</span>
            </div>
            <p className="text-xs text-cyan-700 mt-1">Verified & Secure Platform</p>
          </div>
        )}
      </div>

      {/* Stats Dashboard - Inspired by ServiceHive's data widgets */}
      {!collapsed && (
        <div className="px-4 py-5">
          <div className="space-y-3">
            {statsItems.map((stat, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <stat.icon size={16} className={stat.color} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 ${collapsed ? 'text-center' : 'px-4'}`}>
          {collapsed ? '•••' : 'Navigation'}
        </h3>
        
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`
                group flex items-center ${collapsed ? 'justify-center px-3' : 'justify-between px-4'} py-3.5 rounded-xl font-medium transition-all duration-300 relative overflow-hidden
                ${isActive(item.to)
                  ? 'bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700 border border-cyan-200/70 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100/80 hover:shadow-sm'
                }
              `}
            >
              <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'}`}>
                <div className={`
                  w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300
                  ${isActive(item.to)
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 group-hover:bg-cyan-100 group-hover:text-cyan-600'
                  }
                `}>
                  <Icon size={18} />
                </div>
                {!collapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </div>
              
              {/* Badges & Counts */}
              {!collapsed && (
                <div className="flex items-center space-x-2">
                  {item.badge && (
                    <span className={`text-xs font-bold bg-gradient-to-r ${item.badgeColor} text-white px-2 py-1 rounded-full`}>
                      {item.badge}
                    </span>
                  )}
                  {item.count && (
                    <span className={`text-xs font-bold ${item.countColor} text-white w-5 h-5 rounded-full flex items-center justify-center`}>
                      {item.count}
                    </span>
                  )}
                  {item.premium && (
                    <span className="text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded-full">
                      PRO
                    </span>
                  )}
                </div>
              )}

              {/* Active Indicator */}
              {isActive(item.to) && !collapsed && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-r-full"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200/50 space-y-1">
        <Link
          to="/settings"
          className={`
            group flex items-center ${collapsed ? 'justify-center px-3' : 'space-x-3 px-4'} py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-100/80 transition-colors
          `}
        >
          <div className={`
            w-9 h-9 rounded-xl flex items-center justify-center
            ${collapsed ? 'bg-gray-100 group-hover:bg-cyan-100' : ''}
          `}>
            <Settings size={18} className="text-gray-600 group-hover:text-cyan-600" />
          </div>
          {!collapsed && <span>Settings</span>}
        </Link>
        
        <Link
          to="/help"
          className={`
            group flex items-center ${collapsed ? 'justify-center px-3' : 'space-x-3 px-4'} py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-100/80 transition-colors
          `}
        >
          <div className={`
            w-9 h-9 rounded-xl flex items-center justify-center
            ${collapsed ? 'bg-gray-100 group-hover:bg-cyan-100' : ''}
          `}>
            <HelpCircle size={18} className="text-gray-600 group-hover:text-cyan-600" />
          </div>
          {!collapsed && <span>Help & Support</span>}
        </Link>

        {/* Quick Actions - Inspired by ServiceHive's "What can I help with?" */}
        {!collapsed && (
          <div className="mt-4 p-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-200/50">
            <div className="flex items-center space-x-2 mb-2">
              <MessageSquare size={16} className="text-cyan-600" />
              <span className="text-sm font-semibold text-cyan-800">Need Help?</span>
            </div>
            <p className="text-xs text-cyan-700 mb-3">Our AI assistant is here 24/7</p>
            <button className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium rounded-lg hover:shadow-md transition-shadow">
              Chat Now
            </button>
          </div>
        )}
      </div>

      {/* User Profile Summary */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200/50 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl flex items-center justify-center border border-cyan-200">
              <Users size={18} className="text-cyan-700" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">John Doe</p>
              <p className="text-xs text-gray-600">Freelancer • Pro Plan</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full" 
                    style={{ width: '75%' }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">75%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};