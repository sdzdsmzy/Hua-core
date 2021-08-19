const ws = require('nodejs-websocket')
const fs = require('fs')
global.c = 0
function rdm(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// fs.readFile('nodejs\\websocket\\items', function (err, data) {
//     if (err) {
//        return console.error(err);
//     }
//     global.prizearr = data.toString().split("\r\n")
//     no = rdm(0,823)
//     temp = global.prizearr[no]
//     global.prize = temp
//     prise = temp
//     console.log(global.prise + "是他的奖品")
//     console.log("id："+no,"name："+prise)
// });








var server = ws.createServer(function(conn){
    console.log('someone connected!')
    conn.sendText(JSON.stringify({
        "body": {
            "origin": {
                "type": "player"
            },
            "commandLine":"say 初始化完成，欢迎使用HuaCore-v1.0!",
            "version": 1
        },
        "header": {
            "requestId": "19198100-1145-1400-0000-000000000000",
            "messagePurpose": "commandRequest",
            "version": 1,
            "messageType": "commandRequest"
        }
    }))
    conn.on('text',function(msg){
        global.c++
        console.log(msg)
        info = JSON.parse(msg)
        if (info.pc){
            global.pc
            global.pc = conn
            
            
            switch (info.type) {
                case 'cmd':
                    comm(info.content)
                    break;
                case 'tk':
                    say(info.content)
                    break;
                case 'tl':
                    tell(info.target,info.content)
                case 'dy':
                    subs(info.content)
                    break;
                case 'prize':

                    pri(info.content,'111')
                    break;
                default:
                    break;
            }
            
        }else{
            global.mc = conn
            if(global.c >= 3){
                global.pc.sendText(msg)
            }
        }

    })
    conn.on('error',function(err){
        console.log('用户退出或出错')
    })


}).listen(23333)

function comm(str){
    global.mc.sendText(JSON.stringify({
        "body": {
            "origin": {
                "type": "player"
            },
            "commandLine": str,
            "version": 1
        },
        "header": {
            "requestId": "19198100-1145-1400-0000-000000000000",
            "messagePurpose": "commandRequest",
            "version": 1,
            "messageType": "commandRequest"
        }
    }))
}


function say(str){
    global.mc.sendText(JSON.stringify({
        "body": {
            "origin": {
                "type": "player"
            },
            "commandLine":'say '+ str,
            "version": 1
        },
        "header": {
            "requestId": "19198100-1145-1400-0000-000000000000",
            "messagePurpose": "commandRequest",
            "version": 1,
            "messageType": "commandRequest"
        }
    }))
}

function subs(str){
    if (str){
        global.mc.sendText(JSON.stringify({
            "body": {
                "eventName": "PlayerMessage"
            },
            "header": {
                "requestId": "00000000-0000-0000-0000-000000000000",
                "messagePurpose": "subscribe",
                "version": 1,
                "messageType": "commandRequest"
            }
        }))
    }else{
        global.mc.sendText(JSON.stringify({
            "body": {
                "eventName": "PlayerMessage"
            },
            "header": {
                "requestId": "00000000-0000-0000-0000-000000000000",
                "messagePurpose": "unsubscribe",
                "version": 1,
                "messageType": "commandRequest"
            }
        }))
    }
}

// var prnm = fs.readFile('A:\\vscode\\nodejs\\websocket\\items', function (err, data) {
//     if (err) {
//        return console.error(err);
//     }
//     var prizearr = data.toString().split("\r\n")
//     var no = rdm(0,823)
//     var prize = prizearr[no]
//     console.log(prize + "是他的奖品")
//     console.log("id："+no,"name："+prize)
//     return prize;
// });
function pri(name){
    global.mc.sendText(JSON.stringify({
        "body": {
            "origin": {
                "type": "player"
            },
            "commandLine": "give "+name+" "+ prize +" "+rdm(1,64).toString(),
            "version": 1
        },
        "header": {
            "requestId": "19198100-1145-1400-0000-000000000000",
            "messagePurpose": "commandRequest",
            "version": 1,
            "messageType": "commandRequest"
        }
    }))
    fs.readFile('A:\\vscode\\nodejs\\websocket\\items', function (err, data) {
        if (err) {
           return console.error(err);
        }
        var prizearr = data.toString().split("\r\n")
        var no = rdm(0,823)
        var prize = prizearr[no]
        console.log(prize + "是他的奖品")
        console.log("id："+no,"name："+prize)
        global.mc.sendText(JSON.stringify({
            "body": {
                "origin": {
                    "type": "player"
                },
                "commandLine": "give "+name+" "+ prize +" "+rdm(1,64).toString(),
                "version": 1
            },
            "header": {
                "requestId": "19198100-1145-1400-0000-000000000000",
                "messagePurpose": "commandRequest",
                "version": 1,
                "messageType": "commandRequest"
            }
        }))
    })

}

function tell(id,tl){
    global.mc.sendText(JSON.stringify({
        "body": {
            "origin": {
                "type": "player"
            },
            "commandLine":'tell '+id+" "+tl,
            "version": 1
        },
        "header": {
            "requestId": "19198100-1145-1400-0000-000000000000",
            "messagePurpose": "commandRequest",
            "version": 1,
            "messageType": "commandRequest"
        }
    }))
}