import { Modal, Button, Accordion, Form } from "react-bootstrap";
import NotificationsList from "./NotificationsList";
import useFetch from "../../hooks/useFetch";
import useHandleForm from "../../hooks/useHandleForm";
import useHandleSubmit from "../../hooks/useHandleSubmit";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";

const UserNotifications = ({ showNotifications, handleCloseNotifications }) => {

    useFetch(`${process.env.REACT_APP_API_URL}/users/profile/notifications`, 'SET_NOTIFICATIONS_LIST');
    const { user } = useContext(AllContext);
    
    const initialFormState = {
        selection: []
    };
    const {
        formData,
        handleForm,
    } = useHandleForm(initialFormState)
    const {
      readNotifications,
      unreadNotifications
    } = useHandleSubmit(formData)

    let isAdmin;
    if (user) {
      isAdmin = user.isAdmin;
    }
    
    return (
        <Modal
          show={showNotifications}
          onHide={handleCloseNotifications}
          id="admin-settings-modal"
          className='blur fade'
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <div>
                  <h1>
                      Notifications
                  </h1>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              
            <Form>
                <div className="notifications-control">
                  {
                    formData && formData.selection.length === 0 ?
                    <>
                    <span className="notifications-read pointer" onClick={(e) => readNotifications(e, isAdmin)} >
                      Mark All as Read
                    </span>
                    <span className="notifications-unread pointer" onClick={(e) => unreadNotifications(e, isAdmin)} >
                      Mark All as Unread
                    </span>
                    </>
                    :
                    <>
                    <span className="notifications-read pointer" onClick={(e) => readNotifications(e, isAdmin)} >
                      Mark as Read
                    </span>
                    <span className="notifications-unread pointer" onClick={(e) => unreadNotifications(e, isAdmin)} >
                      Mark as Unread
                    </span>
                    </>
                  }
                  
                </div>
                <Accordion className="d-lg-block" >
                    <NotificationsList handleForm={handleForm} />
                </Accordion>
            </Form>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseNotifications}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    );
};

const AdminUserNotifications = ({ showNotifications, handleCloseNotifications }) => {

  useFetch(`${process.env.REACT_APP_API_URL}/users/admin/notifications`, 'SET_NOTIFICATIONS_LIST');
  const { isAdmin } = useContext(AllContext);
  
  const initialFormState = {
      selection: []
  };
  const {
      formData,
      handleForm,
  } = useHandleForm(initialFormState)
  const {
    readNotifications,
    unreadNotifications
  } = useHandleSubmit(formData)


  return (
      <Modal
        show={showNotifications}
        onHide={handleCloseNotifications}
        id="admin-settings-modal"
        className='blur fade'
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div>
                <h1>
                    Notifications
                </h1>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
          <Form>
              <div className="notifications-control">
                {
                  formData && formData.selection.length === 0 ?
                  <>
                  <span className="notifications-read pointer" onClick={(e) => readNotifications(e, isAdmin)} >
                    Mark All as Read
                  </span>
                  <span className="notifications-unread pointer" onClick={(e) => unreadNotifications(e, isAdmin)} >
                    Mark All as Unread
                  </span>
                  </>
                  :
                  <>
                  <span className="notifications-read pointer" onClick={(e) => readNotifications(e, isAdmin)} >
                    Mark as Read
                  </span>
                  <span className="notifications-unread pointer" onClick={(e) => unreadNotifications(e, isAdmin)} >
                    Mark as Unread
                  </span>
                  </>
                }
                
              </div>
              <Accordion>
                  <NotificationsList handleForm={handleForm} />
              </Accordion>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseNotifications}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  );
};
 
export { UserNotifications, AdminUserNotifications };