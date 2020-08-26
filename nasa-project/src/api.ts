import { Router } from "./deps.ts";

import * as planets from "./models/planets.ts";
import * as launches from "./models/launches.ts";

const router = new Router();

/* Let's have our ASCII art show up on the root path ("/") */
router.get("/", (ctx) => {
  /* This is our path operation function so let's fulfil the response */
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
});

router.get("/planets", (ctx) => {
  // Oak's helper function for throwing errors
  /* ctx.throw(401, "Sorry, planets aren't available!"); */
  // Vanilla JS method for throwing en error
  /* throw new Error("Sample error from /planets endpoint."); */
  ctx.response.body = planets.getAllPlanets();
});

router.get("/launches", (ctx) => {
  ctx.response.body = launches.getAllLaunches();
});

router.get("/launches/:id", (ctx) => {
  // Use optional chaining '?' in case there are no params on ctx object
  // Returns undefined if params doesn't exist
  if (ctx.params?.id) {
    // To be extra safe let's assign to a variable
    // Return just the single launch and set to response.body
    // All params are passed as strings so need to convert to number
    // because flightNumber: number type.
    const launchesList = launches.getOneLaunch(Number(ctx.params.id));
    if (launchesList) {
      ctx.response.body = launchesList;
    } else {
      ctx.throw(400, "Launch with that ID doesn't exist.");
    }
  }
});

router.delete("/launches/:id", (ctx) => {
  // An ID must be sent over otherwise it fails. Let's check params exist
  if (ctx.params?.id) {
    // Access our launches model and delete the corresponding launch ID
    // Technically we're only setting success and upcoming to false
    const result = launches.removeOneLaunch(Number(ctx.params.id));
    ctx.response.body = { success: result };
  } else {
    ctx.throw(400, "Launch with that ID doesn't exist.");
  }
});

router.post("/launches", async (ctx) => {
  // Create a new launch
  // How to store it?? Do I define an interface or an empty object?
  // will the created launch details be in the request body?
  // TURNS OUT I WAS WRONG! Let's get the body from the request
  // Thankfully Oak has a handy body() method to auto-parse the content
  // We now have a valid JS object to work with.
  // Need to specify the type for incoming request.body otherwise error:
  const result = ctx.request.body();
  const data: launches.Launch = await result.value;

  // Now with a valid JS object we're going to want to call a function
  // on our launches model (from launches.ts). We'll call it addOneLaunch()
  // which takes the new launch object retrieved from body.value property
  launches.addOneLaunch(data);

  // Let's send the client a response if no errors were thrown up to this point.
  ctx.response.body = { success: true };
  ctx.response.status = 201;
});

/* Let's export our router using default since it's the only thing we're */
/* exporting from this module */
export default router;
