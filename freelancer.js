import { Client } from "@gradio/client";
import { chromium } from 'playwright';
import fs from "fs";
import { resolve } from "path";

async function bot(message) {
    const client = await Client.connect("yuntian-deng/ChatGPT");
    const result = await client.predict("/predict", { 		
            inputs: message, 		
            top_p: 0, 		
            temperature: 0, 		
            chat_counter: 3, 		
            chatbot: [], 
    });

    return new Promise ((resolve, reject) => {     
        if (result)
            resolve(result.data[0][result.data[0].length - 1][1]);
        else
            resolve(false);
    });
}

(async () => {
    const browser = await chromium.launch({ headless: false }); // Ouvre le navigateur visible
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Ajouter les cookies à la page
    const cookies = JSON.parse(fs.readFileSync('cookie.json', 'utf-8'));
    await page.context().addCookies(cookies);

    // Ouvre une URL
    await page.goto('https://www.fr.freelancer.com/search/projects?types=hourly,fixed&projectLanguages=en,fr&projectFixedPriceMin=300&projectHourlyRateMin=50&projectSkills=3,9,13,33,38,68,69,95,137,215,219,305,320,323,335,454,913,1031,1088,2658');

    // Récupère le titre de la page
    const title = await page.title();
    console.log('Titre de la page :', title);

    //init
    init(browser, page);
})();

async function init(browser, page)
{
    let button_next = await get_one_element(browser, page, "button[aria-label='Next page']");
    let cards = await get_severeal_elements(browser, page, "a[fltrackingsection=SearchProjectsResultCard]");
    if (cards)
    {
        for (let i = 0; i < cards.length; i++) {
            setTimeout(async () => {
                let card = await cards[i];
                applyJob(card, browser, page);
            }, i * 25000);
        }
        setTimeout(() => {
            loop(browser, page);
        }, cards.length * 25000);
    }
}

async function get_one_element(browser, page, query) {
    let item = await page.locator(query);
    // Crée une promesse pour attendre le bouton
    return new Promise((resolve, reject) => {
        var get_item = setInterval(async function() {
            // Récupère le bouton à chaque intervalle
            item = await page.locator(query);
            
            // Vérifie si le bouton est visible
            if (await item.isVisible()) {
                clearInterval(get_item); 
                resolve(item); // Résout la promesse avec le bouton
            }
            else
                resolve(false);
        }, 2000);

        // Timeout après 12 secondes
        setTimeout(() => {
            clearInterval(get_item);
            resolve(false);
        }, 12000); // 12 secondes
    });
}

async function get_severeal_elements(browser, page, query) {
    let items = await page.locator("css="+query);
    return new Promise((resolve, reject) => {
        var get_items = setInterval(async function() {
            items = await page.locator("css="+query).all();
            
            if (await items) {
                clearInterval(get_items); 
                if (items.length > 0)
                    resolve(items); // Résout la promesse avec le bouton
                else
                    resolve(false);
            }
        }, 2000);

        // Timeout après 12 secondes
        setTimeout(() => {
            clearInterval(get_items);
            resolve(false);
        }, 12000); // 12 secondes
    });
}

async function applyJob(card, browser, page) {
    console.log("apply");
    card.click();
    let textarea = await get_one_element(browser, page, "textarea[id=descriptionTextArea]");
    let response = null;
    let description = await get_one_element(browser, page, "fl-text[ngskiphydration=true] > span[data-size=xsmall]");
    let description_text = null;
    if (description)
        description_text = await description.innerText();
    let place_bid = await get_one_element(browser, page, 'text="Place Bid"');
    if (description_text != null && description_text.length > 0)
        response = await bot("YOU ARE ME Can you answer ONLY in english simply without exceding 1200 characters and without adding additional details like links here is my profile : I'm Nassim Amrane. I am a highly skilled web developer, fluent in multiple languages, with significant experience in WordPress, front-end and back-end development. I have a deep interest in programming and have worked extensively on projects where I personally coded the entire website from scratch, such as Kibyli.com, BLVShop, and KrystalBeauty. These projects reflect my ability to work independently and deliver customized solutions without relying on third-party plugins or themes.  In addition to my technical expertise, I have a strong passion for product design and improving the appearance of HTML and CSS elements. I also have hands-on experience with various tools like GSC Studio for Call of Duty: Black Ops II scripting, and I'm familiar with the use of wxWidgets for compiling DLLs. I have a good understanding of 3D geometry and enjoy integrating complex features, such as parallax effects and dynamic interactions like mouse events in 3D rendering projects.  My professional background includes working with WooCommerce for eCommerce development and utilizing WebDriver with Selenium for automated testing. According to my profile apply to job : " + description_text)
    console.log(textarea);
    if (textarea)
    {
        await page.evaluate((element) => {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, await textarea.elementHandle());
        console.log('okay')
        if (response)
            textarea.fill(response);
        place_bid.click();
        page.goBack();
    }
    else
        page.goBack();
}

async function loop(browser, page)
{
    let button_next = await get_one_element(browser, page, "button[aria-label='Next page']");
    if (button_next)
    {
        button_next.click();
        init(browser, page);
    }
    else
        console.log("finit")
}

async function closeAll(browser) {
    await browser.close();
}