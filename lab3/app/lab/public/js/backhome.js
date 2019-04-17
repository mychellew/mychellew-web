 AFRAME.registerComponent('backhome', {
 
    
   init: function () {
     
      let homeworldelements = document.querySelectorAll(".homeworld");
      let sky = document.querySelector("#sky");
      
      let gobackhome = () => {
      sky.setAttribute("src", "#sky");
      homeworldelements.forEach((homeworldelement) => {
      homeworldelement.setAttribute("visible", true)})
    }

      this.el.addEventListener('click', gobackhome);
        
   }});
  