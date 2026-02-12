const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const PORT = 3000;

const server = http.createServer((req, res) => {

    // GET /post → mostra form
    if (req.method === 'GET' && req.url === '/post') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <body>
                    <form method="POST" action="/post">
                        <input type="text" name="titolo" placeholder="Titolo" required />
                        <button type="submit">Salva</button>
                    </form>
                </body>
            </html>
        `);
    }

    // POST /post → salva su post.json
    else if (req.method === 'POST' && req.url === '/post') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const data = querystring.parse(body);

            fs.writeFileSync(
                path.join(__dirname, 'post.json'),
                JSON.stringify(data, null, 2)
            );

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Salvato');
        });
    }

    else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}/post`);
});
