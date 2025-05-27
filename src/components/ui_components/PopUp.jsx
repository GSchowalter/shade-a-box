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
        {<Button className="h1" variant="contained"> {title} </Button>}
        modal nested>
        {
          close => (
            <div className='flex flex-col bg-black p-4 justify-evenly'>
              <div className='content'>
                {title}
              </div>
              {children}
              <div className="pt-3">
                <Button  onClick=
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