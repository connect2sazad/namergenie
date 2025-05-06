import React, { cloneElement, isValidElement } from "react";

const SingleTextCard = ({ title, text }) => {

    return (
        <>
            <div className="col-4">
                <div class="card custom-card text-white mt-4" >
                    <div class="card-body">
                        <p className="card-text text-align-left">
                            {text}
                        </p>
                        <h2 className="card-title font-weight-bold text-align-left">{title}</h2>
                    </div>
                </div>
            </div>

        </>
    );
}

export default SingleTextCard;