import React from 'react';
import { Button } from 'reactstrap';
import './actionButton.scss';

const ActionButton = ({label, onClick, color}) => {
   return (
      <Button 
         className="w-100 mt-1" 
         size="sm" 
         onClick={onClick} 
         color={color}>{label}
      </Button>
   );
};

export default ActionButton
