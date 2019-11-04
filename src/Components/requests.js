const baseUrl = 'http://localhost:3001/';

const userSignin = (endpoint, username, usercode, usercolor) => {
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
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

export {
  userSignin,
}
