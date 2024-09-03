const database = {};

function addData(id, data){
    database[id] = data;
}

function getData(id){
    return database[id];
}

function removeData(id){
    delete database[id];
}

module.exports = {addData, getData, removeData};