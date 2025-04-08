import{a as C,S as w,i as n}from"./assets/vendor-f736e62a.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function d(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(t){if(t.ep)return;t.ep=!0;const o=d(t);fetch(t.href,o)}})();async function m(s,e){return await C({url:"https://pixabay.com/api/",params:{key:"16991331-df0a6792d36af314f174a3b15",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e}})}function f(s){return s.hits.map(({webformatURL:d,largeImageURL:l,tags:t,likes:o,views:c,comments:g,downloads:b})=>`
        <li class="card">
            <div class="place-for-image">
                <a href="${l}">
                    <img src="${d}" alt="${t}" class="picture"/>
                </a>
            </div>
            <div class="info-text">
                <div class="description">
                    <span class="bold-text">Likes</span>
                    <span class="info-value">${o}</span>
                </div>
                <div class="description">
                    <span class="bold-text">Views</span>
                    <span class="info-value">${c}</span>
                </div>
                <div class="description">
                    <span class="bold-text">Comments</span>
                    <span class="info-value">${g}</span>
                </div>
                <div class="description">
                    <span class="bold-text">Downloads</span>
                    <span class="info-value">${b}</span>
                </div>
            </div>
        </li>`).join("")}const v=document.querySelector(".form"),r=document.querySelector(".loader");r.style.borderColor="white";r.style.borderBottomColor="transparent";const p=document.querySelector(".gallery"),i=document.querySelector(".buttonMore"),y=new w(".card .place-for-image a",{captionsData:"alt",captionDelay:250});v.addEventListener("submit",L);i.addEventListener("click",S);let a=1,u,h;async function L(s){s.preventDefault(),i.hidden=!0,p.innerHTML="",r.style.borderColor="black",r.style.borderBottomColor="transparent",h=s.currentTarget.elements.inputSearch.value,a=1,m(h,a).then(e=>{if(e.total==0){n.show({title:"Ops.",titleColor:"white",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"white",color:"red",position:"topCenter",timeout:"5000"});return}else i.hidden=!1,p.insertAdjacentHTML("beforeend",f(e.data)),y.refresh(),s.target.reset(),a=a+1,u=Math.floor(e.data.totalHits/15),a==u&&(n.show({titleColor:"white",message:"We're sorry, but you've reached the end of search results.!",messageColor:"white",color:"blue",position:"topCenter",timeout:"5000"}),i.hidden=!0)}).catch(e=>{n.show({title:"Ops.",titleColor:"white",message:e,messageColor:"white",color:"red",position:"topCenter",timeout:"5000"})}).finally(()=>{r.style.borderColor="white",r.style.borderBottomColor="transparent"})}async function S(s){i.hidden=!0,r.style.borderColor="black",r.style.borderBottomColor="transparent",m(h,a).then(e=>{if(console.log(e.data),e.total==0){n.show({title:"Ops.",titleColor:"white",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"white",color:"red",position:"topCenter",timeout:"5000"});return}else i.hidden=!1,p.insertAdjacentHTML("beforeend",f(e.data)),y.refresh(),a=a+1,a>u&&(n.show({titleColor:"white",message:"We're sorry, but you've reached the end of search results.!",messageColor:"white",color:"blue",position:"topCenter",timeout:"5000"}),i.hidden=!0)}).catch(e=>{n.show({title:"Ops.",titleColor:"white",message:e,messageColor:"white",color:"red",position:"topCenter",timeout:"5000"})}).finally(()=>{r.style.borderColor="white",r.style.borderBottomColor="transparent"})}
//# sourceMappingURL=commonHelpers.js.map
