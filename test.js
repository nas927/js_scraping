import { Client } from "@gradio/client";

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
        {
            console.log(result.data[0]);
            resolve(result.data[0]);
        }
        else
            resolve(false);
    });
}

await bot("hello")
await bot('comment tu vas');
await bot('jai faim !');
await bot("how can i clear you in huggling face");