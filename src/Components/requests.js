const baseUrl = 'http://localhost:3001/';
// const baseUrl = 'https://glacial-dawn-05185.herokuapp.com/';

// Login or create new user
const userRequest = (endpoint, username, usercode, usercolor) => {
    return fetch(`${baseUrl}${endpoint}`, {
        method: 'post',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            usercode: usercode,
            usercolor: usercolor,
        })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(err => console.log(err))
}

// Check if partner is synced with user
const checkSync = (endpoint, userid) => {
    return fetch(`${baseUrl}${endpoint}`, {
        method: 'post',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            userid: userid,
        })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(err => console.log(err))
}

// Sync with partner
const partnerRequest = (userid, partnername, partnercode) => {
    return fetch(`${baseUrl}sync`, {
        method: 'post',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            userid: userid,
            partnername: partnername,
            partnercode: partnercode,
        })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(err => console.log(err))
}

// Unsync with partner
const unsyncPartner = (userid) => {
    return fetch(`${baseUrl}unsync`, {
        method: 'post',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            userid: userid,
        })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(err => console.log(err))
}

// Change a user setting
const changeSettingRequest = (userid, setting, value) => {
    console.log("SETTING: ", setting);
    console.log("VALUE: ", value);
    return fetch(`${baseUrl}update/${setting}`, {
        method: 'post',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            'userid': userid,
            'value': value,
        })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(err => console.log(err))
}

// Change a user setting
const requestGridData = (userid, partnerid) => {
    return fetch(`${baseUrl}data`, {
        method: 'post',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            'userid': userid,
            'partnerid': partnerid,
        })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(err => console.log(err))
}

// Send bedtime
const sendBedtime = (userid, partnerid, date, time, message) => {
    return fetch(`${baseUrl}bedtime`, {
        method: 'post',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            'userid': userid,
            'partnerid': partnerid,
            'date': date,
            'time': time,
            'message': message,
        })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(err => console.log(err))
}

export {
  userRequest,
  partnerRequest,
  unsyncPartner,
  checkSync,
  changeSettingRequest,
  requestGridData,
  sendBedtime
}
