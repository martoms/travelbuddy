import { Form } from "react-bootstrap";

const PriceWithGuests = ({ formData, tourPackages, buddiesCount }) => {

    const { tourPackageId } = formData
    let tourPrice;
    let pax;
    
    if (tourPackageId) {
        const tourPackage = tourPackages.find(tourPackage => tourPackage._id === tourPackageId)
        const { basePrice, packageDuration } = tourPackage
        pax = buddiesCount + 1
        

        switch (pax) {
            case 5:
              tourPrice = Math.round((basePrice * (Number(packageDuration.slice(0, 1)))) / 1.15);
              break;
            case 4:
              tourPrice = Math.round((basePrice * (Number(packageDuration.slice(0, 1)))) / 1.11);
              break;
            case 3:
              tourPrice = Math.round((basePrice * (Number(packageDuration.slice(0, 1)))) / 1.07);
              break;
            case 2:
              tourPrice = Math.round((basePrice * (Number(packageDuration.slice(0, 1)))) / 1.03);
              break;
            case 1:
              tourPrice = Math.round((basePrice * (Number(packageDuration.slice(0, 1)))));
              break;
            default:
              tourPrice = Math.round((basePrice * (Number(packageDuration.slice(0, 1)))) / 1.15);
        }
    }

    const totalPrice = tourPrice * pax

    return (
        <>
        { tourPackageId && (

            <>
            <div className="section price">
                <div className="base">
                    <Form.Label>Tour Price</Form.Label>
                    <span>&#8369; {tourPrice.toLocaleString()}</span>
                </div>
                <div className="pax">
                    <Form.Label>Pax</Form.Label>
                    <span>x{pax}</span>
                </div>
                <div className="total">
                    <Form.Label>Total</Form.Label>
                    <span>&#8369; {totalPrice.toLocaleString()}</span>
                </div>
            </div>
            </>

        ) }
        </>
    )
}

const PriceWithFriends = ({ formData, selectedDestination, tourPackages, buddiesCount }) => {
  const packageDuration = formData.packageDuration;
  let tourPrice;
  let pax;
  
  if (selectedDestination && packageDuration.length !== 0) {
      const tourPackage = tourPackages.find(tourPackage => tourPackage.destination === selectedDestination)
      const { basePrice } = tourPackage
      pax = buddiesCount + 1
      

      switch (pax) {
          case 5:
            tourPrice = Math.round((basePrice * (Number(packageDuration.slice(0, 1)))));
            break;
          case 4:
            tourPrice = Math.round((basePrice * (Number(packageDuration.slice(0, 1)))) * 1.03);
            break;
          case 3:
            tourPrice = Math.round((basePrice * (Number(packageDuration.slice(0, 1)))) * 1.07);
            break;
          case 2:
            tourPrice = Math.round((basePrice * (Number(packageDuration.slice(0, 1)))) * 1.11);
            break;
          default:
            tourPrice = Math.round((basePrice * (Number(packageDuration.slice(0, 1)))));
      }
  }

  const totalPrice = tourPrice * pax

  return (
      <>
      { (selectedDestination  && packageDuration.length !== 0) && (

          <>
          <div className="section price">
              <div className="base">
                  <Form.Label>Tour Price</Form.Label>
                  <span>&#8369; {tourPrice.toLocaleString()}</span>
              </div>
              <div className="pax">
                  <Form.Label>Pax</Form.Label>
                  <span>x{pax}</span>
              </div>
              <div className="total">
                  <Form.Label>Total</Form.Label>
                  <span>&#8369; {totalPrice.toLocaleString()}</span>
              </div>
          </div>
          </>

      ) }
      </>
  )
}

const PriceSolo = ({ formData, selectedDestination, tourPackages }) => {

  const packageDuration = formData.packageDuration;
  let tourPrice;
  
  if (selectedDestination && packageDuration.length !== 0) {
      const tourPackage = tourPackages.find(tourPackage => tourPackage.destination === selectedDestination)
      const { basePrice } = tourPackage
      tourPrice = Math.round((basePrice * (Number(packageDuration.slice(0, 1)))) * 1.3);
  }

  return (
      <>
      { (selectedDestination && packageDuration.length !== 0) && (

          <>
          <div className="section price">
              <div className="base">
                  <Form.Label>Tour Price</Form.Label>
                  <span>&#8369; {tourPrice.toLocaleString()}</span>
              </div>
              <div className="pax">
                  <Form.Label>Pax</Form.Label>
                  <span>x1</span>
              </div>
              <div className="total">
                  <Form.Label>Total</Form.Label>
                  <span>&#8369; {tourPrice.toLocaleString()}</span>
              </div>
          </div>
          </>

      ) }
      </>
  )
}
 
export { PriceWithGuests, PriceWithFriends, PriceSolo };