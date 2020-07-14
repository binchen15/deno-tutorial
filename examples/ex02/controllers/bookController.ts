import {Context} from "https://deno.land/x/abc@v1/mod.ts";
import {Book} from "../models/book.ts"
import { v4 } from "https://deno.land/std/uuid/mod.ts";

let books: Book[] = [
	{ id: '1', title: 'name of the wind', author: 'patrick rothfuss', pages: 500 },
  { id: '2', title: 'the way of kings', author: 'brandon sanderson', pages: 400 },
  { id: '3', title: 'good omens', author: 'terry pratchet', pages: 300 },
]

export const get_all_books = (ctx: Context)=>{
	return ctx.json(books, 200);
}

export const get_a_book = (ctx: Context)=>{
	const {id} = ctx.params;
	const book = books.find((b: Book)=> b.id == id);
	if (book){ 
		return ctx.json(book, 200);
	} else {
		return ctx.string("no such book", 404)
	}
} 

export const create_a_book = async (ctx: Context)=>{
	const {title, author, pages} = JSON.parse(await ctx.body()); 
	//const {title, author, pages} = await ctx.body(); // this fail
	if (title) {
		const id = v4.generate();
		const book = {id, title, author, pages}
		books.push(book);
		console.log('creating a new book....', book);
		return ctx.json(book, 201);
	} 
	console.log("something wrong!");
	return ctx.string("wrong input")
}


export const delete_a_book = (ctx: Context) => {
	const { id } = ctx.params;
	const book = books.find( (b:Book) => b.id == id);
	if (book) {
		books = books.filter((b:Book) => b.id != book.id)
		return ctx.json(book, 200);
	}
	return ctx.string("no such book", 404)
}
