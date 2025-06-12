const xhr=new XMLHttpRequest()

xhr.addEventListener("load",()=>{

   console.log(xhr.response)

})
xhr.open("GET","http://127.0.0.1:5000/products")
xhr.send()