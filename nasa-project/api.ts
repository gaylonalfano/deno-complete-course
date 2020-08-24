import { Router } from "https://deno.land/x/oak@v6.0.1/mod.ts";

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

/* Let's export our router using default since it's the only thing we're */
/* exporting from this module */
export default router;
