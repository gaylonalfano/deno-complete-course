import { Router } from "https://deno.land/x/oak@v6.0.1/mod.ts";

import * as planets from "./models/planets.ts";

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
  ctx.response.body = planets.getAllPlanets();
});

/* Let's export our router using default since it's the only thing we're */
/* exporting from this module */
export default router;
