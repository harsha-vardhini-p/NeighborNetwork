/**
 * NeighborNet Demo Database
 * Browser-based persistence layer using localStorage for hackathon demo.
 * Provides session management, sample data, and state persistence across pages.
 */

const NeighborNetDB = (function () {
    const STORAGE_KEY = 'neighbornet-state';

    // Default seed data for demo
    const DEFAULT_STATE = {
        currentUser: null,
        isLoggedIn: false,

        // Sample residents for demo
        residents: [
            { id: 1, flat: 'A-101', name: 'Arun Mehta', phone: '+91 98765*****', verificationStatus: 'approved' },
            { id: 2, flat: 'A-102', name: 'Amit Patel', phone: '+91 70***87654', verificationStatus: 'pending' },
            { id: 3, flat: 'A-304', name: 'Priya Singh', phone: '+91 98765*****', verificationStatus: 'approved' },
            { id: 4, flat: 'A-305', name: 'Rajesh Kumar', phone: '+91 98***43210', verificationStatus: 'pending' },
            { id: 5, flat: 'B-201', name: 'Sunita Verma', phone: '+91 88***12345', verificationStatus: 'approved' },
            { id: 6, flat: 'B-202', name: 'Vikram Sharma', phone: '+91 99887*****', verificationStatus: 'approved' },
            { id: 7, flat: 'B-203', name: 'Priya Sharma', phone: '+91 87***65432', verificationStatus: 'pending' },
            { id: 8, flat: 'C-101', name: 'Neha Gupta', phone: '+91 77889*****', verificationStatus: 'approved' },
            { id: 9, flat: 'C-104', name: '—', phone: '+91 99***21098', verificationStatus: 'pending' }
        ],

        // Sample posts for community feed
        posts: [
            {
                id: 1,
                category: 'notices',
                title: 'Water Supply Maintenance on Saturday',
                description: 'Municipal water supply will be interrupted from 9 AM to 2 PM this Saturday for pipeline maintenance. Please store adequate water.',
                author: 'Secretary Office',
                authorFlat: 'S',
                time: '2 hours ago',
                likes: 12,
                comments: 3
            },
            {
                id: 2,
                category: 'help',
                title: 'Looking for a reliable electrician',
                description: 'Can anyone recommend a good electrician? Need to fix some wiring issues in the kitchen. Preferably someone who has worked in our society before.',
                author: 'Flat B-202',
                authorFlat: 'B2',
                time: '5 hours ago',
                likes: 4,
                comments: 7
            },
            {
                id: 3,
                category: 'lost',
                title: 'Found: Set of keys near parking area',
                description: 'Found a set of 4 keys with a blue keychain near the Block C parking area yesterday evening. Please contact if these belong to you.',
                author: 'Flat C-101',
                authorFlat: 'C1',
                time: 'Yesterday',
                likes: 8,
                comments: 2
            },
            {
                id: 4,
                category: 'events',
                title: 'Republic Day Celebration - Jan 26th',
                description: 'Join us for the Republic Day flag hoisting ceremony at 8 AM in the main garden area. Followed by cultural programs and breakfast for all residents.',
                author: 'Events Committee',
                authorFlat: 'E',
                time: '2 days ago',
                likes: 24,
                comments: 15
            },
            {
                id: 5,
                category: 'notices',
                title: 'Monthly Maintenance Due - February',
                description: 'Reminder: February maintenance charges are due by 5th. Please pay via UPI or deposit in the society account. Late fees apply after the due date.',
                author: 'Treasurer Office',
                authorFlat: 'T',
                time: '3 days ago',
                likes: 5,
                comments: 1
            }
        ],

        // Sample bookings
        bookings: [
            { id: 1, facility: 'Badminton Court', date: '2026-01-30', time: '6:00 PM - 7:00 PM', flat: 'A-304', status: 'confirmed' },
            { id: 2, facility: 'Badminton Court', date: '2026-01-30', time: '7:00 PM - 8:00 PM', flat: 'B-201', status: 'confirmed' },
            { id: 3, facility: 'Clubhouse', date: '2026-02-01', time: '5:00 PM - 9:00 PM', flat: 'C-101', status: 'pending' }
        ],

        // Sample alerts
        alerts: [
            { id: 1, type: 'medical', location: 'Flat B-201', status: 'resolved', time: '2 days ago' },
            { id: 2, type: 'fire', location: 'Block C Parking', status: 'resolved', time: '1 week ago' }
        ],

        // View mode preference (standard / simple)
        viewMode: 'standard',

        // Society info
        society: {
            name: 'Sunrise Apartments',
            code: 'SUN2024',
            blocks: ['A', 'B', 'C'],
            totalFlats: 156
        }
    };

    // Private: Get current state from localStorage
    function getState() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (e) {
            console.error('NeighborNetDB: Error reading state', e);
        }
        return null;
    }

    // Private: Save state to localStorage
    function saveState(state) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.error('NeighborNetDB: Error saving state', e);
        }
    }

    // Private: Get or initialize state
    function getOrInitState() {
        let state = getState();
        if (!state) {
            state = JSON.parse(JSON.stringify(DEFAULT_STATE)); // Deep clone
            saveState(state);
        }
        return state;
    }

    // Public API
    return {
        /**
         * Initialize the database. Call on page load.
         * Returns current state.
         */
        init: function () {
            return getOrInitState();
        },

        /**
         * Login as resident or admin
         * @param {string} role - 'resident' or 'admin'
         * @param {object} userData - User details
         */
        login: function (role, userData) {
            const state = getOrInitState();
            state.currentUser = {
                role: role,
                phone: userData.phone || '',
                flat: userData.flat || '',
                name: userData.name || '',
                adminId: userData.adminId || '',
                verificationStatus: userData.verificationStatus || 'approved'
            };
            state.isLoggedIn = true;
            saveState(state);
            return state.currentUser;
        },

        /**
         * Logout current user
         * @param {string} redirectUrl - Optional URL to redirect to
         */
        logout: function (redirectUrl) {
            const state = getOrInitState();
            state.currentUser = null;
            state.isLoggedIn = false;
            saveState(state);
            if (redirectUrl) {
                window.location.href = redirectUrl;
            }
        },

        /**
         * Get current logged-in user
         * @returns {object|null} Current user or null
         */
        getCurrentUser: function () {
            const state = getOrInitState();
            return state.currentUser;
        },

        /**
         * Check if user is logged in
         * @returns {boolean}
         */
        isLoggedIn: function () {
            const state = getOrInitState();
            return state.isLoggedIn && state.currentUser !== null;
        },

        /**
         * Check if current user is admin
         * @returns {boolean}
         */
        isAdmin: function () {
            const state = getOrInitState();
            return state.isLoggedIn && state.currentUser?.role === 'admin';
        },

        /**
         * Check if current user is a resident
         * @returns {boolean}
         */
        isResident: function () {
            const state = getOrInitState();
            return state.isLoggedIn && state.currentUser?.role === 'resident';
        },

        /**
         * Get user's verification status
         * @returns {string} 'pending', 'approved', or 'rejected'
         */
        getVerificationStatus: function () {
            const state = getOrInitState();
            return state.currentUser?.verificationStatus || 'pending';
        },

        /**
         * Get view mode preference
         * @returns {string} 'standard' or 'simple'
         */
        getViewMode: function () {
            const state = getOrInitState();
            return state.viewMode || 'standard';
        },

        /**
         * Set view mode preference
         * @param {string} mode - 'standard' or 'simple'
         */
        setViewMode: function (mode) {
            const state = getOrInitState();
            state.viewMode = mode;
            saveState(state);
        },

        /**
         * Get all residents
         * @returns {array}
         */
        getResidents: function () {
            const state = getOrInitState();
            return state.residents || [];
        },

        /**
         * Get pending verification requests
         * @returns {array}
         */
        getPendingVerifications: function () {
            const state = getOrInitState();
            return (state.residents || []).filter(r => r.verificationStatus === 'pending');
        },

        /**
         * Get approved residents
         * @returns {array}
         */
        getApprovedResidents: function () {
            const state = getOrInitState();
            return (state.residents || []).filter(r => r.verificationStatus === 'approved');
        },

        /**
         * Approve a resident verification request
         * @param {number} residentId - Resident ID
         * @returns {boolean} Success
         */
        approveResident: function (residentId) {
            const state = getOrInitState();
            const resident = state.residents.find(r => r.id === residentId);
            if (resident) {
                resident.verificationStatus = 'approved';
                saveState(state);
                return true;
            }
            return false;
        },

        /**
         * Reject a resident verification request
         * @param {number} residentId - Resident ID
         * @returns {boolean} Success
         */
        rejectResident: function (residentId) {
            const state = getOrInitState();
            const index = state.residents.findIndex(r => r.id === residentId);
            if (index !== -1) {
                state.residents.splice(index, 1);
                saveState(state);
                return true;
            }
            return false;
        },

        /**
         * Get community posts
         * @param {string} category - Optional category filter
         * @returns {array}
         */
        getPosts: function (category) {
            const state = getOrInitState();
            if (category && category !== 'all') {
                return (state.posts || []).filter(p => p.category === category);
            }
            return state.posts || [];
        },

        /**
         * Get bookings
         * @returns {array}
         */
        getBookings: function () {
            const state = getOrInitState();
            return state.bookings || [];
        },

        /**
         * Get alerts
         * @returns {array}
         */
        getAlerts: function () {
            const state = getOrInitState();
            return state.alerts || [];
        },

        /**
         * Get society info
         * @returns {object}
         */
        getSociety: function () {
            const state = getOrInitState();
            return state.society || DEFAULT_STATE.society;
        },

        /**
         * Reset database to default state (for demo reset)
         */
        reset: function () {
            const freshState = JSON.parse(JSON.stringify(DEFAULT_STATE));
            saveState(freshState);
            return freshState;
        },

        /**
         * Require authentication - redirect if not logged in
         * @param {string} role - Optional required role ('resident' or 'admin')
         * @param {string} redirectUrl - URL to redirect to if not authenticated
         */
        requireAuth: function (role, redirectUrl) {
            const state = getOrInitState();

            if (!state.isLoggedIn || !state.currentUser) {
                window.location.href = redirectUrl || 'index.html';
                return false;
            }

            if (role && state.currentUser.role !== role) {
                if (role === 'admin') {
                    window.location.href = 'admin-login.html';
                } else {
                    window.location.href = 'index.html';
                }
                return false;
            }

            return true;
        },

        /**
         * Check verification and redirect pending users
         * @returns {boolean} True if approved, false if redirected
         */
        checkVerification: function () {
            const state = getOrInitState();

            if (state.currentUser?.role === 'resident' &&
                state.currentUser?.verificationStatus === 'pending') {
                window.location.href = 'pending-verification.html';
                return false;
            }

            return true;
        }
    };
})();

// Auto-initialize on script load
NeighborNetDB.init();
