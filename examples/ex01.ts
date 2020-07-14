// ex01.ts 
// deno run --allow-net ex01.ts

import {serve} from "https://deno.land/std/http/server.ts"

const server = serve({port:3000});
console.log('listening on port 3000');

for await (const req of server) {
	const url = req.url;
	req.respond({body:`hello, you visited ${url}`});
}

