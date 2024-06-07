import{R as p,r as D,j as n,Y as H,q as J,C as F,bw as Q,bx as B}from"./index-DvAQHZBz.js";var _=function(r){return typeof r=="object"&&r!==null},W=function(r){var h=r.value,v=h===void 0?"":h,g=r.numInputs,l=g===void 0?4:g,w=r.onChange,u=r.onPaste,f=r.renderInput,m=r.shouldAutoFocus,O=m===void 0?!1:m,R=r.inputType,S=R===void 0?"text":R,k=r.renderSeparator,y=r.placeholder,x=r.containerStyle,j=r.inputStyle,T=r.skipDefaultStyles,K=T===void 0?!1:T,V=p.useState(0),o=V[0],C=V[1],d=p.useRef([]),N=function(){return v?v.toString().split(""):[]},A=S==="number"||S==="tel";p.useEffect(function(){d.current=d.current.slice(0,l)},[l]),p.useEffect(function(){var e;O&&((e=d.current[0])===null||e===void 0||e.focus())},[O]);var L=function(){if(typeof y=="string"){if(y.length===l)return y;y.length>0&&console.error("Length of the placeholder should be equal to the number of inputs.")}},E=function(e){var t=A?!isNaN(Number(e)):typeof e=="string";return t&&e.trim().length===1},M=function(e){var t=e.target.value;E(t)&&(b(t),c(o+1))},q=function(e){var t=e.nativeEvent,a=e.target.value;if(!E(a)){if(a.length===l){var s=a.split("").some(function(i){return!E(i)});s||(P(a.split("")),c(l-1))}t.data===null&&t.inputType==="deleteContentBackward"&&(e.preventDefault(),b(""),c(o-1)),e.target.value=""}},Y=function(e){return function(t){C(t),e.target.select()}},U=function(){C(o-1)},$=function(e){var t=N();[e.code,e.key].includes("Backspace")?(e.preventDefault(),b(""),c(o-1)):e.code==="Delete"?(e.preventDefault(),b("")):e.code==="ArrowLeft"?(e.preventDefault(),c(o-1)):e.code==="ArrowRight"||e.key===t[o]?(e.preventDefault(),c(o+1)):(e.code==="Spacebar"||e.code==="Space"||e.code==="ArrowUp"||e.code==="ArrowDown")&&e.preventDefault()},c=function(e){var t,a,s=Math.max(Math.min(l-1,e),0);d.current[s]&&((t=d.current[s])===null||t===void 0||t.focus(),(a=d.current[s])===null||a===void 0||a.select(),C(s))},b=function(e){var t=N();t[o]=e[0],P(t)},P=function(e){var t=e.join("");w(t)},z=function(e){var t;e.preventDefault();var a=N(),s=o,i=e.clipboardData.getData("text/plain").slice(0,l-o).split("");if(!(A&&i.some(function(G){return isNaN(Number(G))}))){for(var I=0;I<l;++I)I>=o&&i.length>0&&(a[I]=(t=i.shift())!==null&&t!==void 0?t:"",s++);c(s),P(a)}};return p.createElement("div",{style:Object.assign({display:"flex",alignItems:"center"},_(x)&&x),className:typeof x=="string"?x:void 0,onPaste:u},Array.from({length:l},function(e,t){return t}).map(function(e){var t,a,s;return p.createElement(p.Fragment,{key:e},f({value:(t=N()[e])!==null&&t!==void 0?t:"",placeholder:(s=(a=L())===null||a===void 0?void 0:a[e])!==null&&s!==void 0?s:void 0,ref:function(i){return d.current[e]=i},onChange:M,onFocus:function(i){return Y(i)(e)},onBlur:U,onKeyDown:$,onPaste:z,autoComplete:"off","aria-label":"Please enter OTP character ".concat(e+1),style:Object.assign(K?{}:{width:"1em",textAlign:"center"},_(j)?j:{}),className:typeof j=="string"?j:void 0,type:S,inputMode:A?"numeric":"text",onInput:q},e),e<l-1&&(typeof k=="function"?k(e):k))}))};function Z(){const[r,h]=D.useState(""),[v,g]=D.useState(30),l=u=>{h(u)};D.useEffect(()=>{const u=setInterval(()=>{g(f=>f>0?f-1:0)},1e3);return()=>clearInterval(u)},[]),console.log("Rendering with OTP:",r);const w=(u,f)=>D.createElement("input",{...u,key:f,autoFocus:f===0,className:"input-otp",pattern:"[0-9]*",onKeyDown:m=>{/^\d$/.test(m.key)||m.preventDefault()}});return n.jsxs(n.Fragment,{children:[n.jsx(H,{className:"p-0",children:n.jsxs(J,{className:" m-0 p-0",children:[n.jsx(F,{sm:8,className:"p-0 mt-4",children:n.jsx("img",{className:"d-logo",src:Q,type:"d-logo.png",alt:"stylrax-logo"})}),n.jsx(F,{sm:4,className:"p-0 d-flex justify-content-center align-items-center mt-4",children:n.jsx("h6",{className:"sign-account back-sign",children:n.jsx(B,{to:"/login",className:"link-style",children:"Back to Sign In"})})}),n.jsx(F,{className:"p-0 mt-4",children:n.jsx("h2",{className:"for-password",children:"Verification"})})]})}),n.jsx("div",{className:"main-form d-flex justify-content-center align-items-center",children:n.jsxs("form",{className:"form  w-100",children:[n.jsxs("label",{className:"otp-input mt-3 m-auto",children:["Enter the 4 digit code that is send on your ",n.jsx("br",{}),"registered email address.",n.jsx("br",{})]}),n.jsx("div",{className:"otp-box d-flex justify-content-center  my-3",children:n.jsx(W,{value:r,onChange:l,numInputs:4,separator:n.jsx("span",{children:"-"}),isInputNum:!0,shouldAutoFocus:!0,renderInput:w})}),n.jsxs("h6",{className:"v-timer text-center mt-2 text-danger",children:["00:",v]}),n.jsx("div",{className:"d-flex justify-content-center",children:n.jsx("button",{className:"forget_btn ",type:"button",children:n.jsx(B,{className:"continue-link link-style",to:"/new-password",children:"VERIFY"})})}),n.jsx("h5",{className:"resend-text mt-3",children:"If you didn’t receive a code!"}),n.jsx("h6",{className:"resend-otp text-center",children:"Resend"})]})})]})}export{Z as default};
