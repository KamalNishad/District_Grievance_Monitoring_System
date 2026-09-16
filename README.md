# District Grievance Monitoring System (DGMS)
### Built for District Collectorate & Administration Performance Monitoring
**Submitted by**: Kamal Kewat | EY Assessment Candidate

---

## 1. Overview
The District Grievance Monitoring System is a comprehensive web portal that allows district administrators to record, route, investigate, and resolve citizen grievances across departments (Agriculture, Education, Health, Rural Development, Women & Child Development).

## 2. Implemented Pages & Features
* **Page 1: Login**: Administrative authentication with role-based access control.
* **Page 2: Executive Dashboard**: Real-time KPI cards (`Total`, `Pending`, `In Progress`, `Resolved`) + Chart.js Donut and Bar Visuals for department-wise distribution.
* **Page 3: Grievance Entry Form**: Captures Citizen Name, Mobile, Village, Department, Priority, and Description.
* **Page 4: Grievance List**: Search across records + live filters by Department and Resolution Status.
* **Page 5: Status Update Modal**: Enables changing status between `Pending`, `In Progress`, and `Resolved` with live KPI re-calculation.
* **Bonus Features**:
  * One-click **Export to Excel** (.xlsx) powered by SheetJS.
  * Fully responsive mobile & desktop interface.
  * Clean RESTful backend APIs.

## 3. Setup & Execution Instructions
1. Ensure Node.js (v16+) is installed.
2. Open terminal in project folder:
   ```bash
   cd grievance_app
   npm install
   npm start
   ```
3. Open browser at: `http://localhost:3000`
4. Default Admin Credentials:
   * **Username**: `admin`
   * **Password**: `password123`
