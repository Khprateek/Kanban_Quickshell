import React from 'react';
import './KanbanColumn.css';
import TicketCard from '../TicketCard/TicketCard';
import { PRIORITIES, STATUS_ICONS } from '../constants';

const KanbanColumn = ({ group, tickets, grouping, users }) => {
  const getPriorityIcon = (group) => {
    const priorityKey = Object.keys(PRIORITIES).find(k => PRIORITIES[k].label === group);
    return priorityKey ? PRIORITIES[priorityKey].icon : '';
  };

  return (
    <div className="column">
      <div className="column-header">
        <div className="header-left">
          {grouping === 'status' && <img src={STATUS_ICONS[group]} alt={group} className="status-icon" />}
          {grouping === 'priority' && (
            <img 
              src={getPriorityIcon(group)} 
              alt={group}
              className="priority-icon"
            />
          )}
          {grouping === 'user' && <i className="fas fa-user"></i>}
          <span>{group}</span>
          <span className="ticket-count">{tickets.length}</span>
        </div>
        <div className="header-right">
          <i className="fas fa-plus"></i>
          <i className="fas fa-ellipsis-h"></i>
        </div>
      </div>
      
      <div className="tickets-container">
        {tickets.map(ticket => (
          <TicketCard 
            key={ticket.id}
            ticket={ticket}
            grouping={grouping}
            users={users}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;