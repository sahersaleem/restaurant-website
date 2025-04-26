'use client'
import { SearchIcon } from 'lucide-react'
import React , {ChangeEvent, useState , KeyboardEvent} from 'react'
import { useRouter } from 'next/navigation'

const InputBox = () => {
const [searchTerm , setSearchTerm] = useState<string>("")
const router = useRouter()



const handleChangeSearchTerm = (e:ChangeEvent<HTMLInputElement>)=>{
    setSearchTerm(e.target.value)
}

const handleSearch = ()=>{
if(searchTerm){
    router.push(`/search_page?cuisine=${searchTerm}`)
}
}

const handleKeydown = (event:KeyboardEvent<HTMLInputElement>)=>{

    if(event.key==="Enter"){
     handleSearch()
    }
}





  return (
    <div className="flex bg-white px-6 py-1 gap-x-2 rounded-lg font-comic items-center " >
        <SearchIcon className="text-red"/>
        <input placeholder="Search restaurant.." className="" onChange={handleChangeSearchTerm} value={searchTerm} onKeyDown={handleKeydown}/>
      </div>
  )
}

export default InputBox
