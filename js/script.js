const listBoissonDOM = document.querySelector('#userListBoisson')


const boissonList = []


function showBoissonCardListInDOM(){
    listBoissonDOM.innerHTML = ""
    boissonList.forEach((Boisson,index) =>{
        console.log("boissonList[index] : ",boissonList[index])
        const boissonCard = document.createElement('div')
        boissonCard.classList.add('boisson')
        boissonCard.innerHTML = `
        <img src="image/${Boisson.boisson}.jpg">
        <div class="info">
            <div class="text">
                <p>${Boisson.description()}.</p>
                <p class="degrée">Degrée d'alcool: ${Boisson.degréalcool}°</p>
                <p class="achat">Prix Achat HT: ${Boisson.prixAchat}€</p>
                <input class="change1">
                <p class="vente">Prix Vente HT: ${Boisson.prixVente}€</p>
                <input class="change2">
                <p class="marge">Marge HT: ${Boisson.marge} €</p>
                <p class="prixttc">Prix de vente TTC: ${Boisson.prixTtc} €</p>
                <p class="quantity">Quantité dans le stock: ${Boisson.quantity}</p>
            </div>
            <div class="btnsupp">
                <div class=btn2>
                    <button class="down">-</button>
                    <button class="up">+</button>
                    <button class="delete">supprimer</button>
                </div>
                <input type="text" id="url" placeholder="Contenu du QR Code" value="${Boisson.boisson}"/>
                <button type="button" class="btnqr">Créer le QR Code</button>
                <img src="https://chart.googleapis.com/chart?cht=qr&chl=https://www.1formatik.com&chs=200x200&chld=L|0" id="qrcode">
            </div>
        </div>
        `
        
        const buttonMoins = boissonCard.querySelector('.down')
        const buttonPlus = boissonCard.querySelector('.up')
        const deleteProduct = boissonCard.querySelector('.delete')
        const quantityDom = boissonCard.querySelector('.quantity')
        const btnQrCode = boissonCard.querySelector('.btnqr')
        const changePrixAchat = boissonCard.querySelector('.change1')
        const achatDom = boissonCard.querySelector('.achat')
        const changePrixVente = boissonCard.querySelector('.change2')
        const venteDom = boissonCard.querySelector('.vente')
        
        buttonMoins.addEventListener('click',()=>{
            Boisson.downQuantity()
            quantityDom.innerText = `Quantité dans le stock: ${Boisson.quantity}`
            upDownQuantity()   
        })
        
        buttonPlus.addEventListener('click',()=>{
            Boisson.upQuantity()
            quantityDom.innerText = `Quantité dans le stock: ${Boisson.quantity}`
            upDownQuantity()  
        })
        
        deleteProduct.addEventListener('click',function(){
            const indexOfBoisson = boissonList.indexOf(Boisson)
            console.log(indexOfBoisson)
            boissonList.splice(indexOfBoisson,1)
            console.log('user list :',boissonList)
            boissonCard.remove()
        })

        changePrixAchat.addEventListener('change',(event)=>{
            achatDom.innerHTML = `Prix Achat HT: ${event.target.value}€`
        })
        changePrixVente.addEventListener('change',(event)=>{
            venteDom.innerHTML = `Prix Vente HT: ${event.target.value}€`
        })
        
        

            

        btnQrCode.addEventListener('click',()=>{
            let url = document.getElementById("url").value;
            let qrcode = 'https://chart.googleapis.com/chart?cht=qr&chl=' + encodeURIComponent(url) + '&chs=200x200&choe=UTF-8&chld=L|0';
            document.getElementById("qrcode").src = qrcode;  
        })


        
        
        upDownQuantity()
        
        
        function upDownQuantity(){
            if (Boisson.quantity <= 10){
                quantityDom.style.color = "red"
            } else{
                quantityDom.style.color = "green"
            }
        }
        
        listBoissonDOM.append(boissonCard)
    })
}


showBoissonCardListInDOM()

const form = document.querySelector('form')
const selectType = document.querySelector('#typeBoisson')

degréAlcool.style.display = "none"

selectType.addEventListener('change',()=>{
    const typeValue = selectType.value

    if(typeValue == "boisson alcoolisée"){
        degréAlcool.style.display = "inline-block"
    }else{
        degréAlcool.style.display = "none"
        
    }
})

form.addEventListener('submit',(event) => {
    event.preventDefault()
    console.log(' form submit')
    
    const degréAlcool = document.querySelector('#degréAlcool')
    let degréAlcoolValue = degréAlcool.value
    const typeValue = selectType.value
    console.log("typeValue :",typeValue)
    
    const inputBoisson = document.querySelector('#boisson')
    const boissonValue = inputBoisson.value
    const inputQuantity = document.querySelector('#quantity')
    const quantityValue = inputQuantity.value
    const inputPrixAchat = document.querySelector('#prixAchat')
    const prixAchatValue = inputPrixAchat.value
    const inputPrixVente = document.querySelector('#prixVente')
    const prixVenteValue = inputPrixVente.value
    
    let margeValue = prixVenteValue - prixAchatValue
    let prixTtcValue = prixVenteValue*1.2

    if(typeValue!="boisson alcoolisée"){
        degréAlcoolValue = 0
    }


    const Boisson = {
        boisson: boissonValue,
        quantity: quantityValue,
        type: typeValue,
        degréalcool:degréAlcoolValue,
        prixAchat: prixAchatValue,
        prixVente: prixVenteValue,
        marge: margeValue,
        prixTtc: prixTtcValue,
        type: typeValue,
        description: function(){
            return`${this.boisson} est une ${this.type}`
        },
        downQuantity: function(){
            this.quantity --
            if(this.quantity < 0){
                this.quantity = 0
            }  
        },
        upQuantity: function(){
            this.quantity ++
        },

    }
    
    
    boissonList.push(Boisson)
    document.querySelector('form').reset()
    
    console.log("boissonList :",boissonList)
    
    showBoissonCardListInDOM()
    
})




// function saveStock(stock){
    //     localStorage.setItem("stock", JSON.stringify(stock))
    // }
    // function getStock(){
        //     let stock = localStorage.getItem("stock")
//     if(stock == null){
//         return []
//     }else{
//         return JSON.parse(basket)
//     }
// }
// function addStock(boissonCard) {
//     let stock = getStock()
//     stock.push(boissonCard)
//     saveStock(stock)
// }


// const Boisson = function(boisson,type,prixAchat,prixVente){
//     this.boisson = boisson
//     this.type = type
//     this.prixAchat = prixAchat
//     this.prixVente = prixVente
//     this.marge = this.prixVente - this.prixAchat
//     this.prixTtc = this.prixVente + this.marge
//     this.description = function(){
//         return`${boisson} est une ${type} de prix d'achat ${prixAchat} et de vente ${prixVente}: marge de ${this.marge}, le prix TTC est de ${this.prixTtc}`
//     }
// }


// const boisson1 = new Boisson ("Corona","boisson Alcoolisée",5,7)
// console.log(boisson1)
// console.log(boisson1.description())

// boissonList.push(boisson1.description())
// console.log(boissonList)