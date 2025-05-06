import React, { cloneElement, isValidElement } from "react";

const SingleIconCard = ({ image, title, text }) => {

    return (
        <>
            <div className="col-4">
                <div class="card custom-card text-white" >
                    <div class="card-body">
                        <div className="d-flex justify-content-center align-items-center card-icon">
                            <img className="icon" src={image} alt={title} />
                        </div>
                        <h5 className="card-title font-weight-bold">{title}</h5>
                        <p className="card-text">
                            {text}
                        </p>
                    </div>
                </div>
            </div>

        </>
    );
}

export default SingleIconCard;