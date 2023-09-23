let contacts = {
    'name': ['beispielname h', 'name h'],
    'email': ['beispiel@test.de', 'email'],
    'phone-number': ['beispiel', 'phone-number']
};

function renderContactsOverview(){
    document.getElementById('render-contacts-ovewrview').innerHTML = ``;

    for (let i = 0; i < contacts['name'].length; i++) {
        let name = contacts['name'][i];
        let email = contacts['email'][i];
        let firstLetters = contacts['name'][i].charAt(0);

        let spaceIndex = name.indexOf(' ');
        if (spaceIndex !== -1 && spaceIndex < name.length - 1) {
            let firstLetterAfterSpace = name.charAt(spaceIndex + 1);

        document.getElementById('render-contacts-ovewrview').innerHTML += /*html*/ `
            <div class="contact-block">
                <p class="alphabet">a-z</p>
                <div class="contact-seperator-horizontal"></div>
                <div class="sub-contact-block">
                    <div class="first-letters">${firstLetters} ${firstLetterAfterSpace}</div>
                    <div class="name-and-email">
                        <p id="name${i}" class="contact-name">${name}</p>
                        <a id="email${i}" class="contact-email" href="">${email}</a>
                    </div>
                </div>
            </div>
        `;
        }
    }
}

function pushContactInfo(){
    let name = document.getElementById('contact-name-input');
    let email = document.getElementById('contact-email-input');
    let phoneNumber = document.getElementById('contact-phone-input');

    contacts['name'].push(name.value);
    contacts['email'].push(email.value);
    contacts['phone-number'].push(phoneNumber.value);

    name.value = ``;
    email.value = ``;
    phoneNumber.value = ``;

    closeContactAddCard();
    renderContactsOverview();
}

function openContacts() {
    document.getElementById('contacts').innerHTML = /*html*/ `
        <div id="contact-overview">
            <div id="add-new-contact" onclick="renderAddContactCard()">
                <p>Add new contact</p>
                <img src="./assets/img/person_add.png" alt="">
            </div>
            <div id="render-contacts-ovewrview">hier werden die kontakte hineingerendert</div>
        </div>
        <div id="details-of-contacts">
            <div id="welcome-to-contacts">
                <h1>Contacts</h1>
                <div id="contact-seperator"></div>
                <div iod="contact-slogan">Better with a team</div>
            </div>
            <div id="detail-view-of-contacts">detailansicht ausgewählter kontakte</div>
        </div>    
    `;
    renderContactsOverview();
}
function slideInCard(){
    let animation = document.getElementById('add-contact-card');
    let background = document.getElementById('color-my-back');
    animation.style.right = "50px";
    animation.style.zIndex = "3";
    background.style.display = "block";
    background.style.zIndex = "1";
}
function closeContactAddCard(){
    let animation = document.getElementById('add-contact-card');
    let background = document.getElementById('color-my-back');
    animation.style.right = "-1000px";
    background.style.display = "none";
        
    animation.addEventListener('transitionend', function() {
        if (animation.style.right === "-1000px") {
        animation.innerHTML = ``;
        }
        })
}
function renderAddContactCard() {
    document.getElementById('add-contact-card').innerHTML = /*html */ `
    <div id="create-contact">

        <div id="design-sector">
            <img src="./assets/img/logo4SideBar.svg" alt="join logo">
            <h2>Add contact</h2>
            <p>Tasks are better with a team!</p>
            <div id="horizon-seperator"></div>    
        </div>

        <div id="fill-in-sector">
            <div id="move-img">
                <div class="cancel-svg" onclick="closeContactAddCard()">
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path id="change-cancel-svg-color-head" d="M12.2496 11.9998L17.4926 17.2428M7.00659 17.2428L12.2496 11.9998L7.00659 17.2428ZM17.4926 6.75684L12.2486 11.9998L17.4926 6.75684ZM12.2486 
                        11.9998L7.00659 6.75684L12.2486 11.9998Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
            <div id="img-and-inputs">
                <div id="put-the-img">
                    <img id="img-big-person" src="./assets/img/person.svg" alt="">
                </div>
                <div>
                    <div id="input-fields">
                        <div id="contact-name" class="contact-input-area">
                            <input required type="text" placeholder="Name" id="contact-name-input">
                            <img src="./assets/img/person.png" alt="Name" onclick="pushContactInfo()">
                        </div>
                        <div id="contact-email" class="contact-input-area">
                            <input required type="email" placeholder="E-Mail" id="contact-email-input">
                            <img src="./assets/img/mail.png" alt="E-Mail" onclick="pushContactInfo()">
                        </div>
                        <div id="contact-phone" class="contact-input-area">
                            <input type="tel" placeholder="Phone" id="contact-phone-input">
                            <img src="./assets/img/call.png" alt="Phone" onclick="pushContactInfo()">
                        </div>
                    </div>
            
                    <div id="cancel-and-create-contact-btns">
                        <div id="cancel-contact-btn" onclick="closeContactAddCard()">
                            <p>Cancel</p>
                            <div class="cancel-create-img">
                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path id="change-cancel-svg-color-btn" d="M12.2496 11.9998L17.4926 17.2428M7.00659 17.2428L12.2496 11.9998L7.00659 17.2428ZM17.4926 6.75684L12.2486 11.9998L17.4926 6.75684ZM12.2486 
                                        11.9998L7.00659 6.75684L12.2486 11.9998Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>
                        <div id="create-contact-btn" onclick="pushContactInfo()">
                            <p>Create Task</p>
                            <img class="cancel-create-img" src="./assets/img/check.svg" alt="">
                        </div>
                    </div>
                </div>
            </div>


        </div>

    </div>

    `;
    slideInCard();
}