import ListItem from './ListItem'

interface ListInterface{
    list:ListItem[],
    load():void,
    save():void,
    clearList():void,
    addItem(itemObj:ListItem):void,
    removeItem(id:string):void
}

export default class List implements ListInterface{

    static intstance:List=new List();
    // private in front of contructor makes this class singleton
    // which means it will only have one instance
    // and we will only refer again and again to that instance
    // this can be done here because our list is only one
    private constructor(private _list:ListItem[]=[]){}
    
    get list():ListItem[]{
        return this._list;
    }
    load():void{
        const getStoredList:string | null=localStorage.getItem('list')
        if(typeof getStoredList!=='string'){
            return 
        }
        const parsedList:{_id:string,_item:string,_checked:boolean}[]=JSON.parse(getStoredList)
        parsedList.forEach(itemObj=>{
            const newListItem=new ListItem(itemObj._id,itemObj._item,itemObj._checked)
            List.intstance.addItem(newListItem)
        })
    }
    save():void{
        localStorage.setItem('list',JSON.stringify(this._list))
    }

    clearList():void{
        this._list=[]
        this.save()
    }

    addItem(itemObj:ListItem):void{
    this._list.push(itemObj)
    this.save()
    }

    removeItem(id:string):void{
        this._list=this._list.filter(item=>item.id!==id)
        this.save()
    }
}