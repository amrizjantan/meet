import React, { Component } from 'react';
import Event from './Event';
import { Row, Col, Container } from 'react-bootstrap';
import { WarningAlert } from './Alert';


class EventList extends Component {
  render() {const { events } = this.props;
  return (
    <Container className="eventlist-container">
      <Row className="d-flex justify-content-center event-list">
        {!navigator.onLine ? (
          <WarningAlert text="You are offline, the events are loaded from the Cache!" />
        ) : (
          ''
        )}
        <Col md={10} sm={12}>
          <ul className="EventList row">
            {events.map(event => (
              <li
                key={event.id}
              >
                <Event event={event} />
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
}
}

export default EventList;