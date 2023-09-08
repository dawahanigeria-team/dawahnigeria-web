import React,{useState} from "react";
import "./facebook.scss"
import {LoginSocialFacebook} from "reactjs-social-login"
import facebook from "../../../assets/png/social/facebook.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginAction } from "../../../Redux/Actions/ActionCreators";


function GetFacebookAuth  ()  {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    ////console.log(socialData)
    return (
        <div>
            <LoginSocialFacebook
            appId='392392739611134'

            onResolve={(response) => {
                //console.log(response.data)
                const {name, email, accessToken} = response.data
                if (pathname === "/auth/login") {
                    const payload = {
                      action: "login_user",
                      email_or_username: email,
                      token: accessToken
                      //password: "pa$$word",
                    };
      
                    //console.log(payload);
                   // dispatch(LoginAction(payload, navigate, setLoading));
                }else {
                    navigate("/auth/selectlanguage", {
                        state: {
                            name,
                            email,
                            accessToken
                        }
                    })
                }
           
           
            }}

            onReject={(err) => {
                //console.log(err)
            }}
            >
            
            <div className="cursor-pointer size_img">
            <img className="ssz" src={facebook} src-data={facebook} alt="facebook" />
            </div>
            
               
            </LoginSocialFacebook>

        </div>
    )

}

export default GetFacebookAuth