
import React from 'react';
import { Link } from 'react-router-dom';
import './CertificationsListPage.css';

const certifications = [
  { name: 'Sales Force', path: '/certifications/sales-force' },
  { name: 'CCNA', path: '/certifications/ccna' },
  { name: 'Palo Alto', path: '/certifications/palo-alto' },
  { name: 'Vmware', path: '/certifications/vmware' },
  { name: 'CBAP', path: '/certifications/cbap' },
  { name: 'CAMS Training & Certification', path: '/certifications/cams-training' },
  { name: 'Certified Internal Auditor (CIA)', path: '/certifications/cia-training' },
  { name: 'Certified Associate Project Management (CAPM)', path: '/certifications/capm-training' },
  { name: 'Project Management Professional (PMP)', path: '/certifications/pmp' },
];

function CertificationsListPage() {
  return (
    <div className="cert-list-container">
      <h1>Available Certifications</h1>
      <ul>
        {certifications.map((cert, index) => (
          <li key={index}>
            <Link to={cert.path}>{cert.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CertificationsListPage;
