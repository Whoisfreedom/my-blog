const Koa = require('koa');
const app = new Koa();

const one = async (ctx, next) => {
	console.log('>> one');
    next();
    console.log('<< one');
}

const two = async (ctx, next) => {
	console.log('>> two');
    next();
    console.log('<< two');
}

const three = async (ctx, next) => {
	console.log('>> three');
    next();
    console.log('<< three');
}

const four = async (ctx, next) => {
	console.log('>> four');
    next();
    console.log('<< four');
}

app.use(one)
app.use(three)
app.use(two)
app.use(four)

app.listen(3000);