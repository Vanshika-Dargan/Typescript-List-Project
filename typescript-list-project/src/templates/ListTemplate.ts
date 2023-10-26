import List from '../model/List'

interface DOMList{
    ul:HTMLUListElement,
    clear():void,
    render(fullList:List):void,
}

export default class ListTemplate implements DOMList{
    
    ul:HTMLUListElement
    static instance:ListTemplate=new ListTemplate()
    private constructor(){
        this.ul=document.getElementById('listItems') as HTMLUListElement;
    }

    clear():void{
        this.ul.innerHTML="";
    }
    render(fullList:List):void{
    this.clear();
    fullList.list.forEach(item=>{
        const li=document.createElement("li") as HTMLLIElement
        li.className='item'
        const checkbox=document.createElement('input') as HTMLInputElement
        checkbox.type="checkbox"
        checkbox.id=item.id
        checkbox.tabIndex=0
        checkbox.checked=item.checked;
        li.append(checkbox)

        checkbox.addEventListener('change',()=>{
            item.checked=!item.checked
            fullList.save()
        })

        const label=document.createElement('label') as HTMLLabelElement
        label.htmlFor=item.id
        label.textContent=item.item
        li.append(label)

        const button=document.createElement('button') as HTMLButtonElement
        button.className='button'
        button.textContent='X'
        li.append(button)
        button.addEventListener('click',()=>{
        fullList.removeItem(item.id)
        this.render(fullList)
        })
       this.ul.append(li)
    })
    }
}