(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,n,t){e.exports=t(38)},19:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),u=t.n(a),r=t(11),c=t.n(r),i=(t(19),t(12)),o=t(2),l=t(3),m=t.n(l),s="/api/persons",f=function(){return m.a.get(s).then(function(e){return e.data})},d=function(e){return m.a.post(s,e).then(function(e){return e.data})},h=function(e,n){return m.a.put("".concat(s,"/").concat(e),n).then(function(e){return e.data})},v=function(e){return m.a.delete("".concat(s,"/").concat(e)).then(function(e){return e.data})},b=function(e){var n=e.persons,t=e.deletePerson;return n.map(function(e){return u.a.createElement("p",{key:e.name},e.name," ",e.number,u.a.createElement(w,{deleteThisPerson:function(){return t(e)}}))})},p=function(e){var n=e.newNameFilter,t=e.handleNewNameFilter;return u.a.createElement("div",null,"rajaa n\xe4ytett\xe4vi\xe4: ",u.a.createElement("input",{value:n,onChange:t}))},E=function(e){var n=e.addPerson,t=e.newName,a=e.newNumber,r=e.handleNameChange,c=e.handleNumberChange;return u.a.createElement("form",{onSubmit:n},u.a.createElement("div",null,"nimi: ",u.a.createElement("input",{value:t,onChange:r,required:!0})),u.a.createElement("div",null,"numero: ",u.a.createElement("input",{value:a,onChange:c,required:!0})),u.a.createElement("div",null,u.a.createElement("button",{type:"submit"},"lis\xe4\xe4")))},w=function(e){var n=e.deleteThisPerson;return u.a.createElement("button",{type:"button",style:{marginLeft:"0.5em"},onClick:n},"poista")},j=function(e){var n=e.message;return null===n?null:u.a.createElement("div",{className:"success"},n)},g=function(e){var n=e.message;return null===n?null:u.a.createElement("div",{className:"error"},n)},N=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],r=n[1],c=Object(a.useState)(""),l=Object(o.a)(c,2),m=l[0],s=l[1],w=Object(a.useState)(""),N=Object(o.a)(w,2),O=N[0],k=N[1],C=Object(a.useState)(""),P=Object(o.a)(C,2),S=P[0],T=P[1],y=Object(a.useState)(null),H=Object(o.a)(y,2),F=H[0],L=H[1],q=Object(a.useState)(null),J=Object(o.a)(q,2),x=J[0],B=J[1];Object(a.useEffect)(function(){f().then(function(e){r(e)})},[]);var D=function(e){var n=t.find(function(n){return n.name===e.name}),a=Object(i.a)({},n,{number:O});h(n.id,a).then(function(e){r(t.map(function(t){return t.id!==n.id?t:e})),L("Henkil\xf6n ".concat(n.name," numero p\xe4ivitettiin")),setTimeout(function(){L(null)},5e3)}).catch(function(a){B("Henkil\xf6 ".concat(e.name," on jo poistettu luettelosta")),setTimeout(function(){B(null)},5e3),r(t.filter(function(e){return e.id!==n.id}))}),s(""),k("")};return u.a.createElement("div",null,u.a.createElement("h1",null,"Puhelinluettelo"),u.a.createElement(j,{message:F}),u.a.createElement(g,{message:x}),u.a.createElement(p,{newNameFilter:S,handleNewNameFilter:function(e){T(e.target.value)}}),u.a.createElement("h2",null,"Lis\xe4\xe4 uusi"),u.a.createElement(E,{addPerson:function(e){e.preventDefault();var n={name:m,number:O};t.find(function(e){return e.name===m})?window.confirm("".concat(n.name," on jo luettelossa. Korvataanko vanha numero uudella?"))&&D(n):d(n).then(function(e){r(t.concat(e)),L("Henkil\xf6 ".concat(e.name," lis\xe4ttiin luetteloon.")),setTimeout(function(){L(null)},5e3),s(""),k("")})},newName:m,newNumber:O,handleNameChange:function(e){s(e.target.value)},handleNumberChange:function(e){k(e.target.value)}}),u.a.createElement("h2",null,"Numerot"),u.a.createElement(b,{persons:t.filter(function(e){return e.name.toLowerCase().includes(S.toLowerCase())}),deletePerson:function(e){window.confirm("Haluatko todella poistaa henkil\xf6n ".concat(e.name,"?"))&&(v(e.id).then(function(){r(t.filter(function(n){return n.id!==e.id})),L("Henkil\xf6 ".concat(e.name," poistettiin luettelosta")),setTimeout(function(){L(null)},5e3)}).catch(function(n){B("Henkil\xf6 ".concat(e.name," on jo poistettu luettelosta")),setTimeout(function(){B(null)},5e3),r(t.filter(function(n){return n.id!==e.id}))}),s(""),k(""))}}))};c.a.render(u.a.createElement(N,null),document.getElementById("root"))}},[[13,1,2]]]);
//# sourceMappingURL=main.f6b579db.chunk.js.map