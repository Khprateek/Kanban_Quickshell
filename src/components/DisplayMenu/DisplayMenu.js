import React from 'react';
import './DisplayMenu.css';

const DisplayMenu = ({ grouping, sorting, onGroupingChange, onSortingChange, handleDropdownClick }) => {
  return (
    <div className="dropdown-menu" onClick={handleDropdownClick}>
      <div className="menu-row">
        <span>Grouping</span>
        <select 
          value={grouping}
          onChange={(e) => onGroupingChange(e.target.value)}
        >
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <div className="menu-row">
        <span>Ordering</span>
        <select 
          value={sorting}
          onChange={(e) => onSortingChange(e.target.value)}
        >
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
};

export default DisplayMenu;