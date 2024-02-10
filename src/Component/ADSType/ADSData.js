import audioImage from "../../assets/image/audio-image.webp";

export const ADSData = 
    {
        id: 1, 
        title: "LOREM IPSUM",
        image: audioImage , 
        city: 'DELHI', 
        start: 'Starts',
        startDate:'07/07/23',
        expire: 'Expire on',
        expireDate:'07/07/23',
       
    }
   

export const repeatedADSData = Array(30).fill(ADSData);