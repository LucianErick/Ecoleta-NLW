function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {
        
        for (const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
        citySelect.disabled = false
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state")
    
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = `<option value>Selecione a cidade</option>`
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json())
    .then(cities => {
        
        for (const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document.querySelector("select[name=uf]")
.addEventListener("change", getCities)

// Itens de Coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")
for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event) {
    
    const itemLi = event.target
    
    // adiciona ou remove uma classe com JavaScript
    itemLi.classList.toggle("selected")
    //add == Adiciona || remove == remove || toggle == Se existir, remova. Senão, adicone.

    const itemId = itemLi.dataset.id

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item==itemId
        return itemFound
    })
    //Verificar se existem itens selecionados
    // se sim, pegue-os
    if (alreadySelected >= 0) {
        // Se já estiver selecionado, tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDiferent = item != itemId
            return itemIsDiferent
        })
        selectedItems = filteredItems
    } else {
        // se não, adicionar à seleção
        selectedItems.push(itemId)
    }

    //Atualizar o campo escondido com os dados selecionados
    collectedItems.value = selectedItems
}