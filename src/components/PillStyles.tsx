import React from 'react';
import { Badge } from 'react-bootstrap';

interface PillProps {
  children: string;
  level: number;
}

const Pill: React.FC<PillProps> = ({ children, level }) => {
  const getColorForLevel = (level: number): string => {
    if (level >= 4) return '#115826'; // Mais escuro
    if (level === 3) return '#54aa6d';
    if (level === 2) return '#59c479';
    return '#91d8a6'; // Mais claro
  };

  return (
    <Badge
      style={{
        backgroundColor: getColorForLevel(level),
        color: 'white',
        padding: '5px 10px',
        borderRadius: '10px',
        marginRight: '5px',
        marginBottom: '5px',
      }}
    >
      {children}
    </Badge>
  );
};

export default Pill;
