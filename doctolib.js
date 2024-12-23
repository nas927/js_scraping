var next = null;
function init()
{
        var get_next_a = setInterval(function(){
            next = document.querySelector(".next-link");
            if (next)
            {
                console.log("Trouvé !");
                clearInterval(get_next_a);
                searchPosts();
            }
        }, 1000);
}
init();

// Avoir le bouton suivant
function go_next()
{
    if (next)
    {
        if (!(next.disabled))
        {
            console.log(next);
            console.log("Getting next page...");
            next.click();
            return true;
        }
        else
            console.log("last...");
    }
    return false;
}

// Prendre toutes les annonces
function searchPosts()
{
    var card = document.querySelectorAll(".dl-p-doctor-result-link");

    card = keepImportantObject(card);

    card.forEach(function (c, index) {
        setTimeout(function (){
                var newindow = open(c.href, 'newwin', "width=1000,height=1000");
                newPageInit(newindow);
        }, index * 14000);
    });
    setting_timeout(loop, card.length * 14000);
}

//Garder les objets important pour prendre que les paires et ceux qui ont une class list spécifique
function keepImportantObject(card)
{
    var newArray = [];
    card.forEach(function (c, index){
        if (c.firstChild.classList.contains('Tappable-inactive'))
            newArray.push(c);
    });
    return newArray;
}


/*---------------------------------------------------------------------- */
//Une fois sur la page

function newPageInit(newindow)
{
    setTimeout(function (){
        if (!(searchButtons(newindow)))
            newindow.close();
    }, 2000);
}

function searchSpecificButton(buttons)
{
    var newbut = false;
    buttons.forEach(function (but){
        if (but.innerText == "ENVOYER UN MESSAGE")
        {
            newbut = but;
            return;
        }
    });
    if (newbut)
        return newbut;
    return false;
}

function searchButtons(newindow)
{
    var get_button = setInterval(function(){
        var send_message = document.querySelectorAll(".dl-card span.dl-button-label");
        if (send_message)
        {
            console.log("Card bouton Trouvé !");
            clearInterval(get_button);
            send_message = searchSpecificButton(send_message);
            console.log(send_message);
            if (send_message.innerText)
                open_profile(send_message);
            else
                newindow.close();
        }
    }, 1000);
    return true;
}

// If button found
function open_profile(send_message)
{
    var profile = open(send_message.parentElement.href);
    newPageProfileInit(profile);
}


/* ---------------------------------------------------------------------- */
// On profile

function newPageProfileInit(newindow)
{
    var get_first = setTimeout(function (){
        var send_message = document.querySelectorAll(".dl-card-selectable");
        if (send_message)
        {
            clearTimeout(get_first);

        }
    }, 2000);
}

function clickOnNextStep()
{
    var next = document.querySelector("form button");
    next.click();
}














/*------------------------------------------------------------------------------*/

// loop
function loop()
{
    if (go_next())
        init();
    else
        console.log("finit")
}



/*----------------------------------------------------------------------------*/
// Utils

function setting_timeout(do_thing, ms, ...args)
{
    setTimeout(function (){
        do_thing(...args);
    }, ms);
}

