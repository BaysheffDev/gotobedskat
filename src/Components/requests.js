const baseUrl = 'http://localhost:3001/';

// Login or create new user
const userRequest = (endpoint, username, usercode, usercolor) => {
    return fetch(`http://localhost:3001/${endpoint}`, {
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

// Sync with partner
const partnerRequest = (partnername, partnercode) => {
    return fetch(`http://localhost:3001/sync`, {
        method: 'post',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
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

export {
  userRequest,
  partnerRequest
}
