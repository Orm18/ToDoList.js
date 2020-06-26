window.onload = function() {
    let listToDo = []
    if(localStorage.getItem('listToDo') != undefined){
        listToDo = JSON.parse(localStorage.getItem('listToDo'))
        outList();
    }

    function addTodo () {
        let task = document.getElementById('input').value
        //{todo: "string", check: false}
        let temp = {}
        temp.todo = task
        temp.check = false
        if (task === ''){ 
            alert("Add some task, please...")
        }
        else {
            listToDo[listToDo.length] = temp
            outList()
            document.getElementById('input').value = ""
            localStorage.setItem('listToDo', JSON.stringify(listToDo))
        }
    }

    function outList() {
        let output = ""
        let check = ""
        let style = ""
        for(let i = 0; i < listToDo.length; i++){
            if (listToDo[i].check == true){
                check = `<input id="item_${i}" type="checkbox" checked>`
                style = `text-decoration:line-through`
            }
            else {
                check =`<input id="item_${i}" type="checkbox">`
                style =''
            }
            output += `<li><label style="${style}" for="item_${i}">${listToDo[i].todo}</label> ${check}
                           <i class="fas fa-trash-alt" id="${i}"></i>
                           <i class='fas fa-pen' id="edit_${i}"></i>
                       </li>`   
        }
        document.getElementById('list').innerHTML = output
    }

    function clearAllTask(){
        localStorage.clear()
    }

    let ul = document.getElementById('list')
    ul.addEventListener('change', function(event){ 
        let idItem = event.target.getAttribute('id')
        let label = ul.querySelector(`[for=${idItem}]`)
        if (label != undefined){
            let valueLabel = label.innerHTML
            listToDo.forEach( function(item){
            if (item.todo === valueLabel){
                item.check = !item.check
               outList()
               localStorage.setItem('listToDo', JSON.stringify(listToDo))
            }
        })} 
    })

    input.addEventListener("keypress", (keyPressed) => {
        const keyEnter = 13;
        if (keyPressed.which == keyEnter) {
            addTodo();
        }
    })
    
    let add = document.getElementById('add')
    add.addEventListener('click', function(){
        addTodo()
    })

    let clear = document.getElementById('clear')
    clear.addEventListener('click', function(){
        clearAllTask()
        location.reload()
    })

    ul.addEventListener('click', function(event){
        if (event.target.tagName === "I") {
            let id = event.target.getAttribute('id')            
            if (id.includes("edit")){
                let item_id = id.split('edit_')[1].toString()
                let label_li = ul.querySelector(`[for=item_${item_id}]`)
                let text = label_li.textContent
                let icon_save = document.createElement('i')
                let edit_input = document.createElement('input')
                    icon_save.setAttribute('class','fas fa-save')
                    icon_save.setAttribute('id',`save_${item_id}`)
                    edit_input.setAttribute('id','input_edit')
                    edit_input.setAttribute('style',' margin: 4px')
                    edit_input.setAttribute('value', text)
                label_li.parentElement.append(icon_save)
                label_li.parentElement.insertBefore(edit_input, label_li)
                label_li.hidden = true
                document.getElementById(id).remove()
                document.getElementById(item_id).remove()
                document.getElementById(`item_${item_id}`).remove()
            }
             else if (id.includes("save")){
                 let _id = id.split('save_')[1].toString()
                 let label = ul.querySelector(`[for=item_${_id}]`)
                 let input_value = document.getElementById('input_edit').value
                 listToDo.forEach(function(item){
                    if (item.todo === label.innerHTML){
                        item.todo = input_value
                        item.check = false
                        localStorage.setItem('listToDo', JSON.stringify(listToDo))
                        outList()
                    }
                 })        
             }
            else {
                let tmp = document.getElementById(id)
                tmp.parentElement.remove();
                let tmpAr = listToDo
                tmpAr.splice(id, 1)
                listToDo = tmpAr
                outList()
                localStorage.setItem('listToDo', JSON.stringify(listToDo))
            }   
        }
    })     
}