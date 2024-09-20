import{g as w,d as _,f as c,i as d,P as H,m as g,a7 as y,a5 as I,b as l,j as T,_ as U,Y as F,c as V,l as Z}from"./Footer-BXoTP08e.js";import{j as e,r as D}from"./index-CcnljIkN.js";import{u as M}from"./useSlot-DNHSQ2P6.js";function Y(o){return _("MuiAlert",o)}const S=w("MuiAlert",["root","action","icon","message","filled","colorSuccess","colorInfo","colorWarning","colorError","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]),q=c(e.jsx("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),G=c(e.jsx("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),J=c(e.jsx("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),K=c(e.jsx("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined"),Q=c(e.jsx("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close"),X=["action","children","className","closeText","color","components","componentsProps","icon","iconMapping","onClose","role","severity","slotProps","slots","variant"],oo=o=>{const{variant:s,color:r,severity:t,classes:a}=o,u={root:["root",`color${g(r||t)}`,`${s}${g(r||t)}`,`${s}`],icon:["icon"],message:["message"],action:["action"]};return Z(u,Y,a)},to=d(H,{name:"MuiAlert",slot:"Root",overridesResolver:(o,s)=>{const{ownerState:r}=o;return[s.root,s[r.variant],s[`${r.variant}${g(r.color||r.severity)}`]]}})(({theme:o})=>{const s=o.palette.mode==="light"?y:I,r=o.palette.mode==="light"?I:y;return l({},o.typography.body2,{backgroundColor:"transparent",display:"flex",padding:"6px 16px",variants:[...Object.entries(o.palette).filter(([,t])=>t.main&&t.light).map(([t])=>({props:{colorSeverity:t,variant:"standard"},style:{color:o.vars?o.vars.palette.Alert[`${t}Color`]:s(o.palette[t].light,.6),backgroundColor:o.vars?o.vars.palette.Alert[`${t}StandardBg`]:r(o.palette[t].light,.9),[`& .${S.icon}`]:o.vars?{color:o.vars.palette.Alert[`${t}IconColor`]}:{color:o.palette[t].main}}})),...Object.entries(o.palette).filter(([,t])=>t.main&&t.light).map(([t])=>({props:{colorSeverity:t,variant:"outlined"},style:{color:o.vars?o.vars.palette.Alert[`${t}Color`]:s(o.palette[t].light,.6),border:`1px solid ${(o.vars||o).palette[t].light}`,[`& .${S.icon}`]:o.vars?{color:o.vars.palette.Alert[`${t}IconColor`]}:{color:o.palette[t].main}}})),...Object.entries(o.palette).filter(([,t])=>t.main&&t.dark).map(([t])=>({props:{colorSeverity:t,variant:"filled"},style:l({fontWeight:o.typography.fontWeightMedium},o.vars?{color:o.vars.palette.Alert[`${t}FilledColor`],backgroundColor:o.vars.palette.Alert[`${t}FilledBg`]}:{backgroundColor:o.palette.mode==="dark"?o.palette[t].dark:o.palette[t].main,color:o.palette.getContrastText(o.palette[t].main)})}))]})}),so=d("div",{name:"MuiAlert",slot:"Icon",overridesResolver:(o,s)=>s.icon})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),eo=d("div",{name:"MuiAlert",slot:"Message",overridesResolver:(o,s)=>s.message})({padding:"8px 0",minWidth:0,overflow:"auto"}),j=d("div",{name:"MuiAlert",slot:"Action",overridesResolver:(o,s)=>s.action})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),z={success:e.jsx(q,{fontSize:"inherit"}),warning:e.jsx(G,{fontSize:"inherit"}),error:e.jsx(J,{fontSize:"inherit"}),info:e.jsx(K,{fontSize:"inherit"})},ao=D.forwardRef(function(s,r){const t=T({props:s,name:"MuiAlert"}),{action:a,children:u,className:$,closeText:v="Close",color:f,components:x={},componentsProps:b={},icon:C,iconMapping:L=z,onClose:A,role:P="alert",severity:p="success",slotProps:h={},slots:R={},variant:O="standard"}=t,k=U(t,X),n=l({},t,{color:f,severity:p,variant:O,colorSeverity:f||p}),i=oo(n),m={slots:l({closeButton:x.CloseButton,closeIcon:x.CloseIcon},R),slotProps:l({},b,h)},[B,E]=M("closeButton",{elementType:F,externalForwardedProps:m,ownerState:n}),[W,N]=M("closeIcon",{elementType:Q,externalForwardedProps:m,ownerState:n});return e.jsxs(to,l({role:P,elevation:0,ownerState:n,className:V(i.root,$),ref:r},k,{children:[C!==!1?e.jsx(so,{ownerState:n,className:i.icon,children:C||L[p]||z[p]}):null,e.jsx(eo,{ownerState:n,className:i.message,children:u}),a!=null?e.jsx(j,{ownerState:n,className:i.action,children:a}):null,a==null&&A?e.jsx(j,{ownerState:n,className:i.action,children:e.jsx(B,l({size:"small","aria-label":v,title:v,color:"inherit",onClick:A},E,{children:e.jsx(W,l({fontSize:"small"},N))}))}):null]}))});export{ao as A};
