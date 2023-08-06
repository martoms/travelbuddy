import { Form } from "react-bootstrap";

const PaymentOptions = ({handleForm}) => {
    return ( 
        <>
        <div className="section payment-opt">
            <Form.Label className="section-title">Payment Options:</Form.Label>
            <div className="selection">
                <Form.Label htmlFor="gcash" className="payment-opt">
                    <input onClick={(e) => handleForm(e)} className="form-check-input" id="gcash" name="paymentMethod" type="radio" value="Gcash" />
                    <span className="radio"></span>
                    Gcash
                    <span className="logo">
                        <div>
                            <img src="/images/gcash.svg" alt="gcash"/>
                        </div>
                    </span>
                </Form.Label>
                <Form.Label htmlFor="maya" className="payment-opt">
                    <input onClick={(e) => handleForm(e)} className="form-check-input" id="maya" name="paymentMethod" type="radio" value="Maya" />
                    <span className="radio"></span>
                    Maya
                    <span className="logo">
                        <div>
                            <img src="/images/maya.svg" alt="maya" />
                        </div>
                    </span>
                </Form.Label>
                <Form.Label htmlFor="paypal" className="payment-opt">
                    <input onClick={(e) => handleForm(e)} className="form-check-input" id="paypal" name="paymentMethod" type="radio" value="Paypal" />
                    <span className="radio"></span>
                    Paypal
                    <span className="logo">
                        <div>
                            <img src="/images/paypal.svg" alt="paypal" />
                        </div>
                    </span>
                </Form.Label>
                <Form.Label htmlFor="mastercard" className="payment-opt">
                    <input onClick={(e) => handleForm(e)} className="form-check-input" id="mastercard" name="paymentMethod" type="radio" value="Mastercard" />
                    <span className="radio"></span>
                    Mastercard
                    <span className="logo">
                        <div>
                            <img src="/images/mastercard.svg" alt="mastercard" />
                        </div>
                    </span>
                </Form.Label>
                <Form.Label htmlFor="visa" className="payment-opt">
                    <input onClick={(e) => handleForm(e)} className="form-check-input" id="visa" name="paymentMethod" type="radio" value="Visa" />
                    <span className="radio"></span>
                    Visa
                    <span className="logo">
                        <div>
                            <img src="/images/visa.svg" alt="visa" />
                        </div>
                    </span>
                </Form.Label>
                <Form.Label htmlFor="palawan" className="payment-opt">
                    <input onClick={(e) => handleForm(e)} className="form-check-input" id="palawan" name="paymentMethod" type="radio" value="Palawan" />
                    <span className="radio"></span>
                    Palawan
                    <span className="logo">
                        <div>
                            <img src="/images/palawan.svg" alt="palawan" />
                        </div>
                    </span>
                </Form.Label>
            </div>
        </div>
        </>
    );
}
 
export default PaymentOptions;