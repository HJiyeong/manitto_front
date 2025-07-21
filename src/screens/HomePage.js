import React from 'react';
import Layout1 from '../components/Layout1'
import Getmanitto from '../assets/images/get_manitto.png'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
const navigate = useNavigate();
  return (
    <Layout1 roomName="몰입캠프1">
        <div style={{ textAlign: 'center' }}>
        <h1>나의 마니또는?</h1>
        <div
        style={{
            backgroundColor: 'white',        
            padding: '20px',                 
            borderRadius: '50px',            
            display: 'inline-block',         
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',  
            margin: '20px 0',
        }}
        >
        <button
        onClick={() => navigate('/main')}
        style={{
            background: 'none',
            border: 'none',
            padding: 0,
            margin: 0,
            cursor: 'pointer',
            display: 'inline-block',
            transform: 'scale(1)',
            transition: 'transform 0.1s ease',
        }}
        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
        <img
            src={Getmanitto}
            style={{
            width: '100%',
            maxWidth: '500px',
            borderRadius: '16px',
            display: 'block',
            }}
        />
        </button>

        </div>
      </div>
    </Layout1>
  );
};

export default HomePage;
