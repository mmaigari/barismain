"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  getApplications, 
  updateApplication, 
  ApplicationData,
  applicationUtils
} from '@/services/applicationService';
import { 
  Calendar, 
  Clock, 
  FileText, 
  Check, 
  X, 
  ChevronDown, 
  Clock4, 
  CheckCircle2, 
  XCircle, 
  ArrowLeftRight,
  Search,
  RefreshCw
} from 'lucide-react';

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<ApplicationData | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [assignedPosition, setAssignedPosition] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Fetch applications on load
  useEffect(() => {
    fetchApplications();
  }, []);
  
  // Fetch applications from database
  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let fetchedApplications;
      
      if (statusFilter === 'all') {
        fetchedApplications = await getApplications();
      } else {
        fetchedApplications = await getApplications({ 
          status: statusFilter as 'pending' | 'under-review' | 'accepted' | 'rejected' 
        });
      }
      
      setApplications(fetchedApplications);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setError('Failed to load applications. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle viewing an application
  const handleViewApplication = (application: ApplicationData) => {
    setSelectedApplication(application);
    setAdminNotes(application.adminNotes || '');
    setAssignedPosition(application.assignedPosition || '');
  };
  
  // Handle closing application detail view
  const handleCloseDetail = () => {
    setSelectedApplication(null);
  };
  
  // Handle status update
  const handleStatusUpdate = async (newStatus: 'pending' | 'under-review' | 'accepted' | 'rejected') => {
    if (!selectedApplication?.id) return;
    
    try {
      setIsUpdating(true);
      
      const updates = {
        status: newStatus,
        adminNotes,
        assignedPosition: newStatus === 'accepted' ? assignedPosition : '',
        reviewedBy: 'Admin User', // Replace with actual admin user name/ID
        reviewedAt: new Date()
      };
      
      await updateApplication(selectedApplication.id, updates);
      
      // Update local state
      setApplications(prevApplications => 
        prevApplications.map(app => 
          app.id === selectedApplication.id 
            ? { ...app, ...updates } 
            : app
        )
      );
      
      // Update selected application
      setSelectedApplication(prev => prev ? { ...prev, ...updates } : null);
      
      // Show notification
      alert(`Application status updated to ${newStatus}`);
      
    } catch (error) {
      console.error('Error updating application status:', error);
      alert('Failed to update application status');
    } finally {
      setIsUpdating(false);
    }
  };
  
  // Filter applications by search term
  const filteredApplications = applications.filter(app => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      app.fullName.toLowerCase().includes(searchLower) ||
      app.email.toLowerCase().includes(searchLower) ||
      app.phone.toLowerCase().includes(searchLower)
    );
  });
  
  // Get status badge component based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case 'under-review':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <ArrowLeftRight className="w-3 h-3 mr-1" />
            Under Review
          </span>
        );
      case 'accepted':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Check className="w-3 h-3 mr-1" />
            Accepted
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <X className="w-3 h-3 mr-1" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Volunteer Applications</h1>
              <p className="text-gray-600">Manage volunteer applications and approvals</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={fetchApplications}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Refresh
              </button>
              <Link 
                href="/admin"
                className="bg-gray-100 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-200"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm mb-6 p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row gap-4 md:items-center">
              <div>
                <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
                <select
                  id="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-[#09869a] focus:ring focus:ring-[#09869a] focus:ring-opacity-50"
                >
                  <option value="all">All Applications</option>
                  <option value="pending">Pending</option>
                  <option value="under-review">Under Review</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              
              <div className="w-full md:w-64">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="search"
                    className="focus:ring-[#09869a] focus:border-[#09869a] block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {filteredApplications.length} {filteredApplications.length === 1 ? 'application' : 'applications'} found
              </span>
            </div>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-50 p-4 rounded-md mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <XCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}
        
        {/* Applications List & Detail View */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Applications List */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#09869a] border-r-transparent mb-4"></div>
                  <p>Loading applications...</p>
                </div>
              ) : filteredApplications.length === 0 ? (
                <div className="p-8 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No applications found</h3>
                  <p className="text-gray-500">
                    {searchTerm 
                      ? "Try adjusting your search or filters"
                      : statusFilter !== 'all'
                        ? `No ${statusFilter} applications found`
                        : "No volunteer applications have been submitted yet"
                    }
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Applicant
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date Submitted
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Areas of Interest
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredApplications.map((application) => (
                        <tr 
                          key={application.id} 
                          className={`hover:bg-gray-50 ${selectedApplication?.id === application.id ? 'bg-blue-50' : ''}`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-0">
                                <div className="text-sm font-medium text-gray-900">{application.fullName}</div>
                                <div className="text-sm text-gray-500">{application.email}</div>
                                <div className="text-sm text-gray-500">{application.phone}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {application.submittedAt 
                                ? new Date(application.submittedAt).toLocaleDateString() 
                                : 'N/A'
                              }
                            </div>
                            <div className="text-sm text-gray-500">
                              {application.submittedAt 
                                ? new Date(application.submittedAt).toLocaleTimeString() 
                                : ''
                              }
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(application.status)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 max-w-xs truncate">
                              {applicationUtils.formatInterests(application.interests).join(', ')}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleViewApplication(application)}
                              className="text-[#09869a] hover:text-[#09869a]/80"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          
          {/* Application Detail */}
          <div className="w-full lg:w-1/3">
            {selectedApplication ? (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Application Details</h2>
                  <button
                    onClick={handleCloseDetail}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <div className="mb-2">Current Status: {getStatusBadge(selectedApplication.status)}</div>
                  
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-500">Change status to:</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleStatusUpdate('pending')}
                        disabled={selectedApplication.status === 'pending' || isUpdating}
                        className={`px-3 py-1.5 text-xs font-medium rounded ${
                          selectedApplication.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800 cursor-default'
                            : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        } disabled:opacity-50`}
                      >
                        <Clock4 className="w-3 h-3 inline-block mr-1" />
                        Pending
                      </button>
                      
                      <button
                        onClick={() => handleStatusUpdate('under-review')}
                        disabled={selectedApplication.status === 'under-review' || isUpdating}
                        className={`px-3 py-1.5 text-xs font-medium rounded ${
                          selectedApplication.status === 'under-review'
                            ? 'bg-blue-100 text-blue-800 cursor-default'
                            : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                        } disabled:opacity-50`}
                      >
                        <ArrowLeftRight className="w-3 h-3 inline-block mr-1" />
                        Under Review
                      </button>
                      
                      <button
                        onClick={() => handleStatusUpdate('accepted')}
                        disabled={selectedApplication.status === 'accepted' || isUpdating}
                        className={`px-3 py-1.5 text-xs font-medium rounded ${
                          selectedApplication.status === 'accepted'
                            ? 'bg-green-100 text-green-800 cursor-default'
                            : 'bg-green-100 text-green-800 hover:bg-green-200'
                        } disabled:opacity-50`}
                      >
                        <CheckCircle2 className="w-3 h-3 inline-block mr-1" />
                        Accept
                      </button>
                      
                      <button
                        onClick={() => handleStatusUpdate('rejected')}
                        disabled={selectedApplication.status === 'rejected' || isUpdating}
                        className={`px-3 py-1.5 text-xs font-medium rounded ${
                          selectedApplication.status === 'rejected'
                            ? 'bg-red-100 text-red-800 cursor-default'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        } disabled:opacity-50`}
                      >
                        <XCircle className="w-3 h-3 inline-block mr-1" />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Position Assignment */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Assigned Position
                    </label>
                    <input
                      type="text"
                      value={assignedPosition}
                      onChange={(e) => setAssignedPosition(e.target.value)}
                      placeholder="e.g., Community Outreach Volunteer"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#09869a] focus:border-[#09869a]"
                    />
                  </div>
                  
                  {/* Admin Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Admin Notes
                    </label>
                    <textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#09869a] focus:border-[#09869a]"
                      placeholder="Add notes about this application..."
                    ></textarea>
                  </div>
                  
                  {/* Applicant Information */}
                  <div className="mt-6 space-y-3">
                    <h3 className="font-medium text-gray-900 border-b pb-2">Applicant Information</h3>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-500">Full Name</div>
                      <div>{selectedApplication.fullName}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-500">Email Address</div>
                      <div>{selectedApplication.email}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-500">Phone Number</div>
                      <div>{selectedApplication.phone}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-500">Date of Birth</div>
                      <div>{selectedApplication.dateOfBirth}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-500">Address</div>
                      <div className="whitespace-pre-line">{selectedApplication.address}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-500">Education Level</div>
                      <div>{selectedApplication.educationLevel}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-500">Available Hours</div>
                      <div>{selectedApplication.availableHours}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-500">Areas of Interest</div>
                      <div>{applicationUtils.formatInterests(selectedApplication.interests).join(', ')}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-500">Experience & Skills</div>
                      <div className="whitespace-pre-line">{selectedApplication.experience || 'None provided'}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-500">Signature</div>
                      <div>{selectedApplication.signature}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-500">Application Date</div>
                      <div>
                        {selectedApplication.submittedAt
                          ? new Date(selectedApplication.submittedAt).toLocaleString()
                          : 'N/A'
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 border-dashed rounded-lg p-6 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No Application Selected</h3>
                <p className="text-gray-500">
                  Select an application from the list to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}