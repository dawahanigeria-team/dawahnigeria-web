
// audio detail
export const playTimingDesktop = (currentTime,duration) => {
    
    if (currentTime === 0) {

        return `00:00:00/${duration || '00:00:00'}`
    }
    else {
        let hours   = Math.floor(currentTime / 3600);
        let minutes = Math.floor((currentTime - (hours * 3600)) / 60);
        let seconds = Math.floor(currentTime - (hours * 3600) - (minutes * 60))
    
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}

        return `${hours}:${minutes}:${seconds}/${duration || '00:00:00'}`;

    }
  

}



//audio res
export const playTimingRes = (currentTime) => {

   

    if (currentTime === 0) {

        return "00:00:00"
    }
    else {
        let hours   = Math.floor(currentTime / 3600);
        let minutes = Math.floor((currentTime - (hours * 3600)) / 60);
        let seconds = Math.floor(currentTime - (hours * 3600) - (minutes * 60))
    
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}

        return hours+':'+minutes+':'+seconds;

    }


       
}



/**

  <div className="audiodetail_songs">
           
            <GroupWidget  heading="More Songs" type="album" />
          </div>
          <div className="audiodetail_album">
            <GroupWidget
              
              heading="More from this album"
              type="album"
            />
          </div>

           <GroupWidget  heading="Similar Songs" type={"album"} />
*/