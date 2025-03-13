setTimeout(function (){
    let element = document.evaluate("/html/body/div[2]/div/main/section[1]/div/div[2]/div[2]/a", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (element)
        element.click();
}, 3000);

// Avoir tous les boutons pour trouver 
// le bouton Suivant
var everything = null;
var last_time = 0;
function init()
{
    var get_next_a = setInterval(function(){
        everything = document.querySelectorAll("a[kind=primary]");
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
    var next = document.querySelector("a[data-testid='gsl.uilib.Paging.nextButton']");
    console.log(every);
    console.log("Getting next page...");
    every.click();
    if (next)
        return true;
    return false;
}

// Prendre toutes les annonces
function searchPosts()
{
    var card = document.querySelectorAll("a[data-testId='sl.explore.coveringLink']");

    card.forEach(function (c, index) {
        setTimeout(function (){
                var newindow = open(c.href, 'newwin', "width=1000,height=1000")
                sendForm(newindow);
        }, index * 14000);
    });
    if (!last_time)
        setting_timeout(loop, (Object.keys(card).length * 14000));
}

// Envoyer le formulaire sur la nouvelle page
function sendForm(newindow)
{
    var input = newindow.document.querySelector('input[name=telephone]');
    var get_tel = setInterval(function(){
        input = newindow.document.querySelector('input[name=telephone]');
        if (everything)
        {
            console.log("input trouvé !");
            setNativeValue(input, '0649778431');
            input.dispatchEvent(new Event('input', { bubbles: true }));
            setting_timeout(close_window, 1000, newindow);
            clearInterval(get_tel);
        }
    }, 1000);
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

function setting_timeout(do_thing, ms, ...args)
{
    setTimeout(function (){
        do_thing(...args);
    }, ms);
}

function close_window(newindow)
{
    scrollto = newindow.document.getElementById("centralContactForm");
    scrollto.scrollIntoView();
    var send = newindow.document.querySelector("button[data-test=submit-button]");
    send.click();
    setTimeout(function (){
        newindow.close();
    }, 4000);
}

function loop()
{
    if (!go_next())
    {
        last_time = 1;
        console.log("Dernière page");
    }
    init();
}