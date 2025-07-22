import React from 'react';
import Layout1 from '../components/Layout1';
import Getmanitto from '../assets/images/get_manitto.png';
import { useNavigate, useParams } from 'react-router-dom';
import { getGroupDetails } from '../hooks/useGroup';
import { useQuery } from '@tanstack/react-query';

const HomePage = () => {
  const navigate = useNavigate();
  const { groupCode } = useParams();

  const { data: groupDetail, isLoading: isGroupLoading } = useQuery({
    queryKey: ['groupDetail'],
    queryFn: () => getGroupDetails(groupCode),
    enabled: !!groupCode, // groupCode가 있을 때만 실행
  });

  const roomName = groupDetail?.name || '';
  const roomDescription = groupDetail?.description || '';

  return (
    <Layout1 roomName={roomName} roomDescription={roomDescription}>
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
            onClick={() => navigate(`/main/${groupCode}`)}
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
