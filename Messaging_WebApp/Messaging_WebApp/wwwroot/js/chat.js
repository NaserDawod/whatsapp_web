var token = "df"

function change(val) {
    token = val
}

async function getUser() {
    var tok = "Bearer " + token
    const r = await fetch('/api/Contacts2/user', {
        method: 'GET',
        headers: {
            'Authorization': tok,
            'Content-Type': 'application/json'
        }
    });
    const d = await r.json()
    return d;
}

async function getContacts() {
    var tok = "Bearer " + token
    const r = await fetch('/api/Contacts2/', {
        method: 'GET',
        headers: {
            'Authorization': tok,
            'Content-Type': 'application/json'
        }
    })
    const d = await r.json()
    return d
}

async function getContact(contName) {
    var tok = "Bearer " + token
    const r = await fetch('/api/Contacts2/' + contName, {
        method: 'GET',
        headers: {
            'Authorization': tok,
            'Content-Type': 'application/json'
        }
    })
    const d = await r.json()
    return d
}



async function printUser() {
    var user = await getUser()
    let elem = document.getElementById('main-user')
    elem.innerHTML = "<img src='/Images/img1.jpg' id='user-img' class='profileimage'>" +
        "<span clas='d-flex'>" + user.name + "</span>" +
        "<svg data-bs-toggle='modal' data-bs-target='#staticBackdrop' xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-person-plus fa-5x icon_place' viewBox='0 0 16 16'>" +
        "<path d='M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'/>" +
        "<path fill-rule='evenodd' d='M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z'/>" +
        "</svg>" +
        "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-door-open icon_place' viewBox='0 0 16 16'>" +
        "<path d='M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z'/>" +
        "<path d='M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z'/>" +
        "</svg>"
}



async function postContact(uesrname, name, servert) {
    var p = location.host
    var s = await getUser()
    console.log(p)
    const d = await fetch('https://' + servert + '/api/Contacts2/invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: s.username, to: uesrname, server: p })
    });
    console.log(d)
    var tok = "Bearer " + token
    const r = await fetch('/api/Contacts2', {
        method: 'POST',
        headers: {
            'Authorization': tok,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ UserID: uesrname, Name: name, server: servert })
    });
    console.log(r)
}

async function postMessage(contName, message) {
    var s = await getUser()
    let c = await getContact(contName)
    c.server = String(c.server)
    console.log(s)
    const d = await fetch('https://' + c.server + '/api/Contacts2/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: s.username, to: contName, content: message })
    });
    console.log(d)
    var tok = "Bearer " + token
    const r = await fetch('/api/Contacts2/' + contName + '/messages', {
        method: 'POST',
        headers: {
            'Authorization': tok,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Content : message })
    });
    console.log(r)
}

async function addContact2(curr_user) {
    let username = document.getElementById('Username').value
    let name = document.getElementById('Name').value
    let server = document.getElementById('Server').value
    document.getElementById('Username').value = ''
    document.getElementById('Name').value = ''
    document.getElementById('Server').value = ''
    await postContact(username, name, server)
    await printContacts2()
}

async function printContacts2() {
    let message = ''
    let time = ''
    let contacts = await getContacts()
    let str = ''

    contacts.forEach(cont => {
        if (cont.last == null) {
            message = ''
            time = ''
        } else {
            message = cont.last
            cont.lastTalk = String(cont.lastTalk)
            time = cont.lastTalk.substring(11)
        }
        str += ("<div class=\"chat-list-item d-flex flex-row w-100 p-2 border-bottom\" onclick=\"showMessages2(" + "\'" + cont.contname + "\'" + ")\">" +
                    "<div id='cont-img'>" +
                        "<img src='/Images/img1.jpg' alt='Profile Photo' class='img-fluid rounded-circle mr-2' style=\"height:50px; max-width: 55px;\">" +
                    "</div>" +
                    "<div class=\"w-50\">" +
                        "<h5 class=\"mb-1\">" + cont.name + "</h5>" +
                        "<p class=\"mb-1\" id=\"" + cont.contname + "-m\">" + message + "</p>" +
                    "</div>" +
                    "<div class=\"flex-grow-1 text-right\">" +
                        "<div class=\"small time\" id=\"" + cont.contname + "-t\">" + time + "</div>" +
                    "</div>" +
                "</div>")
        })
    str += "<table class='table table-bordered table-striped mb-0'>" +
            + "</table>"
    document.getElementById('contact_div').innerHTML = str
}

async function showMessages2(contname) {
    let elem = document.getElementById('messages')
    let cont = await getContact(contname)
    console.log(cont)
    elem.innerHTML = "<div class=\"bg-light\">" +
                        "<img src='/Images/img1.jpg' class=\"profileimage\">" +
                        "<span clas=\"d-flex\">" + cont.name + "</span>" +
                        "<span id=\"contact_name\" clas=\"d-flex\" style=\"display: none;\">" + cont.userid + "</span>" +
                        "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-search\" viewBox=\"0 0 16 16\">" +
                            "<path d=\"M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z\"/>" +
                        "</svg>" +
                        "<button class=\"dropdown\">" +
                            "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-three-dots-vertical\" viewBox=\"0 0 16 16\">" +
                                "<path d=\"M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z\"/>" +
                            "</svg>" +
                            "<div class=\"dropdown-content\">" +
                                "<div class=\"biclips2\">Info</div>" +
                                "<div class=\"biclips2\">Delete chat</div>" +
                                "<div class=\"biclips2\">Mute</div>" +
                            "</div>" +
                        "</button>" +
                    "</div>" +
                    "<div class=\"table-wrapper-scroll-y my-custom-scrollbar d-flex flex-column chat-de  overlay\" id=\"chat_p\">" +
                        readMessage2(cont.messages) +
                        "<table class=\"table table-bordered table-striped mb-0\">" +
                        "</table>" +
                    "</div>" +
                    "<div class=\"input-group Typehere n-input-group\">" +
                        "<span class=\"input-group-text iconsandinput\">" +
                            "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-emoji-laughing\" viewBox=\"0 0 16 16\">" +
                                "<path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z\"/>" +
                                "<path d=\"M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5zM7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z\"/>" +
                            "</svg>" +
                            "<button class=\"dropup\">" +
                                "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-paperclip\" viewBox=\"0 0 16 16\">" +
                                    "<path d=\"M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z\"/>" +
                                "</svg>" +
                                "<div class=\"dropup-content\">" +
                                    "<div class=\"clipdivs\">" +
                                        "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-person biclips\" viewBox=\"0 0 16 16\">" +
                                            "<path d=\"M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z\"/>" +
                                        "</svg>" +
                                    "</div>" +
                                    "<div>" +
                                        "<svg xmlns=\"http://www.w3.org/2000/svg\" onclick=\"sendvoice()\" data-bs-toggle=\"modal\" data-bs-target=\"#staticBackdrop4\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-mic-fill biclips\" viewBox=\"0 0 16 16\">" +
                                            "<path d=\"M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z\"/>" +
                                            "<path d=\"M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z\"/>" +
                                        "</svg>" +
                                    "</div>" +
                                    "<div>" +
                                        "<svg data-bs-toggle=\"modal\" data-bs-target=\"#staticBackdrop3\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-camera biclips\" viewBox=\"0 0 16 16\">" +
                                            "<path d=\"M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z\"/>" +
                                            "<path d=\"M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z\"/>" +
                                        "</svg>" +
                                    "</div>" +
                                    "<div>" +
                                        "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-image biclips\" viewBox=\"0 0 16 16\" data-bs-toggle=\"modal\" data-bs-target=\"#staticBackdrop2\">" +
                                            "<path d=\"M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z\"/>" +
                                            "<path d=\"M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z\"/>" +
                                        "</svg>" +
                                    "</div>" +
                                "</div>" +
                            "</button>" +
                            "<input  type=\"text\" class=\"form-control\" aria-label=\"Amount (to the nearest dollar)\" placeholder=\"Type a message\" id=\"typem\">" +
                            "<div onclick=\"sendMessage2(" + "\'" + contname + "\'" + ")\">" +
                                "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-send-fill\" viewBox=\"0 0 16 16\">" +
                                    "<path d=\"M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z\">" +
                                "</svg>" +
                            "</div>" +
                        "</span>" +
                    "</div>"
    const wage = document.getElementById('typem');
    wage.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            sendMessage2(e);
        }
    });
}

async function sendMessage2(contname) {
    let message = document.getElementById('typem').value
    document.getElementById('typem').value = ''
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    if ((message.trim()).length === 0) {
        return
    } else {
        await postMessage(contname, message.trim())
        let elem = document.getElementById('chat_p')
        elem.innerHTML += "<div class=\"flex-row d-flex align-self-end self p-1 my-1 mx-3 rounded shadow-sm message-item greenbackground\">" +
                                "<div class=\"d-flex flex-row\">" +
                                    "<div class=\"body m-1 mr-2\">" + message + "</div>" +
                                    "<div class=\"time ml-auto small text-right flex-shrink-0 align-self-end text-muted\" style=\"width:75px;\">" +
                                        time +
                                        "<i class=\"fas fa-check-circle\"></i>" +
                                    "</div>" +
                                "</div>" +
                            "</div>"
        document.getElementById(contname + '-t').innerText = time
        document.getElementById(contname + '-m').innerText = message.substr(0, 20)
    }
}

function readMessage2(messages) {
    let str = ''
    i = 0
    let side = ''
    let color = ''
    let time = ''
    messages.forEach(msg => {
        msg.created = String(msg.created)
        time = msg.created.substring(11)
        if (msg.sent === false) {
            side = 'start'
            color = 'bg-white'
        } else {
            side = 'end'
            color = 'greenbackground'
        }
        str += "<div class=\"flex-row d-flex align-self-" + side + " self p-1 my-1 mx-3 rounded shadow-sm message-item " + color + "\">" +
                    "<div class=\"d-flex flex-row\">" +
                        "<div class=\"body m-1 mr-2\">" + msg.content + "</div>" +
                        "<div class=\"time ml-auto small text-right flex-shrink-0 align-self-end text-muted\" style=\"width:75px;\">" +
                            time +
                            "<i class=\"fas fa-check-circle\"></i>" +
                        "</div>" +
                    "</div>" +
                "</div>"
        i++
    });
    return str
}
