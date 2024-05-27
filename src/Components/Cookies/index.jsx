import Cookies from 'js-cookie';

const SetCookie = (token, user, hours) => {
    const expirationDate = new Date();
    const hoursToAdd = hours;
    
    expirationDate.setTime(expirationDate.getTime() + (hoursToAdd * 60 * 60 * 1000));
    const userString = JSON.stringify(user);
    
    Cookies.set("logginUserCreditionals", userString, {
        expires: expirationDate,
        path: '/'
    });
    Cookies.set("token", token, {
        expires: expirationDate,
        path: '/'
    });
};


const GetCookie = () => {
   
    const userCookie = Cookies.get("logginUserCreditionals");
    let userIsLoggedIn = "";
    if (userCookie && userCookie != "undefined") {

        userIsLoggedIn = JSON.parse(userCookie);
    }
    const token = Cookies.get('token');
    return { userIsLoggedIn, token };
};


const RemoveCookie = () => {
    Cookies.remove("logginUserCreditionals", {
        path: '/'
    });
    Cookies.remove("token", {
        path: '/'
    });
};

export { SetCookie, GetCookie, RemoveCookie }