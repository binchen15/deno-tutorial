
import {Application, Context} from "https://deno.land/x/abc@v1/mod.ts";
import {get_all_books, create_a_book, delete_a_book, get_a_book} from "./controllers/bookController.ts"

const app = new Application();

app.static("/", "./public");


// routing
app.get("/", async (ctx: Context)=>{
	await ctx.file("./public/index.html")
})

app.get("/books", get_all_books)
	.get("/books/:id", get_a_book )
	.post("/books", create_a_book )
	.delete("/books/:id", delete_a_book);

app.start({port: 3000})
