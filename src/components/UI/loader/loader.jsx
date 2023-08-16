import React from 'react';
import "./loader.scss"
import loader from "../../../assets/svg/loader.svg"

function Loader () {

    return (
        <div className='loader_wrapper'>
          
            <div id="animation_rotate" className='loading_img'>
                <img src-data={loader} className='img_sz' src={loader} alt="loader" />
            </div>
        </div>
    )
}

export default Loader