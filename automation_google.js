// rechercher bouton de connexion
(function () {
    let firstButton = document.getElementById("gksS1d");
    const finding = setInterval(function () {
        if (firstButton)
        {
            firstButton.click();
            console.log("bouton 1 clické !");
            clearInterval(finding);
        }
        else 
            firstButton = document.getElementById("gksS1d");
    }, 2000);
    setTimeout(function (){
        if (finding)
            clearInterval(finding);
    }, 15000);
})();

// rechercher bouton donner son avis
(function () {
    let review = document.getElementById("wrl");
    const finding = setInterval(function () {
        if (review)
        {
            review.click();
            console.log("bouton review clické !");
            setTimeout(() => {
                stars();
            }, 3000);
            clearInterval(finding);
        }
        else 
            review = document.getElementById("wrl");
    }, 2000);
    setTimeout(function (){
        if (finding)
            clearInterval(finding);
    }, 15000);
})();

function stars(){
    let star = document.querySelector("iframe").contentWindow.document.querySelector("div[data-rating='5']");
    const finding = setInterval(function () {
        if (star)
        {
            star.click();
            console.log("bouton star clické !");
            setTimeout(() => {
                document.querySelector("iframe").contentWindow.document.getElementById("c2").focus();
                publish(document.querySelector("iframe").contentWindow);
            }, 3000);
            clearInterval(finding);
        }
        else 
        {
            star = document.querySelector("iframe").contentWindow.document.querySelector("div[data-rating='5']");
            console.log(star);
        }
    }, 2000);
    setTimeout(function (){
        if (finding)
            clearInterval(finding);
    }, 15000);
}

function publish(iframe) {
    let publishButton = iframe.document.querySelector("button[jsname='IJM3w']");
    const finding = setInterval(function () {
        if (publishButton)
        {
            publishButton.click();
            console.log("bouton publish clické !");
            clearInterval(finding);
        }
        else 
            publishButton = iframe.document.querySelector("button[jsname='IJM3w']");;
    }, 2000);
    setTimeout(function (){
        if (finding)
            clearInterval(finding);
    }, 15000);
};

function focusOnTextArea(textarea){
    if (textarea) {
        try {
            // Method 1: createTextRange
            const range = textarea.createTextRange();
            range.collapse(true);
            range.moveEnd('character', 0);
            range.moveStart('character', 0);
            range.select();
            
            // Method 2: setSelectionRange as fallback
            textarea.setSelectionRange(0, 0);
            
            console.log("textarea focused!");
        } catch(e) {
            console.log("Focus error:", e);
        }
    }
}

