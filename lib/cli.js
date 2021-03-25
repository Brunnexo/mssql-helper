#!/usr/bin/env node
var _a, _b, _c, _d;
import { MSSQL } from './index';
var ARGS = process.argv.slice(2);
function testConnection(props) {
    console.log("\u001B[34m%s\u001B[0m", "Testing SQL connection...\nServer: " + props.server + "\nDatabase: " + props.database + "\nUsername: " + props.userName + "\nPassword: " + props.password);
    var test = new MSSQL({
        "server": props.server,
        "authentication": {
            "type": "default",
            "options": {
                "userName": props.userName,
                "password": props.password
            }
        },
        "options": {
            "encrypt": false,
            "database": props.database,
            "enableArithAbort": true,
            "appName": "default",
            "useColumnNames": true
        }
    });
    test.connect()
        .then(function () {
        console.log("\u001B[32m%s\u001B[0m", 'Connected successfully!');
        process.exit(1);
    })
        .catch(function (err) {
        console.log("\u001B[31m%s\u001B[0m", "Connection fail!\n[" + err + "]");
        process.exit(0);
    });
    return;
}
if (ARGS.length > 0) {
    var testArgs = {
        server: '',
        userName: '',
        password: '',
        database: ''
    };
    testArgs.server = ((_a = ARGS.find(function (a) { return /--server=/g.test(a); })) === null || _a === void 0 ? void 0 : _a.replace('--server=', '').replace('"', '').replace("'", '')) || '127.0.0.1';
    testArgs.userName = ((_b = ARGS.find(function (a) { return /--userName=/g.test(a); })) === null || _b === void 0 ? void 0 : _b.replace('--userName=', '').replace('"', '').replace("'", '')) || 'sa';
    testArgs.password = ((_c = ARGS.find(function (a) { return /--password=/g.test(a); })) === null || _c === void 0 ? void 0 : _c.replace('--password=', '').replace('"', '').replace("'", '')) || 'sa';
    testArgs.database = ((_d = ARGS.find(function (a) { return /--database=/g.test(a); })) === null || _d === void 0 ? void 0 : _d.replace('--database=', '').replace('"', '').replace("'", '')) || 'db';
    testConnection(testArgs);
}
