import React from "react";
import SingleIconCard from "./single/single-icon-card.component";

import img_brain from '../assets/images/brain.png';
import img_domain from '../assets/images/domain.png';
import img_email from '../assets/images/email.png';

const IconCards = () => {
    return (
        <>
            <div className="container py-3 text-white">
                <div className="row my-5 py-5 d-flex justify-content-around">
                    <SingleIconCard image={img_brain} title={"AI Powered Name Generation"} text={"Stuck on a name? NameDropper's got your back—our AI whips up cool, catchy names in seconds. Easy!"} />
                    <SingleIconCard image={img_domain} title={"Domain & Social Check Available"} text={"Check if your name's available as a domain and on social media—making sure you're good to go!"} />
                    <SingleIconCard image={img_email} title={"Email Handle Match"} text={"Make sure your email handle matches your name—keep it consistent and professional across all your accounts!"} />
                </div>
            </div>

        </>
    );
}

export default IconCards;