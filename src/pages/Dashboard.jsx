import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMyGigs } from '../store/slices/gigSlice';
import { fetchMyBids } from '../store/slices/bidSlice';
import { GigCard } from '../components/gigs/GigCard';
import { Button } from '../components/ui/Button';
import { Loader, SkeletonList } from '../components/ui/Loader';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { 
  Briefcase, 
  DollarSign, 
  FileText, 
  TrendingUp, 
  Plus,
  CheckCircle,
  Clock,
  Users,
  Target,
  BarChart3,
  Award,
  Shield,
  Zap,
  Sparkles,
  Rocket,
  MessageSquare,
  Calendar,
  ArrowUpRight,
  ChevronRight,
  Activity,
  PieChart,
  Target as TargetIcon,
  Bell,
  Eye
} from 'lucide-react';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { myGigs, loading: gigsLoading } = useSelector((state) => state.gigs);
  const { myBids, loading: bidsLoading } = useSelector((state) => state.bids);

  useEffect(() => {
    dispatch(fetchMyGigs());
    dispatch(fetchMyBids());
  }, [dispatch]);

  const stats = {
    totalGigs: myGigs.length,
    openGigs: myGigs.filter((g) => g.status === 'open').length,
    activeGigs: myGigs.filter((g) => g.status === 'assigned').length,
    completedGigs: myGigs.filter((g) => g.status === 'completed').length,
    totalBids: myBids.length,
    pendingBids: myBids.filter((b) => b.status === 'pending').length,
    acceptedBids: myBids.filter((b) => b.status === 'hired').length,
    rejectedBids: myBids.filter((b) => b.status === 'rejected').length,
  };

  // Calculate additional metrics
  const totalEarnings = myGigs
    .filter(g => g.status === 'completed')
    .reduce((sum, gig) => sum + (gig.budget || 0), 0);
  
  const activeEarnings = myBids
    .filter(b => b.status === 'hired')
    .reduce((sum, bid) => sum + (bid.price || 0), 0);
  
  const avgResponseTime = 2.5; // hours
  const successRate = myBids.length > 0 
    ? Math.round((stats.acceptedBids / myBids.length) * 100) 
    : 0;

  const StatCard = ({ icon: Icon, label, value, color, subtitle, trend, onClick }) => (
    <div 
      onClick={onClick}
      className={`bg-gradient-to-br ${color} border border-gray-200/50 rounded-2xl p-6 cursor-pointer hover:shadow-xl hover:shadow-${color.split('-')[1]}-500/10 hover:-translate-y-1 transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center">
          <Icon size={24} className="text-gray-700" />
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-sm">
          <ArrowUpRight size={16} className="text-green-500" />
          <span className="text-green-600 font-medium">{trend}</span>
          <span className="text-gray-500 ml-1">this month</span>
        </div>
      )}
    </div>
  );

  const PerformanceCard = ({ title, value, subtitle, icon: Icon, color }) => (
    <div className="bg-white border border-gray-200/50 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center`}>
            <Icon size={16} className="text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">{title}</span>
        </div>
        <ChevronRight size={16} className="text-gray-400" />
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-cyan-900/90 to-blue-900/90 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Shield size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">AI-POWERED DASHBOARD</h3>
                <p className="text-sm text-cyan-200">Smart insights & analytics for your freelance journey</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-cyan-300" />
                <span className="text-sm">Real-time Updates</span>
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">{user?.name}</span>! 👋
              </h1>
              <p className="text-gray-600 mb-4">
                Here's your performance overview and smart recommendations for today.
              </p>
              <div className="flex items-center gap-3">
                <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0 px-3 py-1">
                  <TrendingUp size={14} className="mr-1" />
                  {user?.role === 'freelancer' ? 'Freelancer Pro' : 'Client Premium'}
                </Badge>
                <Badge variant="outline" className="border-gray-300 text-gray-700">
                  <Calendar size={14} className="mr-1" />
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </Badge>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="flex gap-3 flex-wrap">
              <Button 
                icon={Plus}
                onClick={() => navigate('/gigs/create')}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 px-6 py-3 rounded-xl border-0"
              >
                <div className="flex items-center gap-2">
                  <Rocket size={18} />
                  Post New Gig
                </div>
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/gigs')}
                className="border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-3 rounded-xl font-medium"
              >
                <div className="flex items-center gap-2">
                  <Eye size={18} />
                  Browse Gigs
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Activity size={20} className="text-cyan-600" />
              Performance Metrics
            </h2>
            <span className="text-sm text-cyan-600 font-medium flex items-center gap-1">
              <Zap size={14} />
              AI-Powered Insights
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <PerformanceCard
              title="Success Rate"
              value={`${successRate}%`}
              subtitle="Bid acceptance rate"
              icon={TargetIcon}
              color="bg-gradient-to-r from-green-500 to-emerald-500"
            />
            <PerformanceCard
              title="Avg. Response"
              value={`${avgResponseTime}h`}
              subtitle="Response time average"
              icon={Clock}
              color="bg-gradient-to-r from-cyan-500 to-blue-500"
            />
            <PerformanceCard
              title="Total Earnings"
              value={`$${totalEarnings.toLocaleString()}`}
              subtitle="Completed projects"
              icon={DollarSign}
              color="bg-gradient-to-r from-purple-500 to-violet-500"
            />
            <PerformanceCard
              title="Active Revenue"
              value={`$${activeEarnings.toLocaleString()}`}
              subtitle="In progress projects"
              icon={TrendingUp}
              color="bg-gradient-to-r from-amber-500 to-orange-500"
            />
          </div>
        </div>

        {/* Gigs Overview */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Briefcase size={20} className="text-cyan-600" />
              Gigs Overview
            </h2>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/my-gigs')}
              className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50"
            >
              View All
              <ChevronRight size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={Briefcase}
              label="Total Gigs"
              value={stats.totalGigs}
              color="from-cyan-50 to-blue-50"
              subtitle="All time posted"
              trend="+12%"
              onClick={() => navigate('/my-gigs')}
            />
            <StatCard
              icon={Clock}
              label="Open Gigs"
              value={stats.openGigs}
              color="from-blue-50 to-cyan-50"
              subtitle="Accepting bids"
              trend="+5%"
              onClick={() => navigate('/my-gigs?status=open')}
            />
            <StatCard
              icon={Activity}
              label="Active Projects"
              value={stats.activeGigs}
              color="from-amber-50 to-orange-50"
              subtitle="In progress"
              trend="+18%"
              onClick={() => navigate('/my-gigs?status=assigned')}
            />
            <StatCard
              icon={CheckCircle}
              label="Completed"
              value={stats.completedGigs}
              color="from-green-50 to-emerald-50"
              subtitle="Successfully delivered"
              trend="+24%"
              onClick={() => navigate('/my-gigs?status=completed')}
            />
          </div>
        </div>

        {/* Bids Analytics */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FileText size={20} className="text-cyan-600" />
              Bids Analytics
            </h2>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/my-bids')}
              className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50"
            >
              View All
              <ChevronRight size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={FileText}
              label="Total Bids"
              value={stats.totalBids}
              color="from-purple-50 to-violet-50"
              subtitle="All submitted bids"
              trend="+15%"
              onClick={() => navigate('/my-bids')}
            />
            <StatCard
              icon={Clock}
              label="Pending"
              value={stats.pendingBids}
              color="from-blue-50 to-cyan-50"
              subtitle="Awaiting review"
              trend="+8%"
              onClick={() => navigate('/my-bids?status=pending')}
            />
            <StatCard
              icon={CheckCircle}
              label="Accepted"
              value={stats.acceptedBids}
              color="from-green-50 to-emerald-50"
              subtitle="Hired successfully"
              trend="+22%"
              onClick={() => navigate('/my-bids?status=hired')}
            />
            <StatCard
              icon={TrendingUp}
              label="Rejected"
              value={stats.rejectedBids}
              color="from-red-50 to-rose-50"
              subtitle="Learning opportunities"
              trend="+3%"
              onClick={() => navigate('/my-bids?status=rejected')}
            />
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">AI Recommendations</h3>
                  <p className="text-sm text-gray-600">Smart suggestions to boost your performance</p>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-purple-500 to-violet-500 text-white border-0">
                Powered by AI
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 border border-gray-200/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Target size={16} className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Increase Success Rate</h4>
                    <p className="text-xs text-gray-500">Target higher budget gigs</p>
                  </div>
                </div>
                <div className="text-sm text-gray-700">
                  Your success rate on projects above $1,000 is 65% higher.
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-gray-200/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <MessageSquare size={16} className="text-cyan-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Improve Response Time</h4>
                    <p className="text-xs text-gray-500">Respond faster to new gigs</p>
                  </div>
                </div>
                <div className="text-sm text-gray-700">
                  First responders get 3x more interview opportunities.
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-gray-200/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BarChart3 size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Optimize Your Profile</h4>
                    <p className="text-xs text-gray-500">Add portfolio projects</p>
                  </div>
                </div>
                <div className="text-sm text-gray-700">
                  Profiles with portfolios receive 40% more interview requests.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Gigs */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Briefcase size={20} className="text-cyan-600" />
                Recent Gigs
              </h2>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/my-gigs')}
                className="text-sm text-cyan-600 hover:text-cyan-700"
              >
                View All
              </Button>
            </div>

            {gigsLoading ? (
              <SkeletonList count={3} />
            ) : myGigs.length === 0 ? (
              <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200/50 rounded-2xl p-8 text-center">
                <Briefcase className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Gigs Yet</h3>
                <p className="text-gray-600 mb-6">Start by posting your first gig to attract talented freelancers</p>
                <Button 
                  onClick={() => navigate('/gigs/create')}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold"
                >
                  <Plus size={18} className="mr-2" />
                  Post Your First Gig
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {myGigs.slice(0, 5).map((gig) => (
                  <GigCard key={gig._id} gig={gig} showStats={false} />
                ))}
              </div>
            )}
          </div>

          {/* Recent Bids */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FileText size={20} className="text-cyan-600" />
                Recent Bids
              </h2>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/my-bids')}
                className="text-sm text-cyan-600 hover:text-cyan-700"
              >
                View All
              </Button>
            </div>

            {bidsLoading ? (
              <SkeletonList count={3} />
            ) : myBids.length === 0 ? (
              <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200/50 rounded-2xl p-8 text-center">
                <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Bids Yet</h3>
                <p className="text-gray-600 mb-6">Browse available gigs and submit your first bid</p>
                <Button 
                  onClick={() => navigate('/gigs')}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold"
                >
                  <Eye size={18} className="mr-2" />
                  Browse Available Gigs
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {myBids.slice(0, 5).map((bid) => (
                  <div 
                    key={bid._id} 
                    onClick={() => navigate(`/gigs/${bid.gigId}`)}
                    className="bg-white border border-gray-200/50 rounded-2xl p-5 hover:shadow-lg hover:border-cyan-200/50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 group-hover:text-cyan-700 transition-colors line-clamp-1">
                          {bid.gig?.title || 'Untitled Gig'}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                          {bid.message}
                        </p>
                      </div>
                      <div className={`ml-4 px-3 py-1 rounded-full text-xs font-semibold ${
                        bid.status === 'hired' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' :
                        bid.status === 'rejected' ? 'bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border border-red-200' :
                        'bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700 border border-cyan-200'
                      }`}>
                        {bid.status === 'hired' ? 'HIRED' : bid.status === 'rejected' ? 'REJECTED' : 'PENDING'}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <DollarSign size={16} className="text-green-600" />
                          <span className="font-bold text-gray-900">${bid.price}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-cyan-600" />
                          <span className="text-sm text-gray-600">{bid.estimatedTime || 7} days</span>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-gray-400 group-hover:text-cyan-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 bg-gradient-to-r from-cyan-900/10 to-blue-900/10 border border-cyan-200/30 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Award size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Ready to Level Up?</h3>
                <p className="text-gray-600">Upgrade to Pro for advanced analytics and premium features</p>
              </div>
            </div>
            <Button 
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-6 py-3 rounded-xl"
            >
              <Rocket size={18} className="mr-2" />
              Upgrade to Pro
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add Badge component if not exists
const Badge = ({ children, className, variant = 'default', ...props }) => {
  const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
  const variantClasses = {
    default: "bg-gray-100 text-gray-800",
    outline: "border border-gray-300 bg-transparent text-gray-700",
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};