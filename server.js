const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let users = [
  { id: 1, username: 'admin', password: 'password123', role: 'District Magistrate' },
  { id: 2, username: 'collector', password: 'password123', role: 'Collectorate Admin' }
];

let grievances = [
  {
    id: "GRV-1001",
    citizenName: "Ramesh Sharma",
    mobileNumber: "9876543210",
    village: "Ashti",
    department: "Rural Development",
    priority: "High",
    description: "Handpump water motor has been non-functional for past 3 weeks.",
    status: "In Progress",
    createdAt: "2026-09-10"
  },
  {
    id: "GRV-1002",
    citizenName: "Sunita Deshmukh",
    mobileNumber: "9823456781",
    village: "Sawangi",
    department: "Health",
    priority: "Urgent",
    description: "Primary Health Center medicine inventory shortage of maternal vitamins.",
    status: "Pending",
    createdAt: "2026-09-12"
  },
  {
    id: "GRV-1003",
    citizenName: "Anil Wankhede",
    mobileNumber: "9730123456",
    village: "Pimpalgaon",
    department: "Agriculture",
    priority: "Medium",
    description: "Soil Health Card soil testing report delayed by over 45 days.",
    status: "Resolved",
    createdAt: "2026-09-05"
  },
  {
    id: "GRV-1004",
    citizenName: "Pooja Patil",
    mobileNumber: "9921098765",
    village: "Ganeshpur",
    department: "Education",
    priority: "Low",
    description: "Request for installation of smart display projector in middle school.",
    status: "In Progress",
    createdAt: "2026-09-14"
  },
  {
    id: "GRV-1005",
    citizenName: "Gajanan Meshram",
    mobileNumber: "9850112233",
    village: "Rampur",
    department: "Women & Child Development",
    priority: "High",
    description: "Anganwadi center supplementary nutrition ration quota not delivered.",
    status: "Pending",
    createdAt: "2026-09-15"
  }
];

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    return res.json({ success: true, message: 'Authentication successful', token: 'jwt-mock-token-xyz', user: { username: user.username, role: user.role } });
  }
  return res.status(401).json({ success: false, message: 'Invalid credentials. Use admin / password123' });
});

app.get('/api/stats', (req, res) => {
  const total = grievances.length;
  const pending = grievances.filter(g => g.status === 'Pending').length;
  const inProgress = grievances.filter(g => g.status === 'In Progress').length;
  const resolved = grievances.filter(g => g.status === 'Resolved').length;

  const deptCounts = {};
  grievances.forEach(g => {
    deptCounts[g.department] = (deptCounts[g.department] || 0) + 1;
  });

  res.json({ total, pending, inProgress, resolved, deptCounts });
});

app.get('/api/grievances', (req, res) => {
  const { search, department, status } = req.query;
  let results = [...grievances];

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(g => 
      g.id.toLowerCase().includes(q) ||
      g.citizenName.toLowerCase().includes(q) ||
      g.mobileNumber.includes(q) ||
      g.village.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q)
    );
  }

  if (department && department !== 'All') {
    results = results.filter(g => g.department === department);
  }

  if (status && status !== 'All') {
    results = results.filter(g => g.status === status);
  }

  res.json(results);
});

app.post('/api/grievances', (req, res) => {
  const { citizenName, mobileNumber, village, department, priority, description } = req.body;
  if (!citizenName || !mobileNumber || !village || !department || !description) {
    return res.status(400).json({ success: false, message: 'All required fields must be filled.' });
  }

  const newId = `GRV-${1000 + grievances.length + 1}`;
  const newGrievance = {
    id: newId,
    citizenName,
    mobileNumber,
    village,
    department,
    priority: priority || 'Medium',
    description,
    status: 'Pending',
    createdAt: new Date().toISOString().split('T')[0]
  };

  grievances.unshift(newGrievance);
  res.status(201).json({ success: true, message: 'Grievance submitted successfully', data: newGrievance });
});

app.patch('/api/grievances/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['Pending', 'In Progress', 'Resolved'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status value' });
  }

  const item = grievances.find(g => g.id === id);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Grievance record not found' });
  }

  item.status = status;
  res.json({ success: true, message: `Status updated to ${status}`, data: item });
});

app.listen(PORT, () => {
  console.log(`District Grievance Monitoring Server running at http://localhost:${PORT}`);
});
