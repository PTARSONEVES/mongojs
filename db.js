async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:'Strol!ndi!1'@localhost:3306/itacoatiara2024");
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}
