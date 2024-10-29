import React from 'react';
import './TicketCard.css';
import { PRIORITIES, STATUS_ICONS } from '../constants';

const TicketCard = ({ ticket, grouping, users }) => {
  console.log('Ticket Status:', {
    status: ticket.status,
    availableStatuses: Object.keys(STATUS_ICONS),
    matchFound: STATUS_ICONS[ticket.status] ? 'Yes' : 'No'
  });

  console.log('Status:', ticket.status);
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        {grouping !== 'user' && (
          <div className="avatar">
            {users.find(user => user.id === ticket.userId)?.name.charAt(0)}
          </div>
        )}
      </div>
      <div className="ticket-title">
        {grouping !== 'status' && (
          <>
            {console.log('Status icon lookup:', STATUS_ICONS[ticket.status])}
            <img 
              src={STATUS_ICONS[ticket.status]} 
              alt={ticket.status}
              className="status-icon"
            />
          </>
        )}
        {ticket.title}
      </div>
      <div className="ticket-footer">
        {grouping !== 'priority' && (
          <div className="priority-tag">
            <img 
              src={PRIORITIES[ticket.priority].icon} 
              alt={PRIORITIES[ticket.priority].label}
              className="priority-icon"
            />
          </div>
        )}
        {ticket.tag.map(tag => (
          <div key={tag} className="tag">
            <span>●</span> {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketCard;