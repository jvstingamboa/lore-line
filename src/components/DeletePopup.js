import React, { useState } from 'react';

function DeleteConfirmationPopup() {
  
  return (
    <div>
      <button>Delete</button>
      (
        <div className="popup">
          <div className="popup-content">
            <p>Are you sure you want to delete?</p>
            <button >Yes</button>
            <button>No</button>
          </div>
        </div>
      )
    </div>
  );
}

export default DeleteConfirmationPopup;
