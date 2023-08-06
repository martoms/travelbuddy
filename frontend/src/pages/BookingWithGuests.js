// Hooks
import useFetch from "../hooks/useFetch";
import { useContext  } from "react";
import useHandleForm from "../hooks/useHandleForm";
import useHandleSubmit from "../hooks/useHandleSubmit";
import useSelectDestination from "../hooks/bookings/useSelectDestination";
import useModal from "../hooks/useModal";
// Context
import { AllContext } from "../context/AllContext";
// Components
import { PriceWithGuests } from "../components/bookings/BookingPrice";
import { JoinersWithGuests } from "../components/bookings/Joiners";
import PaymentOptions from "../components/bookings/PaymentOptions";
import TravelPlanInfo from "../components/bookings/TravelPlanInfo";
import { PreviewPackageMain, PreviewPackageMobile } from "../components/bookings/PreviewPackage";
import { TravelPlanOptionsMain, TravelPlanOptionsMobile } from "../components/bookings/TravelPlanOptions";
import DestinationOptions from "../components/bookings/DestinationOptions";
import DestinationPackageOptions from "../components/bookings/DestinationPackageOptions";
import Agreement from "../components/bookings/Agreement";
// Dependencies
import { Form, Button } from 'react-bootstrap';
import { Navigate } from "react-router-dom";
import { AdminWarning, UnauthenticatedWarning } from "../components/Warning";

const BookingWithGuests = () => {
    
    useFetch(`${process.env.REACT_APP_API_URL}/users/profile`, 'SET_USER');
    const { isPending, error } = useFetch(`${process.env.REACT_APP_API_URL}/bookings/with-guests`, 'SET_TOURPACKAGE');

    const justme = document.getElementById('justme');
    const more = document.getElementById('more');

    const initialFormState = {
        tourPackageId: '',
        buddies: [{ fullName: '', age: '', sex: '' }],
        paymentMethod: '',
    };
    const {
        tourPackages,
        token,
        user
    } = useContext(AllContext);
    const {
        selectedDestination,
        destinationSelected
    } = useSelectDestination();
    const {
        showTravelPlanInfo, handleCloseTravelPlanInfo, handleShowTravelPlanInfo,
        showPreviewPackage, handleClosePreviewPackage, handleShowPreviewPackage,
        showAgreement, handleCloseAgreement, handleShowAgreement
    } = useModal();
    const {
        formData,
        buddiesCount,
        handleJustme,
        handleForm,
        handleAddBuddy,
        handleRemoveBuddy,
    } = useHandleForm(initialFormState, justme, more)
    const {
        submitBooking
    } = useHandleSubmit(formData)

    if (error) {
        console.log('error');
    }

    let username;
    let isAdmin;
    let forbiddenAction = 'make a booking'
    if(user) {
        username = user.username
        isAdmin = user.isAdmin
    }

    return ( 
        token === null ?
        <>
        <Navigate to='/users/login' />
        <UnauthenticatedWarning forbiddenAction={forbiddenAction} />
        </>
        :
        (
            token && isAdmin ?
            <>
            <Navigate to='/users/login' />
            <AdminWarning username={username} forbiddenAction={forbiddenAction} />
            </>
            :
            <div id="with-guests" className="page container-fluid d-flex flex-column">
                <div className="container-fluid">
                    <h2 className="current-page scrollOffsetIndicator">Booking</h2>
                    <h1 className="d-lg-none">You're Traveling with Guests!</h1>
                    <div className="row">

                        {/* TRAVEL OPTIONS (for mobile screens) */}
                        <TravelPlanOptionsMobile handleShowTravelPlanInfo={handleShowTravelPlanInfo} />

                        {/* PREVIEW FOR LARGER SCREENS */}
                        <PreviewPackageMain
                            selectedDestination={selectedDestination}
                            tourPackages={tourPackages}
                        />

                        {/* FORM STARTS */}
                        <div className="col-12 col-lg-5 col-xl-4">
                            <Form onSubmit={(e) => submitBooking(e, 'with-guests')}>
                                {/* Travel Options Main */}
                                <TravelPlanOptionsMain handleShowTravelPlanInfo={handleShowTravelPlanInfo} />

                                {/* Destination Starts */}
                                <Form.Group className="section destination">
                                    <Form.Label className="section-title" htmlFor="destination">
                                        Destination
                                    </Form.Label>
                                    <Form.Group className="selection">
                                        <select id="destination" name="destination" onChange={destinationSelected}>
                                            <option>{ isPending ? 'Loading Destinations....' : 'Select Destination'}</option>
                                            <DestinationOptions tourPackages={tourPackages} />
                                        </select>
                                    </Form.Group>
                                    { selectedDestination && (
                                        selectedDestination === 'Select Destination' ? (<></>) : (
                                            <Form.Label className="preview d-lg-none" onClick={handleShowPreviewPackage}>
                                                Preview Destination
                                            </Form.Label>
                                        )
                                    ) }
                                </Form.Group>
                                {/* Destination Ends */}

                                {/* Travel Duration */}
                                { selectedDestination && (
                                    selectedDestination === 'Select Destination' ? (<></>) : (
                                        <Form.Group className="section tour">
                                            <Form.Label className="section-title">Available Tours and Slots</Form.Label>
                                            <Form.Group className="selection">
                                                <DestinationPackageOptions
                                                    tourPackages={tourPackages}
                                                    selectedDestination={selectedDestination}
                                                    handleForm={handleForm}
                                                />
                                            </Form.Group>
                                        </Form.Group>
                                    )
                                )}

                                {/* Joiners */}
                                { formData.tourPackageId &&
                                    <JoinersWithGuests
                                    formData={formData}
                                    selectedDestination={selectedDestination}
                                    handleJustme={handleJustme}
                                    buddiesCount={buddiesCount}
                                    handleForm={handleForm}
                                    handleAddBuddy={handleAddBuddy}
                                    handleRemoveBuddy={handleRemoveBuddy}
                                />
                                }

                                {/* Price */}
                                { (justme && (justme.checked || more.checked)) &&
                                    <PriceWithGuests formData={formData} tourPackages={tourPackages} buddiesCount={buddiesCount} />
                                }
                                
                                
                                {/* Payment Options */}
                                { (justme && (justme.checked || more.checked)) &&
                                    <PaymentOptions handleForm={handleForm} />
                                }

                                {/* Pay Now Button */}
                                { formData.paymentMethod.length === 0 ? (<></>) : (
                                    <div className="section paynow">
                                        <div className="agree">
                                            <input className="form-check-input" type="checkbox" id="agree" value="agree" onClick={handleShowAgreement} />
                                            <Form.Label className="d-inline-block" htmlFor="agree">I have read and agreed <wbr />with <wbr />the <wbr />terms <wbr />and <wbr />conditions.</Form.Label>
                                        </div>
                                        {
                                            (document.getElementById('agree') && document.getElementById('agree').checked) ?
                                            (( <Button className="btn-primary" type="submit">Pay Now!</Button>))
                                            :
                                            ( <Button className="btn-primary" type="submit" disabled>Pay Now!</Button>)
                                        }
                                    </div>
                                )}
                                
                            </Form>
                        </div>
                        {/* FORM ENDS */}
                        
                        {/* Travel Plan Info */}
                        <TravelPlanInfo
                            showTravelPlanInfo={showTravelPlanInfo}
                            handleCloseTravelPlanInfo={handleCloseTravelPlanInfo}
                        />

                        {/* Preview Package */}
                        <PreviewPackageMobile
                            showPreviewPackage={showPreviewPackage}
                            handleClosePreviewPackage={handleClosePreviewPackage}
                            selectedDestination={selectedDestination}
                            tourPackages={tourPackages}
                        />

                        {/* Terms and Conditions Agreement */}
                        <Agreement
                            showAgreement={showAgreement}
                            handleCloseAgreement={handleCloseAgreement}
                        />

                    </div>
                </div>
            </div>
        )
    );
}
 
export default BookingWithGuests;