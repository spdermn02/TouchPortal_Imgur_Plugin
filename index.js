const fetch = require('node-fetch');
const fs = require('fs');
const FormData = require('form-data');
const TPClient = new (require('touchportal-api').Client)();

const pluginId = 'TouchPortal_Imgur';

// Future state - decorators.. if they work
// @SETTING({type:'text',default:'c4edd0d87281319'})
const CLIENT_ID_KEY='Imgur Client Id';
let settings = {
    [CLIENT_ID_KEY] : 'c4edd0d87281319'
};
const imgur = 'https://api.imgur.com/3/';

const uploadImage = (base64image) => {
    const form = new FormData();
    form.append('image',base64image);
    fetch(imgur+"/image",{ 
        method: 'POST', 
        body: form,
        headers: { 
            'Authorization': `Client-ID ${settings[CLIENT_ID_KEY]}`  
        }
    })
    .then(res => res.json())
    .then(json => {
        logIt('DEBUG',JSON.stringify(json));
        const imageUrl = json.data.link;
        TPClient.stateUpdate('last_imgur_url',imageUrl);
    })
    .catch( reason => {
        logIt('ERROR',`Post to imur failed ${reason}`)
    })
}

const processImageUpload = (tpmessage) => {
    const filePath = tpmessage.data[0].value;
    fs.readFile(filePath, (err,data) => {
        if( err ) {
            logIt('ERROR',`attempting to read ${filePath} failed with: ${err}`);
            return;
        }
        const base64image = data.toString('base64');
        uploadImage(base64image);
    })
}

TPClient.on("Action", (message,hold) => {
    console.log(pluginId, ": DEBUG : ACTION ", JSON.stringify(message), "hold", hold);
    switch(message.actionId) {
        case 'imgur_upload_image':
            processImageUpload(message);
            break;
        default:
            logIt('WARN',`Unknown action of ${message.actionId}`);
    }
});

TPClient.on("Settings",(data) => {
    logIt('DEBUG',JSON.stringify(data));
    if( data ) {
        data.forEach( (setting) => {
          let key = Object.keys(setting)[0];
          if( settings[key] === setting[key] ) return;
          settings[key] = setting[key];
        });
    }
});

TPClient.on("Info", (data) => {
    //TP Is connected now
    logIt('DEBUG','We are connected, received Info message');
});

function logIt() {
    var curTime = new Date().toISOString();
    var message = [...arguments];
    var type = message.shift();
    console.log(curTime,":",pluginId,":"+type+":",message.join(" "));
}
    
TPClient.connect({ pluginId });