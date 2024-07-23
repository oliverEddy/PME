import React from 'react';

const DeleteConfirmation = ({ handleDeletePassword, setShowDeleteConfirmation }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-background-800 p-6 rounded-md">
        <p className="mb-4">Are you sure you want to delete this password?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleDeletePassword}
            className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Yes
          </button>
          <button
            onClick={() => setShowDeleteConfirmation(false)}
            className="py-2 px-4 bg-secondary text-white rounded-md hover:bg-secondary-dark"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
