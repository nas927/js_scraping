var everything = null;
var last_time = 0;
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
    var go_next = document.querySelector("[id$='::next']");
    
    if (isNotDisabled(go_next))
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
    var card = document.querySelectorAll("article[data-qa-id=aditem_container] a");

    card.forEach(function (c, index) {
        setTimeout(function (){
                console.log(window.location.origin + c.href);
                var newindow = open(c.href, 'newwin')
                ClickButton(newindow);
        }, index * 14000);
    });
    if (!last_time)
        setting_timeout(loop, (Object.keys(card).length * 16000));
}

function ClickButton(newindow)
{
    var button = newindow.document.querySelector('button[data-pub-id=adview_button_contact_contact]');
    var get_button = setInterval(function(){
        button = newindow.document.querySelector('button[data-pub-id=adview_button_contact_contact]');
        if (button && button.innerText != "Chargement...")
        {
            clearInterval(get_button);
            setTimeout(function (){
                console.log("clicking");
                button.click();
                typeForm(newindow);
            }, 2000);
        }
    }, 1000);
}

function typeForm(newindow)
{
    var button = newindow.document.querySelector('button[aria-label*=Envoyer]');
    var get_button = setInterval(function(){
        button = newindow.document.querySelector('button[aria-label*=Envoyer]');
        if (button)
        {
            clearInterval(get_button);
            setTimeout(function (){
                var dossiercomplet = newindow.document.querySelectorAll("label:has(span.text-body-1)");
                if (dossiercomplet.length > 1)
                    dossiercomplet[1].click();
                var input = newindow.document.querySelector("textarea[id=body]");
                setNativeValue(input, 'Bonjour, nous sommes un couple composé d\'un informaticien et d\'un cadre de santé. Nous recherchons quelque chose de stable. Nous sommes actuellement au rsa temporairement le temps d\'aboutir à nos ambitions. Nous sommes des personnes sérieuses et honnête nous garantissons toute la coopération nécessaire au bon déroulement de la location dans l\'attente de votre réponse je vous prie d\'agréer mes salutations distinguées. Nous sommes disponible pour en discuter à ce numéro 07 84 72 15 32 et cet email ncamelia.amrane@gmail.com');
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
        last_time = 1;
    init();
}

