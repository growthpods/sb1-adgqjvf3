import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

interface Expert {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  status: string;
  created_at: string;
  linkedin_url?: string;
}

interface DashboardStats {
  totalExperts: number;
  pendingApprovals: number;
  totalUsers: number;
  totalBookings: number;
}

const SaaSAdminDashboard: React.FC = () => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalExperts: 0,
    pendingApprovals: 0,
    totalUsers: 0,
    totalBookings: 0
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');

  const { user, signOut } = useAuth();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch experts
      const { data: expertsData, error: expertsError } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'expert')
        .order('created_at', { ascending: false });

      if (expertsError) throw expertsError;

      // Fetch stats
      const { data: allUsers, error: usersError } = await supabase
        .from('users')
        .select('role, status');

      if (usersError) throw usersError;

      const totalExperts = allUsers.filter(u => u.role === 'expert').length;
      const pendingApprovals = allUsers.filter(u => u.role === 'expert' && u.status === 'pending').length;
      const totalUsers = allUsers.filter(u => u.role === 'user').length;

      setExperts(expertsData || []);
      setStats({
        totalExperts,
        pendingApprovals,
        totalUsers,
        totalBookings: 0 // Will be implemented when bookings table is created
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveExpert = async (expertId: string) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ 
          status: 'approved',
          updated_at: new Date().toISOString()
        })
        .eq('id', expertId);

      if (error) throw error;

      // Refresh data
      fetchDashboardData();
    } catch (error) {
      console.error('Error approving expert:', error);
    }
  };

  const handleRejectExpert = async (expertId: string) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ 
          status: 'rejected',
          updated_at: new Date().toISOString()
        })
        .eq('id', expertId);

      if (error) throw error;

      // Refresh data
      fetchDashboardData();
    } catch (error) {
      console.error('Error rejecting expert:', error);
    }
  };

  const filteredExperts = experts.filter(expert => {
    if (activeTab === 'pending') return expert.status === 'pending';
    if (activeTab === 'approved') return expert.status === 'approved';
    if (activeTab === 'rejected') return expert.status === 'rejected';
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">SaaS Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.first_name || 'Admin'}</p>
            </div>
            <button
              onClick={signOut}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Experts</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.totalExperts}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pending Approvals</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.pendingApprovals}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.totalUsers}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Bookings</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.totalBookings}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expert Management */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Expert Management</h3>
            
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-4">
              <nav className="-mb-px flex space-x-8">
                {[
                  { key: 'pending', label: 'Pending Approval', count: stats.pendingApprovals },
                  { key: 'approved', label: 'Approved', count: experts.filter(e => e.status === 'approved').length },
                  { key: 'rejected', label: 'Rejected', count: experts.filter(e => e.status === 'rejected').length },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`${
                      activeTab === tab.key
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </nav>
            </div>

            {/* Expert List */}
            <div className="space-y-4">
              {filteredExperts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No experts found in this category.</p>
              ) : (
                filteredExperts.map((expert) => (
                  <div key={expert.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-gray-900">
                          {expert.first_name} {expert.last_name}
                        </h4>
                        <p className="text-sm text-gray-600">{expert.email}</p>
                        {expert.linkedin_url && (
                          <a
                            href={expert.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            View LinkedIn Profile →
                          </a>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          Applied: {new Date(expert.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          expert.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          expert.status === 'approved' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {expert.status.charAt(0).toUpperCase() + expert.status.slice(1)}
                        </span>
                        
                        {expert.status === 'pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleApproveExpert(expert.id)}
                              className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectExpert(expert.id)}
                              className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaaSAdminDashboard;
