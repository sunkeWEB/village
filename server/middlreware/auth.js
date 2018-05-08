let auth = {
    adduser:{
        name:'yhtj'
    }
};

module.exports = function (token) {
    // let autharr = payload.name.split(',')[2];
    return new Promise((s1,s2)=>{
        console.log('autharr',autharr);
        s1(token.url);
    })
};
