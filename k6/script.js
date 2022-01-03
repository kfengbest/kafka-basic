import http from 'k6/http';
import {sleep} from 'k6';

export default function () {
    const url = 'http://192.168.0.26:3000/messages';

    const timestamp = new Date().getTime().toString();
    let msg = `message at ${timestamp}`;

    let payload = JSON.stringify({
        "message" : msg
    });

    const params = {
        headers: {
          'Content-Type': 'application/json',
        },
    };
    
    for(let i = 1; i < 10000; i++) {
        const timestamp = new Date().getTime().toString();
        let msg = `message at ${timestamp} No ${i}`;
    
        payload = JSON.stringify({
            "message" : msg
        });

        http.post(url, payload, params);
        sleep(0.1);

        console.log(payload);
    }
 
}