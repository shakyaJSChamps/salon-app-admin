import{u as i,j as l}from"./index-DvAQHZBz.js";const d=({options:t,selectedValue:r,handleChange:s})=>{const o=i(),u=e=>{var n;const a=(n=t.find(c=>c.value===e))==null?void 0:n.route;a&&o(a)};return l.jsx("select",{value:r,onChange:e=>{s(e),u(e.target.value)},style:{border:"none",outline:"none"},children:t.map(e=>l.jsx("option",{value:e.value,children:e.label},e.value))})};export{d as S};
