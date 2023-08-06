import { useState } from "react";
import { Form } from "react-bootstrap";
import useHandleSubmit from "../../hooks/useHandleSubmit";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";

// Tour Package Active Status Toggle
const ActiveArchive = ({ isActive, availableSlots, _id }) => {

    const [status, setStatus] = useState(isActive)
    const { toggleTourPackageStatus } = useHandleSubmit()

    return ( 
        <div className="active-archived">
            <Form>
                <Form.Check
                    type="switch"
                    id="active"
                    label={ isActive ? 'Active' : 'Archived' }
                    checked={ status }
                    onChange={(e) => toggleTourPackageStatus(e, status, setStatus, _id)}
                    disabled={ availableSlots === 0 }
                />
            </Form>
        </div>
    );
};

// Tour Package Top Destination Toggle
const TopDestination = ({ destination, isTopDestination }) => {

    const [status, setStatus] = useState(isTopDestination)
    const { toggleTopDestination } = useHandleSubmit()

    return ( 
        <div className="top-destination-toggle">
            <Form>
                <Form.Check
                    style={{color: 'black'}}
                    type="switch"
                    id="active"
                    label="Top Destination"
                    checked={ status }
                    onChange={(e) => toggleTopDestination(e, status, setStatus, destination)}
                />
            </Form>
        </div>
    );
};

// Users Status
const UserStatus = ({ _id, isAdmin, username }) => {

    const [status, setStatus] = useState(isAdmin)
    const { toggleAdmin } = useHandleSubmit()
    const { user} = useContext(AllContext);

    return ( 
        <div className="top-destination-toggle">
            <Form>
                <Form.Check
                    type="switch"
                    id="active"
                    label="Admin"
                    checked={ status }
                    onChange={(e) => toggleAdmin(e, status, setStatus, _id)}
                    disabled={user && user.username === username}
                />
            </Form>
        </div>
    );
};
 
export { ActiveArchive, TopDestination, UserStatus };