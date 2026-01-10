import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Button from '../components/Button';

interface User {
  _id: string;
  name: string;
  email: string;
  gender: string;
  approvalStatus: string;
  createdAt: string;
}

export default function Admin() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('pending');

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  const fetchUsers = async () => {
    try {
      // In a real app, you'd get the admin token from auth context
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('Admin authentication required');
        setLoading(false);
        return;
      }

      const response = await fetch(`/api/admin/users?approvalStatus=${filter}&limit=50`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data.users);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (userId: string, action: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/users/${userId}/${action}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Action failed');
      }

      // Refresh the user list
      fetchUsers();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main style={{ padding: '4rem 0', textAlign: 'center' }}>
          <p>Loading...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - Elite Escort Amsterdam</title>
        <meta name="description" content="Admin dashboard for managing users and approvals." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main>
        <section className="admin-section">
          <div className="container">
            <h1>Admin Dashboard</h1>

            {error && <div className="error-message" style={{ color: 'red', marginBottom: '2rem' }}>{error}</div>}

            <div className="filter-controls">
              <label>
                Filter by status:
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </label>
            </div>

            <div className="users-grid">
              {users.map((user) => (
                <Card key={user._id} className="user-card">
                  <div className="user-info">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <p>Gender: {user.gender}</p>
                    <p>Status: <span className={`status-${user.approvalStatus}`}>{user.approvalStatus}</span></p>
                    <p>Registered: {new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="user-actions">
                    {user.approvalStatus === 'pending' && (
                      <>
                        <Button onClick={() => handleUserAction(user._id, 'approve')} variant="primary">
                          Approve
                        </Button>
                        <Button onClick={() => handleUserAction(user._id, 'reject')} variant="secondary">
                          Reject
                        </Button>
                      </>
                    )}
                    {user.approvalStatus === 'approved' && (
                      <Button onClick={() => handleUserAction(user._id, 'reject')} variant="secondary">
                        Reject
                      </Button>
                    )}
                    {user.approvalStatus === 'rejected' && (
                      <Button onClick={() => handleUserAction(user._id, 'approve')} variant="primary">
                        Approve
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .admin-section {
          padding: 4rem 0;
        }

        .admin-section h1 {
          text-align: center;
          margin-bottom: 2rem;
          color: #dc3545;
        }

        .filter-controls {
          margin-bottom: 2rem;
          text-align: center;
        }

        .filter-controls select {
          margin-left: 0.5rem;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .users-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .user-card {
          padding: 1.5rem;
        }

        .user-info h3 {
          margin-bottom: 0.5rem;
          color: #dc3545;
        }

        .user-info p {
          margin: 0.25rem 0;
          font-size: 0.9rem;
        }

        .status-pending { color: #ffc107; font-weight: bold; }
        .status-approved { color: #28a745; font-weight: bold; }
        .status-rejected { color: #dc3545; font-weight: bold; }

        .user-actions {
          margin-top: 1rem;
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .users-grid {
            grid-template-columns: 1fr;
          }

          .user-actions {
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}