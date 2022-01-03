import http from 'k6/http';
import {sleep} from 'k6';

export default function () {
    const url = 'http://192.168.0.26:3000/messages';

    const timestamp = new Date().getTime().toString();
    const msg = `message at ${timestamp}`;

    const payload = JSON.stringify({
        "message" : msg
    });

    const params = {
        headers: {
          'Content-Type': 'application/json',
        },
    };
    
    http.post(url, payload, params);
}