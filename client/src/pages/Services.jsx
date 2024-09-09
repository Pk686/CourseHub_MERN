import { useAuth } from "../store/auth";

export const Service = () => {
    const {service} = useAuth();
    return <>
        <div className="section-services">
            <div className="container">
                <h1 className="main-heading">Services</h1>
            </div>
            <div className="container grid grid-three-cols">
            {service.map((currElem,Index)=>{
                const {price,description,provider,service,images} = currElem;
                return (
                    <div className="card" key={Index}>
                    <div className="card-img">
                        <img src={ `/${images}`} alt="our services" width="500" />
                    </div>
                    <div className="card-details">
                        <div className="grid grid-two-cols">
                            <p>{provider}</p>
                            <p>{price}</p>
                        </div>
                        <h2>{service}</h2>
                        <p>{description}</p>
                    </div>
                </div>
                );
            })}
                
            </div>
        </div>
    </>;
}
