import { Button } from '@mui/material';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';

export default function PopUp({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopUp = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Popup trigger=
        {<Button variant="contained"> Advanced Settings </Button>}
        modal nested>
        {
          close => (
            <div className='flex flex-col bg-black p-4'>
              <div className='content'>
                Advanced Settings
              </div>
              {children}
              <div>
                <Button onClick=
                  {() => close()} variant="contained">
                  Close modal
                </Button>
              </div>
            </div>
          )
        }
      </Popup>
    </div>
  );
}