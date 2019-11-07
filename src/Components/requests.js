const baseUrl = 'http://localhost:3001/';

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
const changeSettingRequest = (setting, value) => {
    return fetch(`${baseUrl}update/${setting}`, {
        method: 'post',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            'setting': value,
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
  changeSettingRequest
}
