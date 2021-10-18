import React, { useEffect, useState } from 'react';
import styled from 'styled-components'

const StyleSearchBar = styled.input`
    border:1px solid #221e1d; 
    width:20%;
    padding:1%;
    margin:2%;
    @media(max-width:991px){
        width:60%;
    }
`

const Filters = props => {
    const {reviews, data, setData,setCurrentPage} = props
    const initialSel = {
        sortBySelected: '',
        searched:'',
    }
    const [selected,setSelected] = useState(initialSel)
    const {sortBySelected,searched} = selected

    const handleChange = (e) => {
        const {name,value} = e.target
        const valueToUse = value
            setSelected({...selected,[name] : valueToUse})
    }

    const filterByData = (typeOfKey,order) => {
        if (typeOfKey !== ''){
            const ret = []
            let arr_key_val = data.map(d => {
                return d[typeOfKey]
            })

            if (typeOfKey === 'publish_date' || typeOfKey === 'rating' || typeOfKey === 'author'){
                arr_key_val = []
                let s = new Set()
                data.forEach(d => {
                    if (!s.has(d[typeOfKey])){
                        s.add(d[typeOfKey])
                    }
                })
                s.forEach(ent => arr_key_val.push(ent))
            }

            if (order === 'asc' && (typeOfKey === "author" || typeOfKey === "publish_date")){
                arr_key_val.sort()
            }
            else if (order === 'desc' && (typeOfKey === "author" || typeOfKey === "publish_date")){
                arr_key_val.sort()
                arr_key_val.reverse()
            }
            else if (order === 'asc' &&  typeOfKey === "rating"){
                arr_key_val.sort((a,b) => a-b)
            }
            else if (order === 'desc' &&  typeOfKey === "rating"){
                arr_key_val.sort((a,b) => b-a)
            }

            for (let i = 0;i<arr_key_val.length;i++){
                for (let j = 0;j<data.length;j++){
                    if (data[j][typeOfKey] === arr_key_val[i]){
                        ret.push(data[j])
                    }
                }
            }
            setData(ret)
        }
    }
    
    useEffect(() => {
        if (searched !== ''){
            let input = JSON.parse(JSON.stringify(searched));
            input = input.toLowerCase().trim();
            let allTitles = [...reviews];
            let filteredReviews = []
            for (let i=0; i<allTitles.length ;i++){
                if (allTitles[i].body.toLowerCase().includes(input) || allTitles[i].author.toString().toLowerCase().includes(input)){
                    filteredReviews.push(allTitles[i].id)
                }
            }
            let ret = filteredReviews.map(review => {
                const [a] = allTitles.filter(t => t.id === review)
                return a
            })
            setData(ret)
            setCurrentPage(1)
        }
        else{
            setData(reviews)
            setCurrentPage(1)
        }
    },[setData,setCurrentPage,searched,reviews])

    const clean = () => {
        setSelected(initialSel)
        document.querySelector('#searchBar').value = ''
        setData(reviews)
    }
    
    return (
        <div className = 'filters'>
            <StyleSearchBar className='search resetAll' id='searchBar' name = 'searched' value = {searched} onChange = {handleChange} type='text' placeholder=' Search for review or author... &#128270;' />
            <div className = "filtersSort">
                <select className = "fSort" value = {sortBySelected} onChange = {handleChange} name='sortBySelected' type='text'>
                <option value = ''>Sort By</option>
                <option value = 'rating'>Rating</option>
                <option value = 'publish_date'>Date</option>
                <option value = 'author'>Author</option>
            </select>
            <button className = "fButton asc" onClick = {() => filterByData(sortBySelected,'asc')}>Filter Asc ↑</button>
            <button className = "fButton desc" onClick = {() => filterByData(sortBySelected,'desc')}>Filter Desc ↓</button>
            <button className = "fButton reset" onClick={() => clean()}type="button">Reset</button>
            </div>
        </div>
    )
}

export default Filters;


