import{f as e}from"./index-CcnljIkN.js";async function t(n){return await e.post("/Openings/opening",n)}async function i(n){return(await e.get(`/Openings/openings?year=${n}`)).data}async function o(){return(await e.get("/Openings/allOpenings")).data}export{t as a,o as b,i as g};
