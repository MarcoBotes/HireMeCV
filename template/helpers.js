const jsreport = require('jsreport-proxy')

function print(object){
    return JSON.stringify(object);
}

async function getAsset(assetName) {
    try{
        return await jsreport.assets.read(`Assets/${assetName}`);
    }catch(ex){
        return "";
    }
}

async function asyncEach(data, opts) {
    let r = ''
    let realData = await jsreport.templatingEngines.waitForAsyncHelper(data)
    for (let item of realData) {
        r += opts.fn(item)
    }

    return r
}

async function getPageContent(root){
    const devDataString = await jsreport.assets.read(`Assets/devData.json`);

    return root?.showDevPage
    ? [
        root,
        JSON.parse(devDataString)
    ]
    : [
        root
    ]
}

function coalesce(...args) {
    return args.find(value => value != null);
}

function add(a, b) {
    console.warn(a, b)
    return a + b;
}

function getTimeline(data) {
    if (data?.start && data?.end) return data;
    return null;
}