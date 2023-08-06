import { Modal, Button, Accordion } from "react-bootstrap";
import ChangePassword from "./ChangePassword";

const UserSettings = ({ showSettings, handleCloseSettings }) => {
  return (
      <Modal
        show={showSettings}
        onHide={handleCloseSettings}
        id="user-settings-modal"
        className='blur fade'
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div>
                <h1>
                    Settings
                </h1>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
          <Accordion>
          <Accordion.Item eventKey="0">
                  <Accordion.Header>
                      <div>
                        <img src="/images/password.svg" alt="password" style={{height: '30px'}} />
                        <p>
                          Change Password
                        </p>
                      </div>
                  </Accordion.Header>
                  <Accordion.Body>
                      <ChangePassword />
                  </Accordion.Body>
              </Accordion.Item>
          </Accordion>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSettings}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  );
};

const AdminUserSettings = ({ showSettings, handleCloseSettings }) => {
  return (
      <Modal
        show={showSettings}
        onHide={handleCloseSettings}
        id="admin-settings-modal"
        className='blur fade'
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div>
                <h1>
                    Settings
                </h1>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Accordion>
            <Accordion.Item eventKey="0">
                  <Accordion.Header>
                      <div>
                        <img src="/images/password.svg" alt="password" style={{height: '30px'}} />
                        <p>
                          Change Password
                        </p>
                      </div>
                  </Accordion.Header>
                  <Accordion.Body>
                      <ChangePassword />
                  </Accordion.Body>
              </Accordion.Item>
          </Accordion>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSettings}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  );
};
 
export { UserSettings, AdminUserSettings };