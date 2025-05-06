import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { SITENAME } from "./constants.component";

// import { menus } from "./menus.component";

const Header = ({ selected }) => {

    const [user, setUser] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const verifyAuth = async () => {
            try {

                const response = await axios.get('http://localhost:5555/verify-auth', {
                    headers: {
                        'Authorization': token
                    }
                });

                if (response.status === 200) {
                    setUser(response.data.userid);
                } else {
                    navigate('/login');
                }

            } catch (e) {
                navigate('/login');
            }
        }

        // verifyAuth();
    }, [user, navigate, token]);

    return (
        <>
            <div className="row mx-0 py-3 text-white">
                <div className="col-4 px-4 my-2">
                    <h2>{SITENAME}</h2>
                </div>
                <div className="col-6"></div>
                <div className="col-2 d-flex justify-content-around align-items-center">
                    <ul class="navbar-nav d-flex justify-content-around align-items-center flex-row">
                        <li className="nav-item mx-3">
                            <Link to="/login" className='nav-link' aria-current="page">
                                Login
                            </Link>
                        </li>
                        <li className="nav-item mx-3">
                            <Link to="/signup" className='nav-link' aria-current="page">
                                Signup
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* <div className="col4">Drop your idea, we'll name it for the world.</div> */}
            </div>
            {/* <nav class="navbar navbar-expand-lg font-white px-3 text-uppercase">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        {
                            menus.map((menu) => (
                                <li className="nav-item" key={menu.id}>
                                    <Link to={menu.link} className={`nav-link ${menu.id === selected ? 'text-primary' : 'text-white'}`} aria-current="page">
                                        {menu.name}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </nav> */}
        </>
    );
}



export default Header;