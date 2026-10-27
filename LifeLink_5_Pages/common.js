// Shared demo data utilities for all LifeLink pages. Uses localStorage in this browser only.
window.LifeLink = (() => {
  const DONORS_KEY = "lifelink_5pages_donors";
  const REQUESTS_KEY = "lifelink_5pages_requests";
  const seedDonors = [
    {id:"d1",name:"Aarav (Demo)",blood:"O+",city:"Hosur",availability:"Available",contact:"demo-contact-01"},
    {id:"d2",name:"Meera (Demo)",blood:"B+",city:"Hosur",availability:"Available",contact:"demo-contact-02"},
    {id:"d3",name:"Kavin (Demo)",blood:"A+",city:"Krishnagiri",availability:"Available",contact:"demo-contact-03"},
    {id:"d4",name:"Nila (Demo)",blood:"AB+",city:"Bengaluru",availability:"Unavailable",contact:"demo-contact-04"}
  ];
  const seedRequests = [
    {id:"r1",blood:"B+",urgency:"Urgent",hospital:"Demo General Hospital",city:"Hosur",units:2,contact:"demo-requester-01",status:"Open",createdAt:new Date().toISOString()},
    {id:"r2",blood:"O-",urgency:"High",hospital:"Sample Medical Centre",city:"Krishnagiri",units:1,contact:"demo-requester-02",status:"Matching",createdAt:new Date(Date.now()-3600000).toISOString()}
  ];
  const clone = value => JSON.parse(JSON.stringify(value));
  function read(key, fallback) { try { const val=localStorage.getItem(key); return val?JSON.parse(val):clone(fallback); } catch { return clone(fallback); } }
  function saveDonors(items) { localStorage.setItem(DONORS_KEY, JSON.stringify(items)); }
  function saveRequests(items) { localStorage.setItem(REQUESTS_KEY, JSON.stringify(items)); }
  function donors() { return read(DONORS_KEY, seedDonors); }
  function requests() { return read(REQUESTS_KEY, seedRequests); }
  function saveAll(d,r) { saveDonors(d); saveRequests(r); }
  function esc(v) { return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
  function toast(message) { let el=document.getElementById("toast"); if(!el){el=document.createElement("div");el.id="toast";el.className="toast";document.body.appendChild(el);}el.textContent=message;el.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),2600); }
  function stats() { const d=donors(),r=requests(); const dc=document.getElementById("donorCount"),ac=document.getElementById("activeCount"),fc=document.getElementById("fulfilledCount");if(dc)dc.textContent=d.length;if(ac)ac.textContent=r.filter(x=>!["Fulfilled","Closed"].includes(x.status)).length;if(fc)fc.textContent=r.filter(x=>x.status==="Fulfilled").length; }
  return {donors,requests,saveDonors,saveRequests,saveAll,esc,toast,stats,seedDonors:()=>clone(seedDonors),seedRequests:()=>clone(seedRequests)};
})(); 
window.LifeLink.stats();