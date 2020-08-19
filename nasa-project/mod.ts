import { Application } from "https://deno.land/x/oak@v6.0.1/mod.ts";

const app = new Application();
const PORT = 8000;

/* Add a logging middleware */
app.use(async (ctx, next) => {
  await next();
  /* We now have access to the response.headers from downstream middleware */
  const time = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} ${time}`);
});

/* Measure time it takes to respond to a request */
app.use(async (ctx, next) => {
  const start = Date.now();
  /* In between these timestamps we use the power of next() */
  /* We're calling downstream MW after we start timer and once the downstream */
  /* middleware completes, we measure the delta. */
  await next();
  const delta = Date.now() - start;
  /* Let's store this delta inside the response.headers so we can extract for logging */
  /* Need to convert to template string since delta: number */
  ctx.response.headers.set("X-Response-Time", `${delta}ms`);
});

/* Register middleware functions executed for each request */
app.use(async (ctx, next) => {
  /* Specify what to send back to the incoming HTTP request */
  ctx.response.body = `
    {___     {__      {_         {__ __        {_       
    {_ {__   {__     {_ __     {__    {__     {_ __     
    {__ {__  {__    {_  {__     {__          {_  {__    
    {__  {__ {__   {__   {__      {__       {__   {__   
    {__   {_ {__  {______ {__        {__   {______ {__  
    {__    {_ __ {__       {__ {__    {__ {__       {__ 
    {__      {__{__         {__  {__ __  {__         {__
                    Mission Control API;
  `;
  await next();
});

/* Let's specify what to execute if ran as standalone module */
if (import.meta.main) {
  /* Let's get our app server started and listening to specified port */
  /* Call await because app.listen is going to be an async function */
  await app.listen({
    port: PORT,
  });
}
