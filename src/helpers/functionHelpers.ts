import Geocode from "react-geocode";

export const firsLetterToUpperCase= (str:string):string =>{
    return str[0].toUpperCase() + str.slice(1);
}
export const geolocation = ({country ,city, addressLine}) => {
    Geocode.setApiKey(process.env.REACT_APP_GEOCODING_KEY);
    Geocode.setLocationType("ROOFTOP")
    return Geocode.fromAddress(`${country}, ${city}, ${addressLine}`)
}

export const timeString = (time: any) => {
    const year = time.getFullYear();
    const month = time.getMonth();
    const date = time.getDate();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const check = (some: any) => some < 10 ? "0" + some : some;
    const timezoneOffset = Math.abs(time.getTimezoneOffset() / 60);
    return `${year}-${check(month+1)}-${check(date)}T${check(hours)}:${check(minutes)}+${check(timezoneOffset)}:00`
  }