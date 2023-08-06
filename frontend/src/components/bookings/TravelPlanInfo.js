import { Button, Table } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const TravelPlanInfo = ({ showTravelPlanInfo, handleCloseTravelPlanInfo }) => {
    
  return (
      <Modal
        show={showTravelPlanInfo}
        onHide={handleCloseTravelPlanInfo}
        id="info-modal"
        className='blur fade'
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div>
                <h1>
                    Travel Plans
                </h1>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Features</th>
                    <th>with guests</th>
                    <th>with friends</th>
                    <th>solo</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Lower Price*</td>
                    <td><img src="/images/check.svg" alt="check" /></td>
                    <td><img src="/images/check.svg" alt="check" /></td>
                    <td><img src="/images/wrong.svg" alt="wrong" /></td>
                </tr>
                <tr>
                    <td>Mixed Group</td>
                    <td><img src="/images/check.svg" alt="check" /></td>
                    <td><img src="/images/wrong.svg" alt="wrong" /></td>
                    <td><img src="/images/wrong.svg" alt="wrong" /></td>
                </tr>
                <tr>
                    <td>Bring Friends</td>
                    <td><img src="/images/check.svg" alt="check" /></td>
                    <td><img src="/images/check.svg" alt="check" /></td>
                    <td><img src="/images/wrong.svg" alt="wrong" /></td>
                </tr>
                <tr>
                    <td>No min pax**</td>
                    <td><img src="/images/wrong.svg" alt="wrong" /></td>
                    <td><img src="/images/check.svg" alt="check" /></td>
                    <td><img src="/images/check.svg" alt="check" /></td>
                </tr>
                <tr>
                    <td>Up to 30 pax</td>
                    <td><img src="/images/wrong.svg" alt="wrong" /></td>
                    <td><img src="/images/check.svg" alt="check" /></td>
                    <td><img src="/images/wrong.svg" alt="wrong" /></td>
                </tr>
                <tr>
                    <td>Preset Dates</td>
                    <td><img src="/images/check.svg" alt="check" /></td>
                    <td><img src="/images/wrong.svg" alt="wrong" /></td>
                    <td><img src="/images/wrong.svg" alt="wrong" /></td>
                </tr>
                <tr>
                    <td>Custom Dates</td>
                    <td><img src="/images/wrong.svg" alt="wrong" /></td>
                    <td><img src="/images/check.svg" alt="check" /></td>
                    <td><img src="/images/check.svg" alt="check" /></td>
                </tr>
            </tbody>
            </Table>
            <p>
                *Get more discounts in 'with guests' and 'with friends' travel plans if you book more friends with the tour.
            </p>
            <p>
                **Travel schedule will be moved if does not reach at least 10pax 5 business days before the tour for 'with guests' travel plan only.
            </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTravelPlanInfo}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default TravelPlanInfo;