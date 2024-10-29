import React, { useState, useEffect } from 'react';
import './App.css';
import DisplayMenu from './components/DisplayMenu/DisplayMenu';
import KanbanColumn from './components/KanbanColumn/KanbanColumn';
import { PRIORITIES, STATUS_ICONS } from './components/constants';
import displayIcon from './assets/icons/Display.svg';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || 'status');
  const [sorting, setSorting] = useState(localStorage.getItem('sorting') || 'priority');
  const [showDisplayMenu, setShowDisplayMenu] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        setTickets(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleGroupingChange = (newGrouping) => {
    setGrouping(newGrouping);
    localStorage.setItem('grouping', newGrouping);
  };

  const handleSortingChange = (newSorting) => {
    setSorting(newSorting);
    localStorage.setItem('sorting', newSorting);
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation();
  };

  const normalizeStatus = (status) => {
    const statusMap = {
      'In Progress': 'In progress',
      'in-progress': 'In progress'
    };
    return statusMap[status] || status;
  };

  const groupTickets = () => {
    const grouped = {};
    tickets.forEach(ticket => {
      let groupKey;
      
      switch(grouping) {
        case 'status':
          groupKey = ticket.status;
          break;
        case 'user':
          const user = users.find(u => u.id === ticket.userId);
          groupKey = user ? user.name : 'Unassigned';
          break;
        case 'priority':
          groupKey = PRIORITIES[ticket.priority].label;
          break;
        default:
          groupKey = 'Other';
      }

      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }
      grouped[groupKey].push(ticket);
    });
    
    // Sort tickets within each group
    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => {
        if (sorting === 'priority') {
          return b.priority - a.priority;
        }
        return a.title.localeCompare(b.title);
      });
    });
    
    return grouped;
  };

  return (
    <div className="kanban-board">
      <div className="navbar">
        <div className="display-button" onClick={() => setShowDisplayMenu(!showDisplayMenu)}>
          <div className="button-content">
            <img 
              src={displayIcon} 
              alt="display"
              className="display-icon"
            />
            Display
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          {showDisplayMenu && (
            <DisplayMenu 
              grouping={grouping}
              sorting={sorting}
              onGroupingChange={handleGroupingChange}
              onSortingChange={handleSortingChange}
              handleDropdownClick={handleDropdownClick}
            />
          )}
        </div>
      </div>

      <div className="board-content">
        {Object.entries(groupTickets()).map(([group, tickets]) => (
          <KanbanColumn
            key={group}
            group={group}
            tickets={tickets}
            grouping={grouping}
            users={users}
          />
        ))}
      </div>
    </div>
  );
};

export default App;