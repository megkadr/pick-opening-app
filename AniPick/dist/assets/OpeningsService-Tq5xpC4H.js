import{a as e}from"./AxiosClient-DxnD1u3Z.js";async function i(n){return await e.post("/Openings/opening",n)}async function t(n){return(await e.get(`/Openings/openings?year=${n}`)).data}export{i as a,t as g};