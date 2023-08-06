import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const Agreement = ({ showAgreement, handleCloseAgreement }) => {
    
  return (
    <>
      <Modal
        show={showAgreement}
        onHide={handleCloseAgreement}
        // id="info-modal"
        className='blur fade'
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div>
                <h1>
                    Terms and Conditions
                </h1>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>
                Hello there! Thank you for checking out how the booking API of this e-Commerce app works. 😊
            </p>
            <p>
                Please take note that this is just a mock booking, and no real transactions will be charged from any user.
            </p>
            <p>
                Just proceed to "Pay Now" and see how it works. Rest assured that your finances are safe. 👌
            </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAgreement}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Agreement;