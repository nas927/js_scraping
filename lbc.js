var everything = null;
function init()
{
    var get_next_a = setInterval(function(){
        var everything = document.querySelectorAll("a[data-qa-id=aditem_container]");
        if (everything)
        {
            console.log("Trouvé !")
            clearInterval(get_next_a);
            searchPosts();
        }
    }, 1000);
}
init();

// Avoir le bouton suivant
function go_next()
{
    var go_next = document.getElementById("pagination::r1d::next");
    
    if (go_next.innerText == "Suivant" && isNotDisabled(go_next))
    {
        console.log(go_next);
        console.log("Getting next page...");
        go_next.click();
        return true;
    }
    else
        console.log("fini");
    return false;
}

// Prendre toutes les annonces
function searchPosts()
{
    var card = document.querySelectorAll("a[data-qa-id=aditem_container]");

    card.forEach(function (c, index) {
        setTimeout(function (){
                console.log(window.location.origin + c.href);
                var newindow = open(c.href, 'newwin', "width=1000,height=1000")
                ClickButton(newindow);
        }, index * 14000);
    });
    setting_timeout(loop, (Object.keys(card).length * 16000));
}

function ClickButton(newindow)
{
    var button = newindow.document.querySelectorAll('button[data-test-id=contact-button]');
    var get_button = setInterval(function(){
        button = newindow.document.querySelectorAll('button[data-test-id=contact-button]');
        if (button && button[0].innerText != "Chargement...")
        {
            clearInterval(get_button);
            setTimeout(function (){
                console.log("clicking");
                button[0].click();
                typeForm(newindow);
            }, 2000);
        }
    }, 1000);
}

function typeForm(newindow)
{
    var button = newindow.document.querySelector('button[aria-label=Envoyer]');
    var get_button = setInterval(function(){
        button = newindow.document.querySelector('button[aria-label=Envoyer]');
        if (button)
        {
            clearInterval(get_button);
            setTimeout(function (){
                var input = newindow.document.querySelector("textarea[id=body]");
                setNativeValue(input, 'Bonjour, je suis intéressé par votre bien à louer au plus tôt nous serons 2 voire 3. Vous pouvez trouver mon dossier sur mon profile merci d\'avance');
                input.dispatchEvent(new Event('input', { bubbles: true }));
                sendForm(newindow, button);
            }, 2000);
        }
    }, 1000);
}

function sendForm(newindow, button)
{
    setTimeout(function (){
        console.log("Envoie...");
        button.click();
        close_window(newindow);
    }, 2000);
}

function close_window(newindow)
{
    // scrollto = newindow.document.getElementById("centralContactForm");
    // scrollto.scrollIntoView();
    setTimeout(function (){
        newindow.close();
    }, 4000);
}


/* Utils */

function isNotDisabled(element) {
    return !element.hasAttribute('disabled');
}

function setting_timeout(do_thing, ms, ...args)
{
    setTimeout(function (){
        do_thing(...args);
    }, ms);
}

// Bypass react input or textarea
function setNativeValue(element, value) {
    const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
    const prototype = Object.getPrototypeOf(element);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;
    
    if (valueSetter && valueSetter !== prototypeValueSetter) {
        prototypeValueSetter.call(element, value);
    } else {
        valueSetter.call(element, value);
    }
}

function loop()
{
    if (go_next())
        init();
}