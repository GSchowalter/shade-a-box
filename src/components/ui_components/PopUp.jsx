import { Button } from '@mui/material';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';

export default function PopUp({ title,children }) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopUp = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Popup trigger=
        {<Button variant="contained"> {title} </Button>}
        position={['top center', 'bottom center']}>
        {
          close => (
            <div className='flex flex-col bg-black p-4 justify-evenly'>
              <div className='h1 text-white text-center mb-4'>
                {title}
              </div>
              <div className="border-t border-white p-1"></div>
              {children}
              <div className="pt-3">
                <Button  onClick=
                  {() => close()} variant="contained">
                  Close
                </Button>
              </div>
            </div>
          )
        }
      </Popup>
    </div>
  );
}