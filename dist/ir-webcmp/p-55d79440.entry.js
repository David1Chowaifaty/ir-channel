import{r as n,c as o,h as i}from"./p-c8e6073c.js";const s=".dropdown-menu.sc-ir-dropdown{position:absolute !important;top:100%;right:0;z-index:1000;display:none}.dropdown.nav-item.show.sc-ir-dropdown .dropdown-menu.sc-ir-dropdown{display:block}";const t=s;const a=class{constructor(i){n(this,i);this.dropdownItemCLicked=o(this,"dropdownItemCLicked",7);this.data=null;this.object=null;this.show=false}render(){let n=null;if(this.data!==null){n=i("li",{class:this.show?"dropdown nav-item show":"dropdown nav-item","data-menu":"dropdown"},i("a",{class:"dropdown-toggle nav-link",onClick:()=>{this.show=!this.show},"data-toggle":"dropdown"},i("ir-icon",{icon:this.data.icon}),i("span",{"data-i18n":"Dashboard",class:"text-primary"},this.data.name)),i("ul",{class:this.show?"dropdown-menu show":"dropdown-menu"},this.data.children.map((n=>i("li",{"data-menu":""},i("a",{class:"dropdown-item","data-toggle":"",onClick:()=>{this.dropdownItemCLicked.emit({name:n.name,object:this.object});this.show=false}},i("ir-icon",{icon:n.icon}),i("span",{"data-i18n":n.name},n.name)))))))}return i("ul",{class:"nav navbar-nav",id:"main-menu-navigation","data-menu":"menu-navigation"},n)}};a.style=t;export{a as ir_dropdown};
//# sourceMappingURL=p-55d79440.entry.js.map