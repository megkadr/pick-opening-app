import{_ as s,aa as h,ab as v,b as n,p as j,ac as k}from"./Footer-DPEio_8Y.js";const E=["className","elementType","ownerState","externalForwardedProps","getSlotOwnerState","internalForwardedProps"],L=["component","slots","slotProps"],N=["component"];function W(e,o){const{className:x,elementType:_,ownerState:p,externalForwardedProps:l,getSlotOwnerState:a,internalForwardedProps:d}=o,F=s(o,E),{component:c,slots:t={[e]:void 0},slotProps:O={[e]:void 0}}=l,g=s(l,L),P=t[e]||_,r=h(O[e],p),i=v(n({className:x},F,{externalForwardedProps:e==="root"?g:void 0,externalSlotProps:r})),{props:{component:u},internalRef:y}=i,S=s(i.props,N),C=j(y,r==null?void 0:r.ref,o.ref),f=a?a(S):{},b=n({},p,f),w=e==="root"?u||c:u,m=k(P,n({},e==="root"&&!c&&!t[e]&&d,e!=="root"&&!t[e]&&d,S,w&&{as:w},{ref:C}),b);return Object.keys(f).forEach(T=>{delete m[T]}),[P,m]}export{W as u};