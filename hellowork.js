function find_more()
{
    let next;
    next = document.getElementById("plusReco");
    if (next)
    {
        console.log("Bouton voir plus trouvé click...");
        next.click();
    }
}

function searchPosts(start)
{
    let job = document.querySelectorAll("li.content a");
    let end = Object.keys(job).length

    for (let i = start; i < end; i++)
    {
        setTimeout(() => {
            applyJob(job[i]);
            console.log("En train de postuler...");
            console.log("page n°", (i + 1).toString());
        }, i * 14000);
    }
    setTimeout(() => {
        console.log("Relance...");
        doAll(start + 10);
    }, (start + 10) * 14000);
}

function applyJob(job) {
    let newwindow = open(job.href);

    let applyButton = null;
    let getApplyButton = null;
    setTimeout(() => {
        console.log(newwindow.document);
        let scrollto = newwindow.document.getElementById("postuler");
        scrollto.scrollIntoView();
    
        let getApplyButton = setInterval(() => {
            applyButton = newwindow.document.querySelector("button[formid='apply-form']");
            if (applyButton != null)
            {
                applyButton.click();
                console.log("Candidaté !");
                setTimeout(() => {
                    newwindow.close();
                }, 2000);
                clearInterval(getApplyButton);
            }
        }, 2000);
    }, 2000);

    setTimeout(() => {
        if (applyButton == null && getApplyButton && newwindow)
            clearInterval(getApplyButton);
            console.log("pas de bouton !")
            newwindow.close();
    }, 9000);
}

function doAll (start) {
    find_more();
    searchPosts(start);
}

doAll(0);
