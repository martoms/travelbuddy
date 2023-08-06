import { useState, useContext } from "react";
import { AllContext } from "../../context/AllContext";
import { Accordion } from "react-bootstrap";
import NotificationDetails from "./NotificationDetails";
import { Form } from "react-bootstrap";

const NotificationsList = ({ handleForm }) => {

    
    const { notificationsList } = useContext(AllContext);
    const [isOpenArray, setIsOpenArray] = useState([]);


    if (!notificationsList) {
        return (
            <img src="/images/loading.gif" alt="loading" style={{marginLeft: '4rem'}} />
        )
    }

    const handleAccordionToggle = (index) => {
        setIsOpenArray(() => {
        const newArray = [];
        newArray[index] = !newArray[index];
        return newArray;
        });
    };

    const notificationHeader = notificationsList.map((notification, index) => {
        const { id, title, date, isRead } = notification;
        const notifDate = new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        });

        return (
            <div key={id} className="notification-items-container">
                <div className="notifications-checkbox">
                    <Form.Check
                        type="checkbox"
                        name="selection"
                        key={id}
                        value={id}
                        onChange={handleForm}
                    />
                </div>
                <div className="notifications-items">
                    <Accordion.Item eventKey={id}>
                        <Accordion.Header onClick={() => handleAccordionToggle(index)}>
                        <div>
                            <p style={isRead ? { fontWeight: "500" } : { fontWeight: "800" }}>
                            {title}
                            </p>
                            <p>{notifDate}</p>
                        </div>
                        </Accordion.Header>
                        <Accordion.Body>
                        { isOpenArray[index] && <NotificationDetails key={id} id={id} /> }
                        </Accordion.Body>
                    </Accordion.Item>
                </div>
            </div>
        );
    });

    return <>{notificationHeader}</>;
};

export default NotificationsList;
