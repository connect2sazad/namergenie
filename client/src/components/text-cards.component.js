import React from "react";
import SingleTextCard from "./single/single-text-card.component";

const TextCards = () => {
    return (
        <>
            <div className="container pb-3 text-white">
                <div className="row mb-5 d-flex justify-content-around">
                    <SingleTextCard title={"FundFriend"} text={"Personal finance app"} />
                    <SingleTextCard title={"SpaceLoom"} text={"Virtual interior design tool"} />
                    <SingleTextCard title={"Waggle"} text={"Pet tracking device"} />
                    <SingleTextCard title={"Cookscape"} text={"Recipe sharing platform"} />
                    <SingleTextCard title={"LinguaSphere"} text={"Language learning platform"} />
                    <SingleTextCard title={"VentureVista"} text={"Event planning software"} />
                </div>
            </div>

        </>
    );
}

export default TextCards;